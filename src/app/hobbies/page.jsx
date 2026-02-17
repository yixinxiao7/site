import GalleryGrid from "@/components/hobbies/GalleryGrid";
import Fitness from "@/components/hobbies/Fitness";
import Traveling from "@/components/hobbies/Traveling";
import styles from "./page.module.css";

export default function CreativePage() {
  return (
    <main className={styles.page}>
      <GalleryGrid />
      <Fitness />
      <Traveling />
    </main>
  );
}
