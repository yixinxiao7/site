import Image from "next/image";
import styles from "./Professional.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroContent}>
          <div className={styles.heroPhoto}>
            <Image
              src="/me.png"
              alt="Yixin Xiao"
              width={340}
              height={340}
              priority
            />
          </div>
          <div className={styles.heroText}>
            <h1 className={styles.heroName}>Yixin Xiao</h1>
            <p className={styles.heroTitle}>Senior Software Engineer at Capital One</p>
            <div className={styles.heroDivider} />
            <p className={styles.heroTagline}>
              5 years of experience building backend, platform, and cloud
              infrastructure systems on AWS. Strong background in Python,
              Terraform, Databricks, and scalable internal platforms.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
