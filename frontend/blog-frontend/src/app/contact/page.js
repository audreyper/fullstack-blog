
'use client';
import React, { useState } from 'react';
import styles from './Contact.module.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Contact = () => {
  // --- State for form fields ---
  const [formData, setFormData] = useState({ user_name: '', user_email: '', message: '' });

  // --- State to track form submission ---
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Update form data on input change ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // --- Handle form submission ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);  // Disable button while submitting

    try {
      // --- Send form data to backend API ---
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // --- Reset form and show success alert ---
        alert('Your message has been sent!');
        setFormData({ user_name: '', user_email: '', message: '' });
      } else {
        // --- Show error from backend ---
        alert(`Failed to send the message: ${data.error}`);
      }
    } catch (err) {
      // --- Handle network or unexpected errors ---
      alert('Failed to send the message. Please try again.');
      console.error('Frontend error:', err);
    } finally {
      setIsSubmitting(false); // Re-enable button
    }
  };

  return (
    <>
      {/* --- Navbar --- */}
      <Navbar />

      <div className={styles.container}>
        {/* --- Hero section --- */}
        <section className={styles.hero}>
          <h1>Contact Me</h1>
          <p>Got a question? Fill out the form below and I’ll get back to you!</p>
        </section>

        {/* --- Contact form section --- */}
        <section className={styles.content}>
          <div className={styles.formWrapper}>
            <h3>Contact Form</h3>
            <form onSubmit={handleSubmit} className={styles.form}>
              {/* --- Name input field --- */}
              <div className={styles.formGroup}>
                <label htmlFor="user_name">Name</label>
                <input
                  type="text"
                  id="user_name"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className={styles.inputField}
                />
              </div>

              {/* --- Email input field --- */}
              <div className={styles.formGroup}>
                <label htmlFor="user_email">Email</label>
                <input
                  type="email"
                  id="user_email"
                  name="user_email"
                  value={formData.user_email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className={styles.inputField}
                />
              </div>

              {/* --- Message textarea --- */}
              <div className={styles.formGroup}>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your message"
                  required
                  className={styles.textArea}
                />
              </div>

              {/* --- Submit button --- */}
              <div className={styles.buttonWrapper}>
                <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>

      {/* --- Spacer to avoid overlapping footer --- */}
      <div style={{ height: '15rem' }}></div>

      {/* --- Footer --- */}
      <Footer />
    </>
  );
};

export default Contact;