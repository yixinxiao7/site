"use client";

import { useMemo } from "react";
import { galleryItems } from "@/data/gallery";
import GalleryItem from "./GalleryItem";
import styles from "./Hobbies.module.css";

function getHeight(ratio) {
  const [w, h] = ratio.split("/").map(Number);
  return h / w;
}

function useColumns(items, count) {
  return useMemo(() => {
    const cols = Array.from({ length: count }, () => []);
    const heights = new Array(count).fill(0);

    items.forEach((item) => {
      const shortest = heights.indexOf(Math.min(...heights));
      cols[shortest].push(item);
      heights[shortest] += getHeight(item.aspectRatio);
    });

    return cols;
  }, [items, count]);
}

export default function GalleryGrid() {
  const columns = useColumns(galleryItems, 3);

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h1 className={styles.title}>i like taking photos!</h1>
        <p className={styles.subtitle}>
          here's a couple that i've taken over the years - i try to capture the life and energy of the places i visit.
        </p>
      </header>
      <div className={styles.grid}>
        {columns.map((col, i) => (
        <div key={i} className={styles.column}>
          {col.map((item) => (
            <GalleryItem key={item.id} item={item} />
          ))}
        </div>
      ))}
      </div>
    </section>
  );
}
