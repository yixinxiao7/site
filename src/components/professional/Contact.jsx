import { contact } from "@/data/experience";
import { FiMail, FiGithub, FiLinkedin, FiDownload } from "react-icons/fi";
import styles from "./Professional.module.css";

export default function Contact() {
  return (
    <section className={styles.contact}>
      <div className={styles.container}>
        <h2 className={styles.sectionLabel}>Get in touch</h2>
        <div className={styles.contactLinks}>
          <a href={`mailto:${contact.email}`} className={styles.contactLink}>
            <FiMail size={16} />
            Email
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactLink}
          >
            <FiLinkedin size={16} />
            LinkedIn
          </a>
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactLink}
          >
            <FiGithub size={16} />
            GitHub
          </a>
        </div>
        <a
          href={contact.resume}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.resumeLink}
        >
          <FiDownload size={14} />
          Resume
        </a>
      </div>
    </section>
  );
}
