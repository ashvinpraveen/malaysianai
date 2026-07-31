import styles from "./page.module.css";

const projectIdeas = [
  {
    number: "01",
    person: "A makcik with a home food business",
    type: "Ordering website",
    project:
      "Turn WhatsApp enquiries into a simple menu and clear customer orders.",
  },
  {
    number: "02",
    person: "A student with too many notes",
    type: "Study companion",
    project:
      "Turn class notes into summaries, flashcards and practice questions.",
  },
  {
    number: "03",
    person: "A small-business owner",
    type: "Follow-up assistant",
    project:
      "Draft quotations and polite customer follow-ups from a few details.",
  },
  {
    number: "04",
    person: "A retiree preserving family stories",
    type: "Family archive",
    project:
      "Collect recipes, photographs and stories in a website the family can keep.",
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
          <div className={styles.sectionLabel}>WHAT TO BUILD_</div>
          <h2 id="learnathon-projects-title">
            Build something you&apos;d love to use.
          </h2>
        </div>
        <p>
          Start with one real problem from daily life. Your first AI project
          does not need to be complicated to be genuinely useful.
        </p>
      </div>

      <div
        className={styles.projectsGrid}
        aria-label="Example Learn-a-thon projects"
        data-reveal="stagger"
      >
        {projectIdeas.map((idea) => (
          <article className={styles.projectCard} key={idea.number}>
            <span className={styles.projectNumber}>{idea.number}_</span>
            <div className={styles.projectDetails}>
              <small>{idea.type}</small>
              <h3>{idea.person}</h3>
              <p>{idea.project}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
