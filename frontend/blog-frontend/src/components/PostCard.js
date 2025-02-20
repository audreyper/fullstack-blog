
import React from 'react';
import Link from 'next/link';
import styles from '../styles/PostCard.module.css';

const PostCard = ({ post }) => {

const firstContent = post.content?.[0]?.content ?? "No content available";

return (
  <div className={styles.card}>
    <img src={post.main_image} alt={post.title} className={styles.image} />
    <h2 className={styles.title}>{post.title}</h2>
    <p className={styles.content}>{firstContent}</p>
    <Link href={`/posts/${post.id}`} className={styles.link}>
      Read More
    </Link>
    <div className={styles.bottombar}></div>
    <p className={styles.category}>{post.category.name}</p>
  </div>
);

};

export default PostCard;