import styles from '../page.module.css'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/header'
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";

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
                        <br/><br/>
                        Want to connect? I'm reachable at any of the places below!
                        <br/><br/>
                        <a
                            href='mailto:yixinxiao7@gmail.com'
                            target="_blank"
                            rel="noopener noreferrer">
                        <MdEmail size={50} className={styles.icon}/>
                        </a>
                        <a
                            href='https://www.linkedin.com/in/yixin-xiao'
                            target="_blank"
                            rel="noopener noreferrer">
                        <FaLinkedin size={50} className={styles.icon}/>
                        </a>
                        <a 
                            href='https://github.com/yixinxiao7'
                            target="_blank"
                            rel="noopener noreferrer">
                            <FaGithub size={50} className={styles.icon}/>
                        </a>
                    </h>
                </div>
            </div>
            <div className={styles.center}>
                
            </div>
        </main>
    )
}