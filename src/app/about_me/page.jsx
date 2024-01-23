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
                    style={{ width: '50%', height: 'auto', borderRadius: '30px'}}
                />
                <div className={styles.description_new}>
                    <h>
                        My name is <b className={styles.yellow}>Yixin Xiao</b> (ee-shin sh-ow). I'm a senior software engineer based in New York City, working 
                        at Capital One. 
                        <br/><br/>
                        I'm passionate about full-stack engineering, data/AI science, and misinformation management. While at UMich, I enjoyed being a part of Tau Beta Pi (Engineering honor society) and Michigan Hackers. The experiences I gained from these student organizations, coupled with my career journey, have significantly shaped these passions of mine.
                        <br/><br/>
                        If you catch me outside the office, chances are I'll be on the hunt for the next plant to add to my humble plant family, weight-lifting or boxing, or simply exploring the city in search of the next mouth-watering restaurant to dine at.
                        <br/><br/>
                        Interested in connecting? You can reach me through any of the channels listed below!
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
            <div/>
        </main>
    )
}