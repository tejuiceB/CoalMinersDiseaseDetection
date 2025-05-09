import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-section">
          <h3>CoalCare</h3>
          <p>Advanced healthcare monitoring for coal mining professionals</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#detection">Disease Detection</a></li>
            <li><a href="#dashboard">Dashboard</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul>
            <li>Email: info@coalcare.com</li>
            <li>Phone: +1 (555) 123-4567</li>
            <li>Address: 123 Mining Street, Coal City</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; 2024 CoalCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
