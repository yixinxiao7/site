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
                <IoMdArrowDropleftCircle size={20}/>
                </Link>
            </div>
            <div className={styles.grid}>
                <Image
                    src={`/me.jpeg`}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '50%', height: 'auto', borderRadius: '30px'}}
                />
                <div className={styles.description_new}>
                    <h>
                        My name is <b className={styles.yellow}>Yixin Xiao</b> (ee-shin sh-ow). I'm a senior software engineer based in New York City, working 
                        at Capital One currently. 
                        <br/><br/>
                        I graduated from University of Michigan - Ann Arbor in 2021 with a BSE in Computer Science 
                        Engineering. While at school, I was heavily involved with Tau Beta Pi (Engineer honor society),
                        as well as Michigan Hackers.
                        <br/><br/>
                        If you catch me outside the office, I'll most likely be looking for the next plant to
                        my humble plant family, at the gym weight-lifting or boxing, or wondering the city to dine at the 
                        next mouth-watering restaurant. 
                    </h>
                </div>
            </div>
            <div className={styles.center}>
                
            </div>
        </main>
    )
}