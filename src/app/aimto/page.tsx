import type { Metadata } from "next";
import AimtoNav from "./AimtoNav";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: {
    absolute:
      "AI Malaysia Takeover 2026 — Learn, Build & Experience Malaysian AI",
  },
  description:
    "Two days of hands-on AI learning, live demonstrations, community and new ideas. 11–12 August 2026 at The Campus, Ampang.",
  openGraph: {
    title: "AI Malaysia Takeover 2026",
    description:
      "Learn, build and experience Malaysian AI. Join us on 11–12 August 2026 at The Campus Ampang.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Malaysia Takeover 2026",
    description:
      "Two days of hands-on AI learning at The Campus, Ampang.",
  },
};

const registrationUrl =
  "https://event.aimto.my/concierge-menu/registration";

const dayTwoSessions = [
  {
    time: "10:30",
    title: "Learn-A-Thon kickoff",
    body: "What you can build, how the day works and where to get support.",
  },
  {
    time: "11:00",
    title: "From prompt to prototype",
    body: "Turn a rough idea into a functional first build.",
  },
  {
    time: "11:30",
    title: "AI APIs without the intimidation",
    body: "Understand how tools connect without getting lost in technical jargon.",
  },
  {
    time: "12:00",
    title: "Launch a tool in 20 minutes",
    body: "A fast, practical live build from idea to working output.",
  },
  {
    time: "12:30",
    title: "Build Sprint 01",
    body: "Start building with mentors and technical facilitators nearby.",
  },
  {
    time: "14:30",
    title: "Build Sprint 02",
    body: "Refine, improve or extend what you started.",
  },
  {
    time: "15:00",
    title: "Show & Tell finale",
    body: "Selected builders share what they made and what they would do next.",
  },
];

const experienceZones = [
  {
    label: "VISION + IDEAS_",
    title: "The War Room",
    body: "Big conversations, challenging perspectives and the people shaping what AI means for Malaysia.",
    image: "/aimto-assets/the-war-room.jpg",
  },
  {
    label: "DEMOS + WORKSHOPS_",
    title: "The Sandbox",
    body: "Live builds, startups, technical demonstrations and practical workshops in a high-energy open space.",
    image: "/aimto-assets/the-sandbox.jpg",
  },
  {
    label: "COMMUNITY + DISCOVERY_",
    title: "Pasar AI",
    body: "Products, services and experiences showing how AI is already changing work, business and everyday life.",
    image: "/aimto-assets/the-mainframe.jpg",
  },
];

const partnerLogos = Array.from(
  { length: 30 },
  (_, index) => `/aimto-assets/partners/${index + 1}.png`,
);

const audiencePaths = [
  {
    quote: "I’ve never used AI before.",
    answer: "Start with the beginner-friendly sessions and get set up with support.",
  },
  {
    quote: "I use ChatGPT, but want to do more.",
    answer: "Learn practical workflows, tools and how to turn prompts into prototypes.",
  },
  {
    quote: "I have an idea, but can’t build it.",
    answer: "Join the Builder Floor, find collaborators and ask a mentor when you get stuck.",
  },
  {
    quote: "I run a business or team.",
    answer: "Discover useful AI applications, startups and better ways of working.",
  },
  {
    quote: "I already build with AI.",
    answer: "Ship something new, meet collaborators, show your work or help someone begin.",
  },
];

const faqs = [
  {
    question: "Is AI Malaysia Takeover free?",
    answer:
      "Yes. Public registration and the Day 2 Learn-A-Thon are free. Some sessions have limited capacity, so registering early is the best way to secure your place.",
  },
  {
    question: "Do I need coding experience?",
    answer:
      "No. Complete beginners are welcome. The Learn-A-Thon includes setup support, practical sessions and mentors who can help you take the next step.",
  },
  {
    question: "Should I bring a laptop?",
    answer:
      "Bring a laptop and charger if you want to take part in hands-on building. You can still attend talks, demos and other public experiences without one.",
  },
  {
    question: "Do I need to attend both days?",
    answer:
      "No. Choose the sessions and experiences that fit you. Day 1 is built around learning and discovery; Day 2 gives you more time to build and share.",
  },
  {
    question: "Can experienced builders join?",
    answer:
      "Absolutely. Take on a challenge, explore advanced tools, meet other builders, showcase a project or help someone who is just getting started.",
  },
  {
    question: "Where is the event?",
    answer:
      "The Campus, Ampang, Kuala Lumpur. It is an open-air community hub with stages, builder spaces, cafés, restaurants and places to meet across the venue.",
  },
];

export default function AiMalaysiaTakeoverPage() {
  return (
    <div className={styles.site}>
      <AimtoNav registrationUrl={registrationUrl} />

      <main>
        <section className={styles.hero} id="top">
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className={styles.heroGlow} aria-hidden="true" />
          <img
            className={styles.heroWau}
            src="/aimto-hero-wau.png"
            alt=""
            aria-hidden="true"
          />
          <div className={styles.heroContent}>
            <h1>
              Learn, Build
              <br />
              <span>&amp;</span> Experience
              <br />
              Malaysian AI
            </h1>
            <div className={styles.heroEventMeta}>
              <div className={styles.heroDate}>
                <strong>
                  11—12
                  <br />
                  AUG. 2026
                </strong>
              </div>
              <div className={styles.heroPlace}>
                <span>VENUE_</span>
                <strong>THE CAMPUS AMPANG</strong>
              </div>
            </div>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href={registrationUrl}>
                Register free <span aria-hidden="true">↗</span>
              </a>
              <a className={styles.textLink} href="#programme">
                Explore the programme <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <div className={styles.heroOrganisers} aria-label="Event organisers">
            <img src="/aimto-assets/500-logo-white.png" alt="500 Global" />
            <img src="/aimto-assets/ludic-logo-white.png" alt="Ludic Asia" />
          </div>

          <div className={styles.ticker} aria-label="Event highlights">
            <div className={styles.tickerTrack}>
              <div className={styles.tickerGroup}>
                <span>LEARN AI_</span>
                <span>LIVE DEMONSTRATIONS_</span>
                <span>EXPERIENCE WHAT&apos;S NEXT_</span>
                <span>BEGINNERS WELCOME_</span>
                <span>MEET THE COMMUNITY_</span>
              </div>
              <div className={styles.tickerGroup} aria-hidden="true">
                <span>LEARN AI_</span>
                <span>LIVE DEMONSTRATIONS_</span>
                <span>EXPERIENCE WHAT&apos;S NEXT_</span>
                <span>BEGINNERS WELCOME_</span>
                <span>MEET THE COMMUNITY_</span>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.proof} aria-label="Event at a glance">
          <div>
            <strong>02</strong>
            <span>days to learn, try and build</span>
          </div>
          <div>
            <strong>ALL</strong>
            <span>experience levels welcome</span>
          </div>
          <div>
            <strong>DAY 02</strong>
            <span>hands-on demos, workshops and building</span>
          </div>
          <div>
            <strong>10—5</strong>
            <span>Builder Floor open on Day 2</span>
          </div>
        </section>

        <section className={styles.organiserStrip} aria-label="Event organisers">
          <span>ORGANISED BY_</span>
          <div>
            <img src="/aimto-assets/ludic-logo.png" alt="Ludic" />
            <img src="/aimto-assets/500-logo.png" alt="500 Global" />
          </div>
        </section>

        <section className={styles.introSection}>
          <div className={styles.sectionLabel}>01 / AI FOR THE PEOPLE_</div>
          <div className={styles.introLayout}>
            <h2>
              AI is becoming
              <br />
              everyone&apos;s skill.
            </h2>
            <div className={styles.introCopy}>
              <p className={styles.lead}>
                This is an event for everyday people to transform what they can
                do with AI.
              </p>
              <p>
                You do not need to be a developer, founder or expert. Come to
                learn a practical skill, try the latest tools, meet the people
                already building and leave with something you created.
              </p>
              <p>
                The goal is simple: help more Malaysians move from AI users to
                AI builders.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.filmSection} aria-labelledby="event-film-title">
          <div className={styles.filmHeader}>
            <div>
              <div className={styles.sectionLabel}>THE 2025 EVENT FILM_</div>
              <h2 id="event-film-title">See what AI Malaysia feels like.</h2>
            </div>
            <p>
              A look back at Malaysia&apos;s largest AI event, designed to
              empower Malaysians.
            </p>
          </div>
          <div className={styles.filmFrame}>
            <video
              controls
              playsInline
              preload="metadata"
              poster="/aimto-assets/video-poster.jpg"
              aria-label="AI Malaysia 2025 event film"
            >
              <source
                src="https://cdn.aimto.my/video/asean_ai_2025.mp4"
                type="video/mp4"
              />
              Your browser does not support embedded video.{" "}
              <a href="https://cdn.aimto.my/video/asean_ai_2025.mp4">
                Watch the 2025 event film.
              </a>
            </video>
          </div>
        </section>

        <section className={styles.programme} id="programme">
          <div className={styles.sectionHeading}>
            <div className={styles.sectionLabel}>02 / PROGRAMME_</div>
            <h2>Two days. Build your own experience.</h2>
            <p>
              Move between practical training, live builds, useful ideas,
              founder stories and community conversations.
            </p>
          </div>

          <div className={styles.daysGrid}>
            <article className={styles.dayOne}>
              <div className={styles.dayHeader}>
                <span>DAY 01_</span>
                <strong>SEE WHAT AI CAN DO FOR YOU</strong>
              </div>
              <ul>
                <li>
                  <span>WORK_</span>
                  <strong>Build a useful AI workflow for a real workday</strong>
                </li>
                <li>
                  <span>PROMPT_</span>
                  <strong>Prompt like an operator, not a tourist</strong>
                </li>
                <li>
                  <span>LIVE_</span>
                  <strong>Watch builders tackle and rescue live challenges</strong>
                </li>
                <li>
                  <span>DISCOVER_</span>
                  <strong>Explore the AI tools changing how Malaysians work</strong>
                </li>
              </ul>
              <p>
                Leave with practical ideas you can use—not just predictions
                about the future.
              </p>
            </article>

            <article className={styles.dayTwo}>
              <div className={styles.dayHeader}>
                <span>DAY 02_</span>
                <strong>BUILD SOMETHING OF YOUR OWN</strong>
              </div>
              <div className={styles.timeline}>
                {dayTwoSessions.map((session) => (
                  <div className={styles.timelineRow} key={session.time}>
                    <time>{session.time}</time>
                    <div>
                      <strong>{session.title}</strong>
                      <p>{session.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className={styles.scheduleNote}>
                Mini workshops, mentor support and rolling Show & Tell continue
                around the main programme.
              </p>
            </article>
          </div>

          <div className={styles.programmeCta}>
            <p>
              Bring a laptop and charger if you want to build. Bring your
              curiosity either way.
            </p>
            <a className={styles.primaryButton} href={registrationUrl}>
              Register free <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <section className={styles.zonesSection} id="experience">
          <div className={styles.sectionHeading}>
            <div className={styles.sectionLabel}>03 / EXPERIENCE_</div>
            <h2>One campus. Many ways into AI.</h2>
          </div>
          <div className={styles.zonesGrid}>
            {experienceZones.map((zone, index) => (
              <article className={styles.zoneCard} key={zone.label}>
                <img src={zone.image} alt="" />
                <div>
                  <span>{String(index + 1).padStart(2, "0")}_</span>
                  <em>{zone.label}</em>
                </div>
                <h3>{zone.title}</h3>
                <p>{zone.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.campusSection} id="campus">
          <div className={styles.campusVisual}>
            <div className={styles.campusGlow} aria-hidden="true" />
            <div className={styles.campusLabel}>
              <span>THE CAMPUS_</span>
              <strong>AMPANG</strong>
            </div>
            <div className={styles.campusNodes}>
              <span>ASSEMBLY HALL_</span>
              <span>CHAMPIONS&apos; COURT_</span>
              <span>ROBERT&apos;S THEATRE_</span>
              <span>CAFÉS + COMMUNITY_</span>
            </div>
          </div>
          <div className={styles.campusCopy}>
            <div className={styles.sectionLabel}>04 / THE VENUE_</div>
            <h2>More than a venue. A full-campus takeover.</h2>
            <p className={styles.lead}>
              A former school turned open-air community hub—filled with stages,
              builder spaces, cafés, restaurants and places to meet.
            </p>
            <p>
              Come for a session, stay to build, meet someone over coffee and
              move between live demos, practical workshops and the people
              making things happen.
            </p>
            <address>
              The Campus
              <br />
              Jalan Kolam Air Lama
              <br />
              Ampang, Selangor
            </address>
            <a
              className={styles.textLink}
              href="https://maps.google.com/?q=The+Campus+Ampang"
            >
              Open in maps <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <section className={styles.communitySection}>
          <div className={styles.communityGallery}>
            <img
              src="/aimto-assets/gallery-top-1.jpg"
              alt="AI Malaysia community gathered at the 2025 event"
            />
            <img
              src="/aimto-assets/gallery-mid-2.jpg"
              alt="Attendees connecting at the 2025 AI event"
            />
            <img
              src="/aimto-assets/gallery-top-2.jpg"
              alt="Builders and participants at the 2025 AI event"
            />
          </div>
          <div className={styles.communityCopy}>
            <div className={styles.sectionLabel}>05 / YOU BELONG HERE_</div>
            <h2>Come as you are.</h2>
            <div className={styles.audienceList}>
              {audiencePaths.map((path) => (
                <div key={path.quote}>
                  <strong>“{path.quote}”</strong>
                  <p>{path.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.partnersSection} id="partners">
          <div className={styles.partnersHeading}>
            <div className={styles.sectionLabel}>THE 2025 PARTNER COHORT_</div>
            <h2>The ecosystem behind the energy.</h2>
            <p>
              A look at the organisations that helped make last year&apos;s
              gathering possible.
            </p>
          </div>
          <div className={styles.partnerGrid} aria-label="2025 partner logos">
            {partnerLogos.map((logo) => (
              <div key={logo}>
                <img src={logo} alt="" />
              </div>
            ))}
          </div>
        </section>

        <section className={styles.faqSection} id="faq">
          <div className={styles.faqIntro}>
            <div className={styles.sectionLabel}>06 / FAQ_</div>
            <h2>Before you come.</h2>
            <p>
              The useful details—especially if this is your first AI event.
            </p>
          </div>
          <div className={styles.faqList}>
            {faqs.map((faq, index) => (
              <details key={faq.question}>
                <summary>
                  <span>{String(index + 1).padStart(2, "0")}_</span>
                  {faq.question}
                  <i aria-hidden="true">+</i>
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={styles.finalCta}>
          <div className={styles.finalGlow} aria-hidden="true" />
          <p className={styles.eyebrow}>11—12 AUGUST 2026 / THE CAMPUS, AMPANG_</p>
          <h2>
            COME LEARN.
            <br />
            COME BUILD.
            <br />
            <span>COME AS YOU ARE.</span>
          </h2>
          <p>
            Two days of practical AI learning, building and discovery.
          </p>
          <a className={styles.darkButton} href={registrationUrl}>
            Register free <span aria-hidden="true">↗</span>
          </a>
        </section>
      </main>

      <footer className={styles.footer} id="contact">
        <a className={styles.brand} href="#top">
          <img
            src="/aimto-assets/logo-white.png"
            alt="AI Malaysia Takeover 2026"
          />
        </a>
        <p>AI Malaysia Takeover 2026</p>
        <div>
          <a href="#programme">Programme</a>
          <a href="#experience">Experience</a>
          <a href="#campus">The Campus</a>
          <a href="#faq">FAQ</a>
        </div>
      </footer>
    </div>
  );
}
