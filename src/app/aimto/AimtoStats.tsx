"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

const stats = [
  { value: 3000, label: "International & Local Participants" },
  { value: 1000, label: "Hacker House Participants" },
  { value: 50, label: "Local & International Speakers" },
  { value: 50, label: "Sponsors & Exhibitors" },
];

const animationDuration = 1700;

export default function AimtoStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (
      window.matchMedia(
        "(max-width: 680px), (prefers-reduced-motion: reduce)",
      ).matches
    ) {
      setProgress(1);
      return;
    }

    let animationFrame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const startedAt = performance.now();
        const animate = (now: number) => {
          const elapsed = Math.min((now - startedAt) / animationDuration, 1);
          const eased = 1 - Math.pow(1 - elapsed, 4);
          setProgress(eased);

          if (elapsed < 1) {
            animationFrame = requestAnimationFrame(animate);
          }
        };

        animationFrame = requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.proof}
      aria-label="Event at a glance"
      data-reveal="up"
    >
      {stats.map((stat) => (
        <div className={styles.proofStat} key={stat.label}>
          <strong aria-label={`${stat.value}+`}>
            {Math.round(stat.value * progress).toLocaleString()}
            <span aria-hidden="true">+</span>
          </strong>
          <p>{stat.label}</p>
        </div>
      ))}
    </section>
  );
}
