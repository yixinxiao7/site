"use client";

import { useRef, useEffect } from "react";
import styles from "./Hobbies.module.css";

export default function GalleryItem({ item }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (item.type !== "video" || !item.src) return;

    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [item.type, item.src]);

  const renderMedia = () => {
    if (!item.src) {
      return (
        <div
          className={styles.placeholder}
          style={{
            aspectRatio: item.aspectRatio,
            backgroundColor: item.color,
          }}
        />
      );
    }

    if (item.type === "video") {
      return (
        <video
          ref={videoRef}
          className={styles.media}
          src={item.src}
          muted
          loop
          playsInline
          style={{ aspectRatio: item.aspectRatio }}
        />
      );
    }

    return (
      <img
        className={styles.media}
        src={item.src}
        alt={item.caption}
        loading="lazy"
        style={{ aspectRatio: item.aspectRatio }}
      />
    );
  };

  return (
    <div className={styles.item}>
      {renderMedia()}
      <div className={styles.overlay}>
        <span className={styles.caption}>{item.caption}</span>
      </div>
    </div>
  );
}
