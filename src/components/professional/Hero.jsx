import styles from "./Professional.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <h1 className={styles.heroName}>Yixin Xiao</h1>
        <p className={styles.heroTitle}>Senior Software Engineer at Capital One</p>
        <div className={styles.heroDivider} />
        <p className={styles.heroTagline}>
          Full-stack engineer specializing in architectural, platform, and data
          engineering. Passionate about building scalable systems with AWS and
          Databricks.
        </p>
      </div>
    </section>
  );
}
