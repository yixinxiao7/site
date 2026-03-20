"use client";

import { useState } from "react";
import { FaStrava, FaDumbbell } from "react-icons/fa6";
import styles from "./Fitness.module.css";

const races = [
  { name: "philadelphia marathon", year: 2024},
  { name: "atlanta half-marathon", year: 2025},
  { name: "dallas marathon", year: 2025},
];

export default function Fitness() {
  const [showHevy, setShowHevy] = useState(false);

  return (
    <section className={styles.section}>
      <div className={styles.layout}>
        <div className={styles.left}>
          <h2 className={styles.title}>i'm a big fan of challenging myself in all aspects of my life.</h2>
          <p className={styles.description}>
            <br />physical is no exception - i like to box and lift.
            <br />i also run - not necessarily because i like it, but because i find it difficult.
            <br />here's a list of races i have challenged myself to compete in.
            <br />i plan to continue this list and work up to a full ironman.
            <br />feel free to follow my strava and hevy profiles and roast my numbers.
          </p>
          <div className={styles.icons}>
            <a
              href="https://www.strava.com/athletes/119032446"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconLink}
              aria-label="Strava profile"
            >
              <FaStrava size={24} />
            </a>
            <div
              className={styles.iconWrapper}
              onMouseEnter={() => setShowHevy(true)}
              onMouseLeave={() => setShowHevy(false)}
              onFocus={() => setShowHevy(true)}
              onBlur={() => setShowHevy(false)}
            >
              <span
                className={styles.iconLink}
                role="button"
                tabIndex="0"
                aria-label="Hevy username: bigyeesh"
              >
                <FaDumbbell size={24} />
              </span>
              {showHevy && (
                <div className={styles.tooltip} role="tooltip">hevy - bigyeesh</div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <h3 className={styles.racesTitle}>races</h3>
          <ul className={styles.raceList}>
            {races.map((race, i) => (
              <li key={i} className={styles.raceItem}>
                <span className={styles.raceName}>{race.name}</span>
                <span className={styles.raceMeta}>
                  {race.year}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
