'use client'
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Navbar.module.css'; // Import CSS for styling

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      {/* Logo on the left */}
      <div className={styles.logo}>
        <Image src="/logo.png" alt="Logo" width={100} height={50} priority />
      </div>

      {/* Navigation Links */}
      <div className={styles.navLinks}>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;




