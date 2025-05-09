import React from 'react';

const ResultDisplay = ({ result }) => {
  if (!result) return null;

  return (
    <div className="result-display">
      <h3>Prediction Results</h3>
      <div className="result-content">
        <p><strong>Risk Level:</strong> {result.risk_level}</p>
        <p><strong>Probability:</strong> {(result.probability * 100).toFixed(2)}%</p>
        <p><strong>Recommended Precautionary Measures:</strong></p>
        <ul>
          {result.recommendations && result.recommendations.map((measure, index) => (
            <li key={index}>{measure}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResultDisplay;
