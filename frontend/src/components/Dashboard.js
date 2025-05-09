import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div className="dashboard-container" style={{ marginTop: '100px' }}>
        <h1>Coal Miner Health Dashboard</h1>
        <div className="dashboard-summary">
          <div className="dashboard-card">
            <h2>Model Accuracy</h2>
            <p>~92% (Hybrid ML Model)</p>
          </div>
          <div className="dashboard-card">
            <h2>Recent Predictions</h2>
            <ul>
              <li>John Doe: <span className="risk-high">High Risk</span></li>
              <li>Jane Smith: <span className="risk-low">Low Risk</span></li>
              <li>Ravi Kumar: <span className="risk-medium">Medium Risk</span></li>
            </ul>
          </div>
          <div className="dashboard-card">
            <h2>Environmental Alerts</h2>
            <ul>
              <li>PM2.5: <span className="alert-high">High</span></li>
              <li>CO Level: <span className="alert-normal">Normal</span></li>
              <li>AQI: <span className="alert-high">High</span></li>
            </ul>
          </div>
        </div>
        <div className="dashboard-actions">
          <button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Hide' : 'Predict Disease Risk'}
          </button>
        </div>
        {showForm && (
          <div className="dashboard-form">
            {/* You can import and use your DetectionForm component here */}
            <p>Prediction form goes here (integrate DetectionForm component).</p>
          </div>
        )}
        <div className="dashboard-info">
          <h2>About This Dashboard</h2>
          <p>
            This dashboard provides an overview of coal miners' health risk predictions using a hybrid machine learning model.
            It summarizes recent predictions, environmental alerts, and allows you to run new risk assessments.
          </p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
