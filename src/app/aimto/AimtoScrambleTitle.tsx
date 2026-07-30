"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

const audienceNames = [
  "THE RAKYAT",
  "ALL MALAYSIANS",
  "THE PEOPLE",
  "KITA SEMUA",
  "人民",
  "மக்கள்",
  "KITAI SEMUA",
  "THE AUNTIES",
  "THE UNCLES",
  "THE PAKCIKS",
  "THE MAKCIKS",
  "THE TEENAGERS",
  "THE STUDENTS",
  "THE RETIREES",
];

const scrambleCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&?*+/";
const holdDurationMs = 2200;
const scrambleDurationMs = 680;
const frameDurationMs = 42;

function splitGraphemes(value: string) {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter(undefined, {
      granularity: "grapheme",
    });

    return Array.from(segmenter.segment(value), ({ segment }) => segment);
  }

  return Array.from(value);
}

function randomCharacter() {
  return scrambleCharacters[
    Math.floor(Math.random() * scrambleCharacters.length)
  ];
}

export default function AimtoScrambleTitle() {
  const [audienceName, setAudienceName] = useState(audienceNames[0]);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let activeIndex = 0;
    let animationTimer: number | undefined;
    let holdTimer: number | undefined;

    const clearTimers = () => {
      if (animationTimer !== undefined) {
        window.clearTimeout(animationTimer);
        animationTimer = undefined;
      }

      if (holdTimer !== undefined) {
        window.clearTimeout(holdTimer);
        holdTimer = undefined;
      }
    };

    const runScramble = () => {
      if (reducedMotion.matches || document.hidden) return;

      const nextIndex = (activeIndex + 1) % audienceNames.length;
      const nextAudience = audienceNames[nextIndex];
      const graphemes = splitGraphemes(nextAudience);
      const startedAt = performance.now();

      const renderFrame = () => {
        const progress = Math.min(
          (performance.now() - startedAt) / scrambleDurationMs,
          1,
        );
        const revealedCount = Math.floor(progress * graphemes.length);

        setAudienceName(
          graphemes
            .map((character, index) => {
              if (character === " " || index < revealedCount) return character;
              return randomCharacter();
            })
            .join(""),
        );

        if (progress < 1) {
          animationTimer = window.setTimeout(renderFrame, frameDurationMs);
          return;
        }

        activeIndex = nextIndex;
        setAudienceName(nextAudience);
        holdTimer = window.setTimeout(runScramble, holdDurationMs);
      };

      renderFrame();
    };

    const restart = () => {
      clearTimers();
      setAudienceName(audienceNames[activeIndex]);

      if (!reducedMotion.matches && !document.hidden) {
        holdTimer = window.setTimeout(runScramble, holdDurationMs);
      }
    };

    restart();
    reducedMotion.addEventListener("change", restart);
    document.addEventListener("visibilitychange", restart);

    return () => {
      clearTimers();
      reducedMotion.removeEventListener("change", restart);
      document.removeEventListener("visibilitychange", restart);
    };
  }, []);

  return (
    <h2
      className={styles.scrambleTitle}
      aria-label="AI for the rakyat and every Malaysian community"
    >
      <span aria-hidden="true">AI For</span>
      <span className={styles.scrambleWord} aria-hidden="true">
        {audienceName}
      </span>
    </h2>
  );
}
