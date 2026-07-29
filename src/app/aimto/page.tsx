import type { Metadata } from "next";
import Image from "next/image";
import AimtoAudience from "./AimtoAudience";
import AimtoMotion from "./AimtoMotion";
import AimtoNav from "./AimtoNav";
import AimtoStats from "./AimtoStats";
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

const experienceZones = [
  {
    label: "THE WAR ROOM_",
    title: "Keynotes & Panels",
    body: "Learn from the discussions of Malaysia’s top tech architects, policymakers, and global AI leaders to discuss and map the nation’s digital future.",
    image: "/aimto-assets/the-war-room.jpg",
  },
  {
    label: "PUBLIC AI LEARNING_",
    title: "Learn-a-thon",
    body: "Get hands on with AI. Learn to actually build things with AI. Vibe code your first websites and apps, get your personal assistant AI agents setup, meet Malaysia’s AI builder community and get help from mentors and AI engineers ready to support you.",
    image: "/aimto-assets/learnathon-builder-floor.jpg",
  },
  {
    label: "THE SANDBOX_",
    title: "Workshops & Live Demos",
    body: "Catch up with the latest AI developments shaking the industry. Learn from what’s working from leading practitioners, and get ideas and skills you can apply in your life.",
    image: "/aimto-assets/the-sandbox.jpg",
  },
  {
    label: "COMMUNITY + DISCOVERY_",
    title: "Pasar AI",
    body: "Discover the latest AI solutions, products and experiences from world leading institutions. Designed as a space for discovery, connection and conversation, Pasar AI brings together exhibitors and participants to explore how AI is transforming work, business, creativity and everyday life in Malaysia.",
    image: "/aimto-assets/the-mainframe.jpg",
  },
];

const partnerLogos = Array.from(
  { length: 30 },
  (_, index) => `/aimto-assets/partners/${index + 1}.png`,
);

const faqs = [
  {
    question: "Is AI Malaysia Takeover free?",
    answer:
      "Yes. Public registration includes access to the event programme. Some sessions have limited capacity, so registering early is the best way to secure your place.",
  },
  {
    question: "Do I need coding experience?",
    answer:
      "No. Complete beginners are welcome, with setup support, practical sessions and mentors who can help you take the next step.",
  },
  {
    question: "Should I bring a laptop?",
    answer:
      "Bring a laptop and charger if you want to take part in hands-on building. You can still attend talks, demos and other public experiences without one.",
  },
  {
    question: "Do I need to attend both days?",
    answer:
      "No. Choose the sessions and experiences that fit you. Both days bring together learning, demonstrations, community activities and opportunities to build.",
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
    <div className={styles.site} id="aimto-site">
      <AimtoMotion rootId="aimto-site" />
      <AimtoNav registrationUrl={registrationUrl} />

      <main>
        <section className={styles.hero} id="top">
          <div className={styles.heroGrid} aria-hidden="true" />
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
                  AUG 2026
                </strong>
              </div>
              <div className={styles.heroPlace}>
                <span>VENUE_</span>
                <strong>
                  THE CAMPUS
                  <br />
                  KUALA LUMPUR
                </strong>
              </div>
            </div>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href={registrationUrl}>
                Secure your seats now <span aria-hidden="true">↗</span>
              </a>
              <a className={styles.textLink} href="#experience">
                Explore the event <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <div className={styles.heroOrganisers} aria-label="Event organisers">
            <span>ORGANISED BY_</span>
            <div>
              <Image
                src="/aimto-assets/ludic-logo-white.png"
                alt="Ludic Asia"
                width={800}
                height={275}
                sizes="110px"
              />
              <Image
                src="/aimto-assets/500-logo-white.png"
                alt="500 Global"
                width={800}
                height={275}
                sizes="100px"
              />
            </div>
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

        <AimtoStats />

        <section className={styles.introSection}>
          <div className={styles.sectionLabel} data-reveal="up">
            AI FOR THE PEOPLE_
          </div>
          <div className={styles.introLayout} data-reveal="up">
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
                We&apos;re curating a series of workshops, panels, community
                events and practical hands-on build sessions to support you in
                your journey towards mastering AI.
              </p>
            </div>
          </div>
          <div
            className={styles.introGallery}
            aria-label="Scenes from the 2025 event"
            data-reveal="stagger"
          >
            <Image
              src="/aimto-assets/gallery-bottom.jpg"
              alt="The 2025 AI Malaysia event stage"
              width={2000}
              height={520}
              sizes="(max-width: 680px) 100vw, 50vw"
            />
            <Image
              src="/aimto-assets/gallery-mid-1.jpg"
              alt="A packed session at the 2025 event"
              width={390}
              height={460}
              sizes="(max-width: 680px) 50vw, 25vw"
            />
            <Image
              src="/aimto-assets/enterprise-ecosystem-leaders.jpg"
              alt="Attendees trying an AI experience at the 2025 event"
              width={900}
              height={520}
              sizes="(max-width: 680px) 50vw, 25vw"
            />
          </div>
        </section>

        <section className={styles.filmSection} aria-labelledby="event-film-title">
          <div className={styles.filmHeader} data-reveal="up">
            <div>
              <div className={styles.sectionLabel}>THE 2025 EVENT FILM_</div>
              <h2 id="event-film-title">See what AI Malaysia feels like.</h2>
            </div>
            <p>
              A look back at Malaysia&apos;s largest AI event, designed to
              empower Malaysians.
            </p>
          </div>
          <div className={styles.filmFrame} data-reveal="soft">
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

        <section className={styles.zonesSection} id="experience">
          <div className={styles.sectionHeading} data-reveal="up">
            <div className={styles.sectionLabel}>02 / EXPERIENCE_</div>
            <h2>See AI in action.</h2>
          </div>
          <div className={styles.zonesGrid} data-reveal="stagger">
            {experienceZones.map((zone, index) => (
              <article className={styles.zoneCard} key={zone.label}>
                <Image
                  src={zone.image}
                  alt=""
                  width={800}
                  height={520}
                  sizes="(max-width: 680px) 100vw, 50vw"
                />
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
          <div className={styles.campusCopy} data-reveal="up">
            <div className={styles.campusIntro}>
              <div className={styles.sectionLabel}>VENUE_</div>
              <h2>The Campus Ampang</h2>
              <p>
                A former school reimagined as an open-air community hub, with
                courtyards, halls and shared spaces made for people to gather.
                For two days, the whole campus becomes the home of AI Malaysia
                Takeover.
              </p>
            </div>
            <div className={styles.campusMeta}>
              <address>
                Jalan Kolam Air Lama
                <br />
                Ampang, Kuala Lumpur
              </address>
              <a
                className={styles.textLink}
                href="https://maps.google.com/?q=The+Campus+Ampang"
              >
                Open in maps <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <div className={styles.campusGallery} data-reveal="stagger">
            <Image
              className={styles.campusExterior}
              src="/aimto-assets/campus-exterior.jpg"
              alt="The Campus Ampang exterior"
              width={1500}
              height={1000}
              sizes="(max-width: 680px) 100vw, 70vw"
            />
            <Image
              className={styles.campusCourtyard}
              src="/aimto-assets/campus-courtyard.jpg"
              alt="The Campus Ampang open-air courtyard"
              width={1000}
              height={1500}
              sizes="(max-width: 680px) 50vw, 30vw"
            />
            <Image
              className={styles.campusSteps}
              src="/aimto-assets/campus-steps.jpg"
              alt="The Campus Ampang amphitheatre steps"
              width={1500}
              height={1000}
              sizes="(max-width: 680px) 50vw, 30vw"
            />
          </div>
          <p className={styles.campusCredit}>
            Photography: H. Lin Ho Photography and Amran Bin Yahaya. Images via{" "}
            <a
              href="https://architecturemalaysia.my/2026/06/24/the-campus-ampang/"
              target="_blank"
              rel="noreferrer"
            >
              Architecture Malaysia
            </a>
            .
          </p>
        </section>

        <AimtoAudience />

        <section className={styles.partnersSection} id="partners">
          <div className={styles.partnersHeading} data-reveal="up">
            <div className={styles.sectionLabel}>THE 2025 PARTNER COHORT_</div>
            <h2>The ecosystem behind the energy.</h2>
            <p>
              A look at the organisations that helped make last year&apos;s
              gathering possible.
            </p>
          </div>
          <div
            className={styles.partnerGrid}
            aria-label="2025 partner logos"
            data-reveal="soft"
          >
            {partnerLogos.map((logo) => (
              <div key={logo}>
                <Image
                  src={logo}
                  alt=""
                  width={240}
                  height={140}
                  sizes="(max-width: 680px) 20vw, 10vw"
                />
              </div>
            ))}
          </div>
        </section>

        <section className={styles.faqSection} id="faq">
          <div className={styles.faqIntro} data-reveal="up">
            <div className={styles.sectionLabel}>04 / FAQ_</div>
            <h2>Before you come.</h2>
            <p>
              The useful details—especially if this is your first AI event.
            </p>
          </div>
          <div className={styles.faqList} data-reveal="up">
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
          <Image
            className={styles.finalWau}
            src="/aimto-hero-wau.png"
            alt=""
            aria-hidden="true"
            width={1536}
            height={1024}
            sizes="75vw"
            data-reveal="fade"
          />
          <div className={styles.finalGlow} aria-hidden="true" />
          <div data-reveal="up">
            <p className={styles.eyebrow}>
              11—12 AUGUST 2026 / THE CAMPUS AMPANG_
            </p>
            <h2>
              <span>Join</span> the takeover.
            </h2>
            <a className={styles.darkButton} href={registrationUrl}>
              Secure your seats now <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>

      <footer className={styles.footer} id="contact">
        <a className={styles.brand} href="#top">
          <Image
            src="/aimto-assets/logo-white.png"
            alt="AI Malaysia Takeover 2026"
            width={600}
            height={113}
            sizes="180px"
          />
        </a>
        <p>AI Malaysia Takeover 2026</p>
      </footer>
    </div>
  );
}
