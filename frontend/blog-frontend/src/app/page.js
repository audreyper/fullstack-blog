'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard'; // Import PostCard component
import styles from '../styles/HomePage.module.css'; // Import styles for the homepage

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  // Fetch blog posts from the backend
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
      <h1>Blog Posts</h1>
      <div className={styles['posts-list']}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} /> // Display each post using PostCard component
        ))}
      </div>
    </div>
  );
};

export default HomePage;