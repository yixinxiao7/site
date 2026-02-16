import { galleryItems } from "@/data/gallery";
import GalleryItem from "./GalleryItem";
import styles from "./Creative.module.css";

export default function GalleryGrid() {
  return (
    <div className={styles.grid}>
      {galleryItems.map((item) => (
        <GalleryItem key={item.id} item={item} />
      ))}
    </div>
  );
}
