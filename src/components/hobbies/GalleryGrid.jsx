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
    <div className={styles.grid}>
      {columns.map((col, i) => (
        <div key={i} className={styles.column}>
          {col.map((item) => (
            <GalleryItem key={item.id} item={item} />
          ))}
        </div>
      ))}
    </div>
  );
}
