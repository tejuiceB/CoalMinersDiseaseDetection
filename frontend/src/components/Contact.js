import React from "react";
import "./Contact.css";

const Contact = () => (
  <div className="contact-container">
    <h2>Contact Us</h2>
    <p>
      We value your feedback and inquiries. Please use the information below to reach out to our team.
    </p>
    <div className="contact-details">
      <div>
        <strong>Email:</strong> <a href="mailto:support@coalminerhealth.com">support@coalminerhealth.com</a>
      </div>
      <div>
        <strong>Phone:</strong> <a href="tel:+18001234567">+1 (800) 123-4567</a>
      </div>
      <div>
        <strong>Address:</strong>
        <br />
        Coal Miner Health Solutions<br />
        123 Safety Lane<br />
        Springfield, USA 12345
      </div>
    </div>
    <div className="contact-form-section">
      <h3>Send Us a Message</h3>
      <form className="contact-form">
        <label>
          Name
          <input type="text" name="name" placeholder="Your Name" required />
        </label>
        <label>
          Email
          <input type="email" name="email" placeholder="Your Email" required />
        </label>
        <label>
          Message
          <textarea name="message" placeholder="Your Message" rows={5} required />
        </label>
        <button type="submit" disabled>
          Send Message
        </button>
        <p className="form-note">
          (Form submission is currently disabled. Please use the email or phone above.)
        </p>
      </form>
    </div>
  </div>
);

export default Contact;
