import React, { useState, useEffect } from 'react';
import '../styles/Home.css';

const slides = [
  {
    image: '/images/mining-1.jpg',
    title: 'Protecting Our Coal Mining Heroes',
    description: 'Advanced health monitoring for the backbone of our energy sector'
  },
  {
    image: '/images/mining-2.jpg',
    title: 'Early Detection Saves Lives',
    description: 'Regular medical checkups powered by AI technology'
  },
  {
    image: '/images/mining-3.jpg',
    title: 'Advanced Lung Analysis',
    description: 'State-of-the-art scanning for respiratory conditions'
  },
  {
    image: '/images/mining-4.jpg',
    title: 'Data-Driven Healthcare',
    description: 'Real-time monitoring and predictive analytics'
  },
  {
    image: '/images/mining-5.jpg',
    title: 'Prevention First',
    description: 'Comprehensive safety measures and health guidelines'
  }
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="home">
      <div className="hero-section">
        <div className="slider">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="slide-content">
                <h1>{slide.title}</h1>
                <p>{slide.description}</p>
              </div>
            </div>
          ))}
          <button className="slider-btn prev" onClick={prevSlide}>❮</button>
          <button className="slider-btn next" onClick={nextSlide}>❯</button>
          <div className="slider-dots">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="features-section container">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Early Detection</h3>
            <p>Advanced algorithms for early identification of respiratory diseases</p>
          </div>
          <div className="feature-card">
            <h3>Real-time Monitoring</h3>
            <p>Continuous health tracking and instant alerts</p>
          </div>
          <div className="feature-card">
            <h3>Data Analytics</h3>
            <p>Comprehensive health data analysis and reporting</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
