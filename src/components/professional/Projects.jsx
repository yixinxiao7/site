import styles from "./Professional.module.css";

export default function Projects() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.sectionLabel}>Projects</p>
        <div className={styles.projectsGrid}>
          <div className={styles.projectCard}>
            <span className={styles.projectPlaceholder}>Coming soon</span>
          </div>
          <div className={styles.projectCard}>
            <span className={styles.projectPlaceholder}>Coming soon</span>
          </div>
        </div>
      </div>
    </section>
  );
}
