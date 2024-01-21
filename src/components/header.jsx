"use client"; // This is a client component 
import styles from '@/app/page.module.css'
import React, { useEffect } from 'react';

export default function Header() {
    
    const setLocation = () => {
        const currentUrl = window.location.href
        const urlComps = currentUrl.split('/')
        const location = urlComps[urlComps.length-1]
        document.getElementById(location).style.textDecoration = 'underline'
    }
    
    useEffect(() => {
        setLocation()
    }, [])

    return(
       <div className={styles.header}>
            <div>
                <a href='/' id='home'>
                    <h3>Home</h3>
                </a>
            </div>
            <div>
                <a href='/about_me' id='about_me'>
                    <h3>Who am I?</h3>
                </a>
            </div>
            <div>
                <a href='/education' id='education'>
                    <h3>My Education</h3>
                </a>
            </div>
            <div>
                <a href='/experience' id='experience'>
                    <h3>What I've done</h3>
                </a>
            </div>
       </div>
    )
}