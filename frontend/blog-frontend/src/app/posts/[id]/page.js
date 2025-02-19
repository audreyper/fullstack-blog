

"use client";
import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./PostPage.module.css"; // Import the CSS module

const PostPage = () => {
  const { id } = useParams(); // Get post ID from the URL
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://127.0.0.1:8000/api/posts/${id}/`)
        .then((response) => setPost(response.data))
        .catch((error) => console.error("Error fetching post:", error));
    }
  }, [id]);

  if (!post) return <p>Loading...</p>;

  const { content } = post; // Destructure the content array from post

  return (
    <div className={styles.container}> {/* Apply container class */}
      <h1 className={styles.title}>{post.title}</h1> {/* Apply title class */}
      <img
        src={post.main_image}
        alt={post.title}
        className={styles.image} // Apply image class
      />
      <div>
        {content &&
          content.map((section, index) => {
            return (
              <div key={index} className={styles.section}> {/* Apply section class */}
                {section.type === "section" && (
                  <div>
                    <h2 className={styles.sectionTitle}>{section.title}</h2> {/* Apply section title class */}
                    <p className={styles.sectionContent}>{section.content}</p> {/* Apply section content class */}
                  </div>
                )}
                {section.type === "quote" && (
                  <div className={styles.quote}> {/* Apply quote class */}
                    <blockquote>{section.content}</blockquote>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PostPage;