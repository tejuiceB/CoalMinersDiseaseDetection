from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import joblib
import logging
import warnings
from sklearn.exceptions import InconsistentVersionWarning

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Filter out version warnings
warnings.filterwarnings("ignore", category=InconsistentVersionWarning)

app = Flask(__name__)
CORS(app)

# Load the model
try:
    model = joblib.load('models/hybrid_model.pkl')
    logger.info("Model loaded successfully!")
    logger.info(f"Model type: {type(model)}")
except Exception as e:
    logger.error(f"Error loading model: {e}")
    model = None

# Patch for scikit-learn 1.4+ bug with monotonic_cst attribute
import sklearn
from sklearn.tree import DecisionTreeClassifier

if hasattr(model, "estimators_"):
    for est in model.estimators_:
        if isinstance(est, DecisionTreeClassifier) and not hasattr(est, "monotonic_cst"):
            est.monotonic_cst = None

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        logger.info(f"Received prediction request with data: {data}")

        # Create feature list in correct order
        features = [
            'Age', 'Years_in_Mining', 'Smoking_History', 'Cough_Frequency',
            'Breathlessness', 'Chest_Pain', 'Oxygen_Saturation (%)', 
            'Heart_Rate (BPM)', 'Body_Temperature (°C)', 'Air_Quality_Index (AQI)',
            'PM2.5_Level (µg/m³)', 'CO_Level (ppm)', 'Temperature (°C)',
            'PPE_Usage', 'Medication_Use'
        ]

        # Validate input data
        missing = [f for f in features if f not in data]
        if missing:
            logger.error(f"Missing features: {missing}")
            return jsonify({"error": f"Missing features: {missing}"}), 400

        # Create DataFrame with single row
        input_df = pd.DataFrame([[data[f] for f in features]], columns=features)
        logger.info(f"Input DataFrame shape: {input_df.shape}")

        # Make prediction
        prediction = model.predict(input_df)[0]
        probabilities = model.predict_proba(input_df)[0]

        # Map predictions to risk levels
        risk_mapping = {0: "Low", 1: "Medium", 2: "High"}
        risk_level = risk_mapping.get(prediction, "Unknown")

        # Get recommendations based on risk level
        if prediction == 0:
            recommendations = [
                "Continue regular health monitoring",
                "Maintain PPE usage",
                "Follow standard safety protocols"
            ]
        elif prediction == 1:
            recommendations = [
                "Schedule medical check-up",
                "Increase PPE compliance",
                "Monitor symptoms closely"
            ]
        elif prediction == 2:
            recommendations = [
                "Seek immediate medical attention",
                "Temporarily suspend mining activities",
                "Complete health assessment required"
            ]
        else:
            recommendations = ["No recommendation available"]

        response = {
            "risk_level": risk_level,
            "probability": float(max(probabilities)),
            "recommendations": recommendations
        }

        logger.info(f"Prediction response: {response}")
        return jsonify(response)

    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    # Simple health check endpoint
    return jsonify({"status": "ok", "model_loaded": model is not None})

if __name__ == '__main__':
    app.run(debug=True)
