import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/logo.svg';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container nav-container">
        <div className="nav-logo">
          <img src={logo} alt="CoalCare" className="logo-img" />
          <h1>CoalCare</h1>
        </div>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/disease-detection" className="nav-link">Disease Detection</Link>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <button className="btn-primary">Get Started</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
