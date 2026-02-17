import GalleryGrid from "@/components/hobbies/GalleryGrid";
import Fitness from "@/components/hobbies/Fitness";
import styles from "./page.module.css";

export default function CreativePage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>i like taking photos!</h1>
        <p className={styles.subtitle}>
          here's a couple that i've taken over the years - i try to capture the life and energy of the places i visit.
        </p>
      </header>
      <GalleryGrid />
      <Fitness />
    </main>
  );
}
