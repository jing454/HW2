import React, { useEffect, useRef, useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [responseMessage, setResponseMessage] = useState('');
  const responseTimerRef = useRef(null);

  useEffect(() => () => window.clearTimeout(responseTimerRef.current), []);

  const handleSubmit = event => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      return;
    }

    setResponseMessage('Thank you for your message! Expected response time is 24-48 hours.');
    setFormData({ name: '', email: '', message: '' });

    responseTimerRef.current = window.setTimeout(() => {
      setResponseMessage('');
    }, 5000);
  };

  return (
    <main>
      <h1>Contact Us</h1>

      <div className="contact-wrapper">
        <section className="map-container">
          <h2>Our Location</h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.1234567890!2d-74.0060!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a323e32e899%3A0x1234567890abcdef!2sRestaurant%20X!5e0!3m2!1sen!2sus!4v1234567890"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Restaurant X location"
          />
          <p>
            <strong>Restaurant X</strong><br />
            123 Main Street<br />
            New York, NY 10001<br />
            Phone: (555) 123-4567
          </p>
        </section>

        <section className="form-container">
          <h2>Send us a Message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={event => setFormData(previous => ({ ...previous, name: event.target.value }))}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={event => setFormData(previous => ({ ...previous, email: event.target.value }))}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                required
                value={formData.message}
                onChange={event => setFormData(previous => ({ ...previous, message: event.target.value }))}
              />
            </div>

            <button type="submit" className="submit-btn">Send Message</button>
          </form>
          <p id="form-response" className={`form-response ${responseMessage ? 'success' : ''}`}>
            {responseMessage}
          </p>
        </section>
      </div>

      <div className="contact-info-wrapper">
        <section className="business-hours">
          <h2>Business Hours</h2>
          <table className="hours-table">
            <tbody>
              <tr>
                <td className="day">Monday - Friday</td>
                <td className="time">11:00 AM - 10:00 PM</td>
              </tr>
              <tr>
                <td className="day">Saturday</td>
                <td className="time">12:00 PM - 11:00 PM</td>
              </tr>
              <tr>
                <td className="day">Sunday</td>
                <td className="time">12:00 PM - 9:00 PM</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="social-media">
          <h2>Follow Us</h2>
          <div className="social-links">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="social-icon facebook" title="Facebook">
              <i className="fab fa-facebook-f" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="social-icon instagram" title="Instagram">
              <i className="fab fa-instagram" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noreferrer" className="social-icon twitter" title="Twitter">
              <i className="fab fa-twitter" />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noreferrer" className="social-icon youtube" title="YouTube">
              <i className="fab fa-youtube" />
            </a>
            <a href="https://www.tiktok.com" target="_blank" rel="noreferrer" className="social-icon tiktok" title="TikTok">
              <i className="fab fa-tiktok" />
            </a>
          </div>
          <p className="social-text">Join our community and stay updated with our latest dishes and special offers!</p>
        </section>
      </div>
    </main>
  );
}
