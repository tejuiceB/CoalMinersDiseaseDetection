import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const predictDisease = async (data) => {
  try {
    // Format data to match exactly what the model expects
    const formattedData = {
      'Age': parseInt(data.Age),
      'Years_in_Mining': parseInt(data.Years_in_Mining),
      'Smoking_History': parseInt(data.Smoking_History),
      'Cough_Frequency': parseInt(data.Cough_Frequency),
      'Breathlessness': parseInt(data.Breathlessness),
      'Chest_Pain': parseInt(data.Chest_Pain),
      'Oxygen_Saturation (%)': parseFloat(data.Oxygen_Saturation),
      'Heart_Rate (BPM)': parseInt(data.Heart_Rate),
      'Body_Temperature (°C)': parseFloat(data.Body_Temperature),
      'Air_Quality_Index (AQI)': parseInt(data.Air_Quality_Index),
      'PM2.5_Level (µg/m³)': parseFloat(data.PM2_5_Level),
      'CO_Level (ppm)': parseFloat(data.CO_Level),
      'Temperature (°C)': parseFloat(data.Temperature),
      'PPE_Usage': parseInt(data.PPE_Usage),
      'Medication_Use': parseInt(data.Medication_Use)
    };

    const response = await axios.post(`${API_URL}/predict`, formattedData);
    return response.data; // Return backend response as-is
  } catch (error) {
    console.error('Error predicting disease:', error);
    throw error;
  }
};

export { predictDisease };
