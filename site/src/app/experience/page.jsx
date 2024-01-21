import styles from '../page.module.css'
import Header from '@/components/header'

export default function Experience() {
    return(
        <main className={styles.main}>
            <Header/>
            <div className={styles.center}>
                <div className={styles.description}>
                    <h1>
                        I am proficient in both <u>front-end</u> and <u>back-end</u> engineering
                        in the form of mobile and web development.
                        <br/><br/>
                        In recent history, I have been working largely on <u>architectural</u>, <u>platform</u> and <u>data</u> engineering through leveraging AWS and Databricks, 
                        a Spark-based platform. 
                    </h1>
                </div>
            </div>
            <div className={styles.center_new}>
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