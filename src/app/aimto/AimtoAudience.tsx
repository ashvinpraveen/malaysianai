"use client";

import { useState } from "react";
import styles from "./page.module.css";

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
                onClick={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onPointerEnter={() => setActiveIndex(index)}
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
          aria-live="polite"
        >
          <strong>“{audiencePaths[activeIndex].quote}”</strong>
          <p>{audiencePaths[activeIndex].answer}</p>
        </div>
      </div>
    </section>
  );
}
