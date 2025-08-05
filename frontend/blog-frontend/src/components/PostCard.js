
import React from 'react';
import Link from 'next/link';
import styles from '../styles/PostCard.module.css';

const PostCard = ({ post }) => {
  const firstContent = post.content?.[0]?.content ?? "No content available";


  return (
    <Link href={`/posts/${post.id}`} className={styles.cardLink}>
      <div className={styles.card}>
        <img src={post.main_image} alt={post.title} className={styles.image} />
        <h2 className={styles.title}>{post.title}</h2>
        <div className={styles.bottombar}></div>
        <p className={styles.category}>{post.category.name}</p>
      </div>
    </Link>
  );
};

export default PostCard;