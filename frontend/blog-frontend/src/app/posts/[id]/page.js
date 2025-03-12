
"use client";
import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer";
import styles from "./PostPage.module.css"; 

const PostPage = () => {
 // Extract the post ID from the URL parameters
  const { id } = useParams(); 
  const [post, setPost] = useState(null);

// Fetch post data from backend API 
  useEffect(() => {
    if (id) {
      axios
        .get(`http://127.0.0.1:8000/api/posts/${id}/`)
        .then((response) => setPost(response.data)) // Store fetched post data
        .catch((error) => console.error("Error fetching post:", error)); // Log any errors
    }
  }, [id]);
  // If the post data isn't available yet, show a loading message
  if (!post) return <p>Loading...</p>;

  const { content } = post; 

  return (
    <div className={styles.container}> 
     <Navbar /> 
      <h1 className={styles.title}>{post.title}</h1> 
      <img
        src={post.main_image}
        alt={post.title}
        className={styles.image} 
      />
      <div>
        {/* Loop through each section in the post's content and render based on section type */}
        {content &&
          content.map((section, index) => {
            return (
              <div key={index} className={styles.section}> 
                {section.type === "section" && (
                  <div>
                    <h2 className={styles.sectionTitle}>{section.title}</h2> 
                    <p className={styles.sectionContent}>{section.content}</p> 
                  </div>
                )}
                {section.type === "quote" && (
                  <div className={styles.quote}> 
                    <blockquote>{section.content}</blockquote>
                  </div>
                )}
                {section.type === "code" && (
                  <pre className={styles.codeBlock}> 
                    <code>{section.content}</code>
                  </pre>
                )}
                     {section.type === "list" && (
                  <ul className={styles.list}> 
                    {section.content.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
      </div>
      <Footer />
    </div>
  );
};

export default PostPage;