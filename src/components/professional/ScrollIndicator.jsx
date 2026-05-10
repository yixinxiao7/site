"use client";

import { useEffect, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import styles from "./Professional.module.css";

export default function ScrollIndicator() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    const target = document.getElementById("experience");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="scroll to experience"
      className={`${styles.scrollIndicator} ${hidden ? styles.scrollIndicatorHidden : ""}`}
    >
      <span className={styles.scrollIndicatorLabel}>What I&apos;ve Done</span>
      <FiChevronDown className={styles.scrollIndicatorIcon} aria-hidden="true" />
    </button>
  );
}
