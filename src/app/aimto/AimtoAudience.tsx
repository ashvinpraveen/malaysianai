"use client";

import { useState } from "react";
import Image from "next/image";
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
    <section className={styles.communitySection}>
      <div className={styles.communityGallery} data-reveal="stagger">
        <Image
          src="/aimto-assets/gallery-top-1.jpg"
          alt="AI Malaysia community gathered at the 2025 event"
          width={900}
          height={520}
          sizes="(max-width: 1000px) 60vw, 30vw"
        />
        <Image
          src="/aimto-assets/gallery-mid-2.jpg"
          alt="Attendees connecting at the 2025 AI event"
          width={390}
          height={460}
          sizes="(max-width: 1000px) 40vw, 20vw"
        />
        <Image
          src="/aimto-assets/gallery-top-2.jpg"
          alt="Builders and participants at the 2025 AI event"
          width={600}
          height={460}
          sizes="(max-width: 1000px) 40vw, 20vw"
        />
      </div>
      <div className={styles.communityCopy} data-reveal="up">
        <div className={styles.sectionLabel}>WHO THIS IS FOR_</div>
        <h2>AI for everyone</h2>
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
                onClick={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onPointerEnter={() => setActiveIndex(index)}
              >
                <span className={styles.stageMarker} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <strong>“{path.quote}”</strong>
                <p>{path.answer}</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
