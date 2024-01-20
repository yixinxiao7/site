import Link from 'next/link'
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
      </div>

      <div className={styles.center}>
        <h1>Hi, I'm Yixin!</h1>
      </div>

      <div className={styles.grid}>
        <Link
          href="/about_me"
          className={styles.card}
        >
          <h2>
            Who am I?
          </h2>
        </Link>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
        >
          <h2>
            What I've done
          </h2>
        </a>
      </div>
    </main>
  );
}
