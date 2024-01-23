import styles from '../page.module.css'
import Image from 'next/image'
import Header from '@/components/header'

export default function Education() {
    return(
        <main className={styles.main}>
            <Header/>
            <div className={styles.center} style={{paddingBottom: '0'}}>
                <div style={{display:'block', textAlign: 'center'}}>
                <h1>
                        Education
                    </h1>
                    <hr/>
                <h1>
                    <b className={styles.green}>University of Michigan - Ann Arbor</b>  
                </h1>
                <h2 className={styles.michigan_blue}>BSE in Computer Science Engineering</h2>
                <h2 className={styles.michigan_blue}>Minor in Business Administration</h2>
                <h2 className={styles.green}>2017-2021</h2>
                </div>
            </div>
            <div className={styles.center} style={{paddingTop: '0'}}>
                <div style={{display:'block', textAlign: 'center'}}>
                    <h1>
                        Certification
                    </h1>
                    <hr/>
                    <h2>
                        AWS Certified Solutions Architect - Associate
                    </h2>
                </div>
            </div>
            <div/>
        </main>
    )
}