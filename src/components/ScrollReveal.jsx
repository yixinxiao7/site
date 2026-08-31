"use client";

import { useRef, useLayoutEffect, useState } from "react";

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  threshold = 0.15,
}) {
  const ref = useRef(null);
  // "unarmed": server-rendered default, no hidden class — always visible.
  // "armed": below the fold on mount, hidden and waiting to be observed into view.
  // "revealed": either already in the viewport on mount, or the observer fired.
  const [revealState, setRevealState] = useState("unarmed");

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const alreadyInViewport = rect.top < window.innerHeight && rect.bottom > 0;

    if (alreadyInViewport) {
      // Skip arming entirely so a deep link or restored scroll position
      // doesn't hide content only to immediately reveal it again.
      setRevealState("revealed");
      return;
    }

    setRevealState("armed");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealState("revealed");
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  const revealClass =
    revealState === "armed"
      ? "hidden-initial"
      : revealState === "revealed"
      ? "revealed"
      : "";

  return (
    <div
      ref={ref}
      className={`${className} ${revealClass}`.trim()}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
