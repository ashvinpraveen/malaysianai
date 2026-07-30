"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

const audienceCycleMs = 4500;

const audiencePaths = [
  {
    quote: "I’ve never used AI before.",
    answer:
      "Start with the beginner-friendly sessions and get set up with support.",
  },
  {
    quote: "I use ChatGPT, but want to do more.",
    answer:
      "Learn practical workflows, tools and how to turn prompts into prototypes.",
  },
  {
    quote: "I have an idea, but don’t know how to build it.",
    answer:
      "Join the Builder Floor, find collaborators and ask a mentor when you get stuck.",
  },
  {
    quote: "I run a business or team.",
    answer:
      "Discover useful AI applications, startups and better ways of working.",
  },
  {
    quote: "I already build with AI.",
    answer:
      "Ship something new, meet collaborators, show your work or help someone begin.",
  },
];

export default function AimtoAudience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cycleVersion, setCycleVersion] = useState(0);
  const [announceChange, setAnnounceChange] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let intervalId: number | undefined;

    const stopCycle = () => {
      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
        intervalId = undefined;
      }
    };

    const startCycle = () => {
      stopCycle();

      if (reducedMotion.matches || document.hidden) {
        return;
      }

      intervalId = window.setInterval(() => {
        setAnnounceChange(false);
        setActiveIndex((currentIndex) => {
          return (currentIndex + 1) % audiencePaths.length;
        });
      }, audienceCycleMs);
    };

    startCycle();
    reducedMotion.addEventListener("change", startCycle);
    document.addEventListener("visibilitychange", startCycle);

    return () => {
      stopCycle();
      reducedMotion.removeEventListener("change", startCycle);
      document.removeEventListener("visibilitychange", startCycle);
    };
  }, [cycleVersion]);

  const selectAudiencePath = (index: number) => {
    setAnnounceChange(true);
    setActiveIndex(index);
    setCycleVersion((version) => version + 1);
  };

  return (
    <section
      className={styles.communitySection}
      aria-labelledby="aimto-audience-title"
    >
      <div className={styles.communityCopy} data-reveal="up">
        <div className={styles.communityHeading}>
          <div>
            <div className={styles.sectionLabel}>WHO THIS IS FOR_</div>
            <h2 id="aimto-audience-title">
              Supporting you along your journey.
            </h2>
          </div>
          <p>
            Start wherever you are. The event is designed to move with you from
            first use to confident building.
          </p>
        </div>
        <div className={styles.audienceList} aria-label="Who this event is for">
          {audiencePaths.map((path, index) => {
            const isActive = activeIndex === index;

            return (
              <button
                className={`${styles.audienceStage} ${
                  isActive ? styles.audienceStageActive : ""
                }`}
                key={path.quote}
                type="button"
                aria-pressed={isActive}
                aria-controls="aimto-audience-detail"
                aria-label={`${index + 1}. ${path.quote}`}
                onClick={() => selectAudiencePath(index)}
              >
                <span className={styles.stageMarker} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>
        <div
          className={styles.audienceDetail}
          id="aimto-audience-detail"
          aria-live={announceChange ? "polite" : "off"}
        >
          <strong>“{audiencePaths[activeIndex].quote}”</strong>
          <p>{audiencePaths[activeIndex].answer}</p>
        </div>
      </div>
    </section>
  );
}
