import styles from '../page.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { IoMdArrowDropleftCircle } from "react-icons/io";

export default function AboutMe() {
    return(
        <main className={styles.main}>
            <div className={styles.description}>
                <Link 
                    href="/"
                    className={styles.card}>
                <IoMdArrowDropleftCircle />
                </Link>
            </div>
            <div className={styles.grid}>
                <Image
                    src={`/me.jpeg`}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto', borderRadius: '30px'}}
                />
                <div className={styles.description}>
                    test
                </div>
            </div>
            <div className={styles.center}>

            </div>
        </main>
    )
}