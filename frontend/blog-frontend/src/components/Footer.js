
import { FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa'; // Import social icons
import React from "react";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  // Get social URLs from environment variables
  const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL;
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL;

  return (
    <footer className={styles.footer}>
      {/* Social links section */}
      <div className={styles.socialLinks}>
        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={24} />
        </a>
        <a href={githubUrl} target="_blank" rel="noopener noreferrer">
          <FaGithub size={24} />
        </a>
        <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
          <FaGlobe size={24} />
        </a>
      </div>

      {/* Copyright notice */}
      <p>
        &copy; {new Date().getFullYear()} {process.env.NEXT_PUBLIC_SITE_TITLE} All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;