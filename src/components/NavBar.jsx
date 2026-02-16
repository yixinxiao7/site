"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link
          href="/"
          className={`${styles.tab} ${pathname === "/" ? styles.active : ""}`}
        >
          my work experience
        </Link>
        <Link
          href="/creative"
          className={`${styles.tab} ${pathname === "/creative" ? styles.active : ""}`}
        >
          other things i like to do
        </Link>
      </div>
    </nav>
  );
}
