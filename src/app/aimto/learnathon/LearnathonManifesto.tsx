"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

type LearnathonManifestoProps = {
  text: string;
};

export default function LearnathonManifesto({
  text,
}: LearnathonManifestoProps) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const words = text.split(" ");

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const canAnimate = desktopQuery.matches && !reducedMotionQuery.matches;

    setShouldAnimate(canAnimate);

    if (!canAnimate) return;

    const onScroll = () => {
      const element = textRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const nextProgress =
        (viewportHeight * 0.85 - rect.top) / (viewportHeight * 0.65);

      setProgress(Math.max(0, Math.min(1, nextProgress)));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className={styles.manifestoSection} aria-labelledby="manifesto-title">
      <div className={styles.manifestoLabel}>
        Made for every kind of Malaysian
      </div>
      <p id="manifesto-title" ref={textRef}>
        {words.map((word, index) => {
          const wordProgress = shouldAnimate
            ? Math.max(0, Math.min(1, progress * words.length - index))
            : null;

          return (
            <span
              key={`${word}-${index}`}
              style={
                wordProgress === null
                  ? undefined
                  : {
                      color: `rgba(18, 18, 20, ${0.22 + wordProgress * 0.78})`,
                    }
              }
            >
              {word}{" "}
            </span>
          );
        })}
      </p>
    </section>
  );
}
