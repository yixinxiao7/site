import GalleryGrid from "@/components/hobbies/GalleryGrid";
import Fitness from "@/components/hobbies/Fitness";
import Traveling from "@/components/hobbies/Traveling";
import styles from "./page.module.css";

export default function CreativePage() {
  return (
    <main id="main-content" className={styles.page}>
      <h1 className="sr-only">other things i like to do</h1>
      <GalleryGrid />
      <Fitness />
      <Traveling />
    </main>
  );
}
