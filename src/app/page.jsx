import Link from 'next/link'
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div/>
      <div className={styles.center}>
        <h1 style={{fontSize: '5rem'}}>Hi, I'm <b className={styles.yellow} style={{fontSize: '8rem'}}>Yixin</b>!</h1>
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

        <Link
          href="/education"
          className={styles.card}
        >
          <h2>
            My Education
          </h2>
        </Link>

        <Link
          href="/experience"
          className={styles.card}
        >
          <h2>
            What I've done
          </h2>
        </Link>
      </div>
    </main>
  );
}
