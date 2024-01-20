import styles from '../page.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { IoMdArrowDropleftCircle } from "react-icons/io";

export default function Experience() {
    return(
        <main className={styles.main}>
      <div className={styles.center}>

      </div>

      <div className={styles.center}>
        <div className={styles.description}>
            <p>
                I am proficient in both <u>front-end</u> and <u>back-end</u> engineering
                in the form of mobile and web development.
                <br/><br/>
                In recent history, I have been working largely on <u>architectural</u>, <u>platform</u> and <u>data</u> engineering through leveraging AWS and Databricks, 
                a Spark-based platform. 
            </p>
        </div>
      </div>
    <div className={styles.center}>
        <div className={styles.description}
        style={{paddingBottom: '80%'}}>
            <h1>
                <a
                    href="/Resume_2024.pdf"
                    target="_blank"
                    rel="noopener noreferrer">
                    Take a look!
                </a>
            </h1>
            
        </div>
    </div>
    </main>
    )
}