
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  // State to track if the user has scrolled down the page
  const [scrolled, setScrolled] = useState(false);

  // Effect to listen to scroll events and update `scrolled` state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true); // Add "scrolled" class if scrolled more than 50px
      } else {
        setScrolled(false); // Remove "scrolled" class when near top
      }
    };

    // Attach scroll listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    // Apply "scrolled" class dynamically based on state
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      {/* Logo linking to home page */}
      <Link href="/" className={styles.logo}>
        <Image 
          src={process.env.NEXT_PUBLIC_LOGO_PATH || "/logo.png"} // fallback if env var not set
          alt={process.env.NEXT_PUBLIC_SITE_TITLE || "Logo"} 
          width={100} 
          height={50} 
          priority 
        />
      </Link>

      {/* Navigation links */}
      <div className={styles.navLinks}>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;


