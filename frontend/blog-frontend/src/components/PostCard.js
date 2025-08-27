import React from 'react';
import Link from 'next/link';
import styles from '../styles/PostCard.module.css';

const PostCard = ({ post }) => {
  // Fallback for content if post.content is empty or undefined
  const firstContent = post.content?.[0]?.content ?? "No content available";

  // Fallback for main image if undefined
  const mainImage = post.main_image || "/default-image.png"; // you can put a default image in your public folder

  // Fallback for category name if undefined
  const categoryName = post.category?.name || "Uncategorized";

  return (
    // Link to the individual post page using the post ID
    <Link href={`/posts/${post.id}`} className={styles.cardLink}>
      <div className={styles.card}>
        {/* Post main image */}
        <img src={mainImage} alt={post.title} className={styles.image} />

        {/* Post title */}
        <h2 className={styles.title}>{post.title}</h2>

        {/* Decorative bottom bar */}
        <div className={styles.bottombar}></div>

        {/* Category name */}
        <p className={styles.category}>{categoryName}</p>
      </div>
    </Link>
  );
};

export default PostCard;