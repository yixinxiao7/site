"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { FiPlay, FiPause } from "react-icons/fi";
import styles from "./Hobbies.module.css";

export default function GalleryItem({ item }) {
  const videoRef = useRef(null);
  // Set deliberately by the visitor via the pause/play control. The
  // IntersectionObserver below must respect this — it never resumes a
  // video the visitor paused themselves, but auto-pausing on scroll-out
  // (not a user action) doesn't set this, so it still resumes on return.
  const [userPaused, setUserPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (item.type !== "video") return;

    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);

    const handleChange = (e) => setReducedMotion(e.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, [item.type]);

  useEffect(() => {
    if (item.type !== "video" || !item.src) return;

    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!userPaused && !reducedMotion) {
            video.play().catch(() => {
              // Autoplay refused (e.g. a device power-saving mode) — fall
              // back to the poster with the play control available rather
              // than leaving an unhandled rejection.
              setUserPaused(true);
            });
          }
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [item.type, item.src, userPaused, reducedMotion]);

  const handleToggle = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      setUserPaused(false);
      video.play().catch(() => setUserPaused(true));
    } else {
      setUserPaused(true);
      video.pause();
    }
  };

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
        <>
          <video
            ref={videoRef}
            className={styles.media}
            src={item.src}
            poster={item.poster}
            aria-label={item.caption}
            muted
            loop
            playsInline
            preload="none"
            style={{ aspectRatio: item.aspectRatio }}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
          <button
            type="button"
            className={styles.videoToggle}
            onClick={handleToggle}
            aria-label={isPlaying ? "pause video" : "play video"}
          >
            {isPlaying ? (
              <FiPause aria-hidden="true" />
            ) : (
              <FiPlay aria-hidden="true" />
            )}
          </button>
        </>
      );
    }

    return (
      <Image
        className={styles.media}
        src={item.src}
        alt={item.caption}
        fill
        sizes="(max-width: 500px) 100vw, (max-width: 900px) 50vw, 33vw"
      />
    );
  };

  return (
    <div
      className={styles.item}
      style={{ aspectRatio: item.type === "image" ? item.aspectRatio : undefined }}
      tabIndex="0"
      role="figure"
      aria-label={item.caption}
    >
      {renderMedia()}
      <div className={styles.overlay} aria-hidden="true">
        <span className={styles.caption}>{item.caption}</span>
      </div>
    </div>
  );
}
