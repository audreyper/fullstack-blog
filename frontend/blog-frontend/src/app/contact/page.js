'use client';
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import styles from './Contact.module.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Contact = () => {
  // State to hold form data (user_name, user_email, message)
  const [formData, setFormData] = useState({ user_name: '', user_email: '', message: '' });
  // State to track if the form is being submitted
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handles input field changes and updates the form data state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handles form submission, sends data to EmailJS
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission
    setIsSubmitting(true);  // Set submitting state to true

    try {
      // Sending form data to EmailJS
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,  
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, 
        e.target,  // The form element itself
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID    
      );
      alert('Your message has been sent!');  // Alert on success
      setFormData({ user_name: '', user_email: '', message: '' });  // Reset form after successful submission
    } catch (error) {
      alert('Failed to send the message. Please try again.');  // Alert on failure
    } finally {
      setIsSubmitting(false);  // Set submitting state to false after completion
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        {/* Hero section with heading and description */}
        <section className={styles.hero}>
          <h1>Contact Us</h1>
          <p>We'd love to hear from you! Please fill out the form below.</p>
        </section>

        {/* Contact form section */}
        <section className={styles.content}>
          <div className={styles.formWrapper}>
            <h3>Contact Form</h3>
            <form onSubmit={handleSubmit} className={styles.form}>
              {/* Name input field */}
              <div className={styles.formGroup}>
                <label htmlFor="user_name">Name</label>
                <input
                  type="text"
                  id="user_name"
                  name="user_name"  // Changed name to 'user_name'
                  className={styles.inputField}
                  placeholder="Enter your name"
                  value={formData.user_name}  // Changed value to 'user_name'
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email input field */}
              <div className={styles.formGroup}>
                <label htmlFor="user_email">Email</label>
                <input
                  type="email"
                  id="user_email"
                  name="user_email"  // Changed name to 'user_email'
                  className={styles.inputField}
                  placeholder="Enter your email"
                  value={formData.user_email}  // Changed value to 'user_email'
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Message textarea */}
              <div className={styles.formGroup}>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  className={styles.textArea}
                  placeholder="Enter your message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Submit button */}
              <div className={styles.buttonWrapper}>
                <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Submit'}  {/* Conditional text for button */}
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
      <div style={{ height: "15rem" }}></div> 
      <Footer />
    </>
  );
};

export default Contact;