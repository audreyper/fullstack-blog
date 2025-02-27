
import { FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa'; // Import the icons
import React from "react";
import styles from "../styles/Footer.module.css";


const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.socialLinks}>
        <a href="https://www.linkedin.com/in/audreyperreault/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={24} />
        </a>
        <a href="https://github.com/audreyper" target="_blank" rel="noopener noreferrer">
          <FaGithub size={24} />
        </a>
        <a href="https://portfolio.audreyautomates.com" target="_blank" rel="noopener noreferrer">
          <FaGlobe size={24} />
        </a>
      </div>
      <p>&copy; {new Date().getFullYear()} audreyautomates.com All rights reserved.</p>
    </footer>
  );
};

export default Footer;