"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

const projectCycleMs = 4500;

const projectIdeas = [
  {
    person: "A makcik running a home food business",
    project:
      "Build a simple ordering website that turns WhatsApp enquiries into clear customer orders.",
  },
  {
    person: "A student with too many notes",
    project:
      "Build a study website that turns class notes into summaries, flashcards and quiz questions.",
  },
  {
    person: "A small-business owner chasing follow-ups",
    project:
      "Build an assistant that drafts quotations and polite customer follow-ups from a few details.",
  },
  {
    person: "A retiree preserving family stories",
    project:
      "Build a family website for recipes, photos and stories the next generation can keep.",
  },
];

export default function LearnathonProjects() {
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
          return (currentIndex + 1) % projectIdeas.length;
        });
      }, projectCycleMs);
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

  const selectProject = (index: number) => {
    setAnnounceChange(true);
    setActiveIndex(index);
    setCycleVersion((version) => version + 1);
  };

  return (
    <section
      className={styles.communitySection}
      aria-labelledby="learnathon-projects-title"
    >
      <div className={styles.communityCopy} data-reveal="up">
        <div className={styles.communityHeading}>
          <div>
            <div className={styles.sectionLabel}>WHAT TO BUILD_</div>
            <h2 id="learnathon-projects-title">
              Four people. Four useful first builds.
            </h2>
          </div>
          <p>
            Start with a real person and one familiar problem. Your first AI
            project does not need to be complicated to be useful.
          </p>
        </div>
        <div className={styles.audienceList} aria-label="Example projects">
          {projectIdeas.map((idea, index) => {
            const isActive = activeIndex === index;

            return (
              <button
                className={`${styles.audienceStage} ${
                  isActive ? styles.audienceStageActive : ""
                }`}
                key={idea.person}
                type="button"
                aria-pressed={isActive}
                aria-controls="learnathon-project-detail"
                aria-label={`${index + 1}. ${idea.person}`}
                onClick={() => selectProject(index)}
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
          id="learnathon-project-detail"
          aria-live={announceChange ? "polite" : "off"}
        >
          <strong>{projectIdeas[activeIndex].person}</strong>
          <p>{projectIdeas[activeIndex].project}</p>
        </div>
      </div>
    </section>
  );
}
