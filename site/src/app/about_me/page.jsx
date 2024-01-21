import styles from '../page.module.css'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/header'

export default function AboutMe() {
    return(
        <main className={styles.main}>
            <Header/>
            <div className={styles.row}>
                <Image
                    src={`/me.jpeg`}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '30%', height: 'auto', borderRadius: '30px'}}
                />
                <div className={styles.description_new}>
                    <h>
                        My name is <b className={styles.yellow}>Yixin Xiao</b> (ee-shin sh-ow). I'm a senior software engineer based in New York City, working 
                        at Capital One currently. 
                        <br/><br/>
                        I'm passionate in full-stack engineering, data/AI science as well as misinformation management. 
                        While at school, I was heavily involved with Tau Beta Pi (Engineer honor society)
                        as well as Michigan Hackers. My involvement in these student orgs along with my career experiences
                        has profoundly shaped said passions.
                        <br/><br/>
                        If you catch me outside the office, I'll most likely be looking for the next plant to join
                        my humble plant family, weight-lifting or boxing, or wondering the city to dine at the 
                        next mouth-watering restaurant. 
                    </h>
                </div>
            </div>
            <div className={styles.center}>
                
            </div>
        </main>
    )
}