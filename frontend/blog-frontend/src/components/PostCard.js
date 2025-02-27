
import React from 'react';
import Link from 'next/link';
import styles from '../styles/PostCard.module.css';

const PostCard = ({ post }) => {
  const MAX_CHARACTERS = 116; // Set a reasonable limit
  const firstContent = post.content?.[0]?.content ?? "No content available";

  // Ensure content is trimmed but maintains a stable layout
  const trimmedContent =
    firstContent.length > MAX_CHARACTERS
      ? firstContent.substring(0, MAX_CHARACTERS) + "..."
      : firstContent;

  return (
    <Link href={`/posts/${post.id}`} className={styles.cardLink}>
      <div className={styles.card}>
        <img src={post.main_image} alt={post.title} className={styles.image} />
        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.content}>{trimmedContent}</p>
        <div className={styles.bottombar}></div>
        <p className={styles.category}>{post.category.name}</p>
      </div>
    </Link>
  );
};

export default PostCard;