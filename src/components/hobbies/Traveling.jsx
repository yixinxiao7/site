"use client";

import { useState, useRef } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import styles from "./Traveling.module.css";

const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const visitedStates = [
  "Maryland",
  "New York",
  "California",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Illinois",
  "Louisiana",
  "Maine",
  "Massachusetts",
  "Michigan",
  "New Jersey",
  "North Carolina",
  "Ohio",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "Tennessee",
  "Texas",
  "Utah",
  "Virginia",
  "Washington",
  "West Virginia"
];

export default function Traveling() {
  const [tooltip, setTooltip] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.title}><b>i like going to different places.</b></h2>
      <p className={styles.description}>
        i find travel as one of the greatest tools to learn about different cultures and perspectives.
        <br />one of my domestic travel goals is to visit all 50 states.
        <br />below's a map of states i've been to so far.
      </p>
      <div
        className={styles.mapContainer}
        ref={containerRef}
        onMouseMove={handleMouseMove}
        role="img"
        aria-label={`Map of the United States showing ${visitedStates.length} visited states`}
      >
        <ComposableMap projection="geoAlbersUsa" className={styles.map} aria-hidden="true">
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const name = geo.properties.name;
                const isVisited = visitedStates.includes(name);
                return (
                  <Geography
                    key={geo.rpiId}
                    geography={geo}
                    className={isVisited ? styles.visited : styles.unvisited}
                    onMouseEnter={() => setTooltip(name.toLowerCase())}
                    onMouseLeave={() => setTooltip("")}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none" },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
        {tooltip && (
          <div
            className={styles.tooltip}
            style={{ left: mousePos.x, top: mousePos.y }}
            role="tooltip"
          >
            {tooltip}
          </div>
        )}
      </div>
      <ul className={styles.srOnly} aria-label="Visited states">
        {visitedStates.map((state) => (
          <li key={state}>{state}</li>
        ))}
      </ul>
    </section>
  );
}
