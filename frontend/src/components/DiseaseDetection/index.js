import React, { useState } from 'react';
import DetectionForm from './DetectionForm';
import ResultDisplay from './ResultDisplay';
import { predictDisease } from '../../services/api';
import './style.css';

const DiseaseDetection = () => {
  const [predictionResult, setPredictionResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setError(null);
    setPredictionResult(null);
    try {
      const result = await predictDisease(formData);
      if (result.error) {
        setError(result.error);
      } else {
        setPredictionResult(result);
      }
    } catch (error) {
      setError('Prediction failed. Please try again.');
    }
  };

  return (
    <div className="disease-detection">
      <h1>Coal Mining Disease Detection</h1>
      <DetectionForm onSubmit={handleSubmit} />
      {error && <div className="error-message">{error}</div>}
      {predictionResult && <ResultDisplay result={predictionResult} />}
    </div>
  );
};

export default DiseaseDetection;
