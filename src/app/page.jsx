import Hero from "@/components/professional/Hero";
import Experience from "@/components/professional/Experience";
import Certifications from "@/components/professional/Certifications";
import Projects from "@/components/professional/Projects";
import Contact from "@/components/professional/Contact";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "./page.module.css";

export default function ProfessionalPage() {
  return (
    <main id="main-content" className={styles.page}>
      <Hero />
      <ScrollReveal>
        <Experience />
      </ScrollReveal>
      <ScrollReveal>
        <Certifications />
      </ScrollReveal>
      <ScrollReveal>
        <Projects />
      </ScrollReveal>
      <ScrollReveal>
        <Contact />
      </ScrollReveal>
    </main>
  );
}
