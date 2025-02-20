'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';
import Navbar from '../components/Navbar'; // Import Navbar
import styles from '../styles/HomePage.module.css';

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/posts/');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <Navbar /> {/* Add navbar */}

      {/* Fullscreen hero image */}
      <div className={styles.heroImage}>
        <img src="/hero.jpg" alt="Hero Image" />
      </div>

      {/* Blog Posts Section */}
      <div className={styles.postsContainer}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;