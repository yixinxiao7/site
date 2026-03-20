import { projects } from "@/data/experience";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import styles from "./Professional.module.css";

export default function Projects() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionLabel}>Projects</h2>
        <div className={styles.projectsGrid}>
          {projects.map((project, i) => (
            <div key={i} className={styles.projectCard}>
              <div className={styles.projectHeader}>
                <span className={styles.projectName}>{project.name}</span>
                <div className={styles.projectLinks}>
                  {project.webapp && (
                    <a
                      href={project.webapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.projectLink}
                      aria-label={`${project.name} live app`}
                    >
                      <FiExternalLink size={16} />
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.projectLink}
                      aria-label={`${project.name} on GitHub`}
                    >
                      <FiGithub size={16} />
                    </a>
                  )}
                </div>
              </div>
              <span className={styles.projectSubtitle}>{project.subtitle}</span>
              <p className={styles.projectDescription}>{project.description}</p>
              {project.warning && (
                <p className={styles.projectWarning}>⚠ {project.warning}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
