import { experiences, education } from "@/data/experience";
import styles from "./Professional.module.css";

export default function Experience() {
  return (
    <>
    <section className={`${styles.section} ${styles.sectionAlt}`}>
      <div className={styles.container}>
        <p className={styles.sectionLabel}>Experience</p>

        {experiences.map((exp, i) => (
          <div key={i} className={styles.experienceItem}>
            <div className={styles.experienceHeader}>
              <span className={styles.companyName}>{exp.company}</span>
              <span className={styles.experiencePeriod}>{exp.period}</span>
            </div>
            <p className={styles.experienceRole}>
              {exp.title} · {exp.location}
            </p>
            <ul className={styles.experienceDesc}>
              {exp.description.map((d, j) => (
                <li key={j}>{d}</li>
              ))}
            </ul>
          </div>
        ))}

      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.sectionLabel}>Education</p>
        <div className={styles.experienceHeader}>
          <span className={styles.companyName}>{education.school}</span>
          <span className={styles.experiencePeriod}>{education.period}</span>
        </div>
        <p className={styles.experienceRole}>{education.degree}</p>
        <p className={styles.degree}>{education.minor}</p>
        {education.extras && (
          <p className={styles.degree}>{education.extras}</p>
        )}
      </div>
    </section>
    </>
  );
}
