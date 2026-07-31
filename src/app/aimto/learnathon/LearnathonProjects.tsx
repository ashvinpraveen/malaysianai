import Image from "next/image";
import styles from "./page.module.css";

type ProjectIdea = {
  type: string;
  prompt: string;
  image?: string;
  alt?: string;
};

const projectIdeas: ProjectIdea[] = [
  {
    type: "Ordering website",
    prompt:
      "Make me a website for people to order my home-cooked cinnamon rolls",
    image: "/aimto-assets/learnathon-inspiration-cinnamon-rolls.jpg",
    alt: "An artistic neon collage of a Malaysian home baker preparing cinnamon rolls for online orders",
  },
  {
    type: "Trip planner",
    prompt:
      "Make me a trip planner that builds an itinerary around my family's interests and budget",
    image: "/aimto-assets/learnathon-project-trip-planner.jpg",
    alt: "A multigenerational Chinese Malaysian family planning a trip together",
  },
  {
    type: "Personal money tracker",
    prompt:
      "Make me a personal money tracker that shows where my money goes and helps me save for my goals",
    image: "/aimto-assets/learnathon-project-money-tracker.jpg",
    alt: "An Indian Malaysian woman organising her personal finances with a laptop",
  },
  {
    type: "Boss battle study game",
    prompt:
      "Make me a study game that turns revision into boss battles, levels and rewards",
    image: "/aimto-assets/learnathon-project-study-game.jpg",
    alt: "Malay, Chinese and Indian Malaysian teenagers studying together with a playful digital game world",
  },
  {
    type: "Wedding planner",
    prompt:
      "Make me a wedding planner to keep my guest list, budget, vendors and checklist in one place",
    image: "/aimto-assets/learnathon-project-wedding-planner.jpg",
    alt: "A Malay Malaysian couple planning their wedding with a laptop and celebration details",
  },
  {
    type: "Invoice automation",
    prompt:
      "Make me an app that creates invoices, tracks payments and follows up with customers automatically",
    image: "/aimto-assets/learnathon-project-invoice-automation.jpg",
    alt: "A Chinese Malaysian small-business owner managing invoices and customer orders",
  },
  {
    type: "Personal AI assistant",
    prompt:
      "Make me a personal AI assistant that keeps me organised and brings me the news I care about",
    image: "/aimto-assets/learnathon-project-personal-ai-assistant.jpg",
    alt: "An Indian Malaysian man using a friendly personal AI assistant at home",
  },
  {
    type: "Fitness & calorie coach",
    prompt:
      "Make me a fitness coach that plans my workouts, tracks my meals and helps me hit my goals",
    image: "/aimto-assets/learnathon-project-fitness-coach.jpg",
    alt: "Malay and Chinese Malaysian friends using a fitness and meal coach together",
  },
  {
    type: "Family care organiser",
    prompt:
      "Make me a family care organiser for medicine, appointments, school schedules and reminders",
    image: "/aimto-assets/learnathon-project-family-care.jpg",
    alt: "An Indian Malaysian mother, elderly Chinese Malaysian father and Malay Malaysian child using a family care organiser",
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
                  alt={idea.alt ?? "An artistic Learn-a-thon project illustration"}
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
