import Image from "next/image";
import styles from "./page.module.css";

const projectIdeas = [
  {
    type: "Ordering website",
    prompt:
      "Make me a website for people to order my home-cooked cinnamon rolls",
    image: "/aimto-assets/learnathon-inspiration-cinnamon-rolls.jpg",
  },
  {
    type: "Study companion",
    prompt:
      "Make me a study app that turns my class notes into flashcards and practice quizzes",
  },
  {
    type: "Follow-up assistant",
    prompt:
      "Make me an assistant that writes friendly customer follow-ups from my quotation details",
  },
  {
    type: "Family archive",
    prompt:
      "Make me a family website to preserve our recipes, photos and stories",
  },
  {
    type: "Budget planner",
    prompt: "Make me an app that shows where my money goes every month",
  },
  {
    type: "Community directory",
    prompt:
      "Make me a directory for people to find trusted services in my neighbourhood",
  },
  {
    type: "Trip planner",
    prompt:
      "Make me a trip planner that builds an itinerary around my family's interests",
  },
  {
    type: "Job application coach",
    prompt:
      "Make me a tool that improves my CV and helps me practise interviews",
  },
];

export default function LearnathonProjects() {
  return (
    <section
      className={styles.projectsSection}
      aria-labelledby="learnathon-projects-title"
    >
      <div className={styles.projectsIntro} data-reveal="up">
        <div>
          <div className={styles.sectionLabel}>WHAT YOU CAN BUILD_</div>
          <h2 id="learnathon-projects-title">
            Learn to build something you&apos;d love
          </h2>
        </div>
        <p>
          Even if you&apos;re a beginner, you can build complete apps with AI
          in minutes &amp; get support during this event
        </p>
      </div>

      <div
        className={styles.projectsGrid}
        aria-label="Example Learn-a-thon projects"
        data-reveal="stagger"
      >
        {projectIdeas.map((idea) => (
          <article className={styles.projectCard} key={idea.type}>
            <div
              className={`${styles.projectVisual} ${
                idea.image ? "" : styles.projectVisualPlaceholder
              }`}
            >
              {idea.image ? (
                <Image
                  src={idea.image}
                  alt="An artistic neon collage of a Malaysian home baker preparing cinnamon rolls for online orders"
                  fill
                  loading="eager"
                  sizes="(max-width: 680px) calc(100vw - 40px), (max-width: 1000px) 50vw, 25vw"
                  unoptimized
                />
              ) : (
                <span>ARTWORK NEXT_</span>
              )}
            </div>
            <div className={styles.projectDetails}>
              <small>{idea.type}</small>
              <h3>{idea.prompt}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
