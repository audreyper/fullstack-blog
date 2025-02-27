import React from "react";
import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer";
import styles from "./About.module.css";

const AboutPage = () => {
  return (
     <>
      <Navbar /> 
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1>Hey, I'm Audrey!</h1>
        <p>
          Welcome to my little corner of the Internet. If you love{" "}
          <strong>Linux, home labs, automation, open-source projects, and tech discoveries</strong>, 
          you're in the right place.
        </p>
      </div>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2>💻 What This Blog is About</h2>
          <p>
            This blog is where I share my experiments, struggles, and wins in the world of IT.
            Whether it’s setting up a new exciting project in my home lab, automating a task 
            or building with AWS, I write about what I learn—so you can learn too!
          </p>
        </section>

        <section className={styles.section}>
          <h2>🚀 A Bit About Me</h2>
          <p>
            I’m <strong>Audrey</strong>, I started out solving people’s problems, now I solve system ones. 
            I’ve built businesses, firewalls, infrastructure, automation, and a pretty exciting career.
            I fell in love with Linux years ago, and I’ve been obsessed with it ever since. {" "}
          </p>
        </section>

        <section className={styles.section}>
          <h2>🛠️ What You'll Find Here</h2>
          <ul className={styles.list}>
            <li className={styles.listItem}>🐧 Linux deep dives, tips & tricks</li>
            <li className={styles.listItem}>🖥️ My home lab setup, experiments & upgrades</li>
            <li className={styles.listItem}>🚀 Automations that make life easier</li>
            <li className={styles.listItem}>💡 Tech discoveries & things I wish I knew sooner</li>
            <li className={styles.listItem}>☁️ AWS Experiments & Deployments</li>
          </ul>
        </section>
        <section className={styles.section}>
            <h2>✉️ Let’s Connect!</h2>
            <p>Got a question? Want to share your own Linux journey? Find me on LinkedIn. <br></br>  
            <a href="https://www.linkedin.com/in/audreyperreault/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.link}>My Linkedin page</a>
            </p>
            <p>
              Thanks for stopping by. Now go build and break something cool! 🚀
           </p>
        </section>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default AboutPage;