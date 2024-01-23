import styles from '../page.module.css'
import Header from '@/components/header'
 

export default function Experience() {
    return(
        <main className={`${styles.main}`}>
            <Header/>
            <div className={styles.center} style={{paddingTop: '0.5rem'}}>
                <div className={styles.compact}>
                    <h>
                        I am proficient in both <u>front-end</u> and <u>back-end</u> engineering
                        in the form of mobile and web development.
                        <br/><br/>
                        In recent history, I have been working largely on <u>architectural</u>, <u>platform</u> and <u>data</u> engineering through leveraging AWS and Databricks, 
                        a Spark-based platform. 
                    </h>
                </div>
            </div>
            <div className={`${styles.box} ${styles.green}`}>
                <p>
                    <a
                        href="/Resume_2024.pdf"
                        target="_blank"
                        rel="noopener noreferrer">
                        Take a look!
                    </a>
                </p>
            </div>
        </main>
    )
}