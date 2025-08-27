 'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';  
import styles from '../styles/HomePage.module.css';


const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); 

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/`);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/`);
        setCategories(response.data); 
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchPosts();
    fetchCategories();
  }, []);

  // Filter posts based on selected category
  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.category.name.toLowerCase() === selectedCategory.toLowerCase())
    : posts;

  return (
    <div>
      <Navbar /> 

      <div className={styles.heroImage}>
        <img src="/hero.jpg" alt="Hero Image" />
        {/* Title in the middle of the image */}
        <div className={styles.heroTitle}>
            <div className={styles.line}>Welcome to my playground</div>
            <div className={styles.line}>Let's build and break stuff</div>    
        </div>
      </div>
      <div className={styles.categoryTitle}>
          <h2>Categories</h2>
      </div>
      {/* Category Bar */}
      <div className={styles.categoryBar}>
        <button
          key="all"
          className={`${styles.categoryButton} ${selectedCategory === '' ? styles.selected : ''}`}
          onClick={() => setSelectedCategory('')} 
        >
          All
        </button>

        {/* Dynamically render other category buttons */}
        {categories.map((category) => (
          <button
            key={category.id}
            className={`${styles.categoryButton} ${selectedCategory === category.name ? styles.selected : ''}`}
            onClick={() => setSelectedCategory(category.name)} 
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Blog Posts Section */}
      <div className={styles.postsContainer}>
        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <Footer /> 
    </div>
  );
};

export default HomePage;