
"use client";
import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer";
import styles from "./PostPage.module.css"; 

const PostPage = () => {
 
  const { id } = useParams(); 
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
              </div>
            );
          })}
      </div>
      <Footer />
    </div>
  );
};

export default PostPage;