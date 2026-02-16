import GalleryGrid from "@/components/creative/GalleryGrid";
import styles from "./page.module.css";

export default function CreativePage() {
  return (
    <main className={styles.page}>
      <GalleryGrid />
    </main>
  );
}
