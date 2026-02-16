import { certifications } from "@/data/certifications";
import styles from "./Professional.module.css";

export default function Certifications() {
  return (
    <section className={`${styles.section} ${styles.sectionAlt}`}>
      <div className={styles.container}>
        <p className={styles.sectionLabel}>Certifications</p>
        {certifications.map((cert, i) => (
          <div key={i} className={styles.certItem}>
            <span className={styles.certName}>{cert.name}</span>
            <span className={styles.certIssuer}>{cert.issuer}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
