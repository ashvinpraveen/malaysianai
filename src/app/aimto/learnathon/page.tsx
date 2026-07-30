import type { Metadata } from "next";
import Image from "next/image";
import AimtoButton from "../AimtoButton";
import AimtoMotion from "../AimtoMotion";
import AimtoNav from "../AimtoNav";
import siteStyles from "../page.module.css";
import LearnathonManifesto from "./LearnathonManifesto";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: {
    absolute: "Learn-a-thon — Make Something With AI",
  },
  description:
    "A free AI build day for curious beginners of every age. Make something useful, creative or wonderfully strange with trainers and mentors beside you.",
};

const registrationUrl =
  "https://event.aimto.my/concierge-menu/registration";

const learnathonHighlights = [
  "NO CODING NEEDED_",
  "MENTORS ON THE FLOOR_",
  "COME ALONE OR TOGETHER_",
  "TAKE YOUR PROJECT HOME_",
];

const howItWorks = [
  {
    number: "01",
    label: "A simple first step",
    title: "Get your starter pack",
    body: "We make it easy to begin with the right tools, starter templates and a clear first step—even if you have never built with AI before.",
    accent: "lime",
  },
  {
    number: "02",
    label: "Ideas from the community",
    title: "Get inspiration",
    body: "See what other Malaysians are building, meet the community and discover projects that could make your own life better.",
    accent: "cyan",
  },
  {
    number: "03",
    label: "Make it yours",
    title: "Start building",
    body: "Create an app, a personal tool or an AI agent for your work, studies, family, business or everyday life.",
    accent: "pink",
  },
  {
    number: "04",
    label: "People beside you",
    title: "Get help",
    body: "Dedicated trainers and mentors will support you when you get stuck and help you take the next step with confidence.",
    accent: "orange",
  },
];

const trainers = ["Timothy Tiah", "Jon Lai", "Warren Leow", "Danial Hadi"];

const manifesto =
  "We’re bringing together Malaysians from all walks of life—from teenagers to retirees—for a one-day public training event where everyone can learn to make something useful with AI. Whether it is an app, a personal tool or your first AI agent, we will give you the setup, inspiration and human support to start building with confidence. This is a first-of-its-kind public AI learning event for Malaysia.";

const faqs = [
  {
    question: "Do I need to know coding?",
    answer:
      "No. Complete beginners are welcome. We will have guided starting points, templates and people on the floor to help.",
  },
  {
    question: "What if I do not have an idea?",
    answer:
      "Borrow one of our missions. You can make something for daily life, study, creativity, work or your community.",
  },
  {
    question: "What should I bring?",
    answer:
      "Bring a laptop and charger if you want to build. Bring curiosity too. We will share any account or setup guidance before the day.",
  },
  {
    question: "Can I come with friends or family?",
    answer:
      "Yes. Come alone, bring a friend or learn alongside family. Builder capacity is limited, so everyone who plans to take part should register.",
  },
  {
    question: "Do I have to present what I make?",
    answer:
      "Not at all. Show & Tell is there for anyone who wants to share. Quietly taking your project home is a perfectly good finish.",
  },
  {
    question: "Is it really free?",
    answer:
      "Yes. Registration for the public Learn-a-thon is free. Some tools may have their own optional paid plans after the event; we will be clear about that.",
  },
];

export default function LearnathonPage() {
  return (
    <div
      className={`${siteStyles.site} ${styles.learnathonPage}`}
      id="aimto-learnathon-site"
    >
      <AimtoMotion rootId="aimto-learnathon-site" />
      <AimtoNav registrationUrl={registrationUrl} />

      <main>
        <section
          className={`${siteStyles.hero} ${styles.learnathonHero}`}
          id="top"
        >
          <div className={siteStyles.heroGrid} aria-hidden="true" />
          <div className={siteStyles.heroContent}>
            <h1>
              The Malaysian
              <br />
              <span>Learn-a-thon</span>
            </h1>
            <p className={`${siteStyles.heroIntro} ${styles.learnathonIntro}`}>
              A day of free public training where anyone can learn to vibe code,
              design and make your own apps and tools with AI.
            </p>
            <div className={siteStyles.heroEventMeta}>
              <div className={siteStyles.heroDate}>
                <strong>
                  12
                  <br />
                  AUG 2026
                </strong>
              </div>
              <div className={siteStyles.heroPlace}>
                <span>VENUE_</span>
                <strong>
                  THE CAMPUS
                  <br />
                  AMPANG
                </strong>
              </div>
            </div>
            <div className={siteStyles.heroActions}>
              <AimtoButton href={registrationUrl}>
                Secure your seats now <span aria-hidden="true">↗</span>
              </AimtoButton>
              <a className={siteStyles.textLink} href="#missions">
                See what you can make <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <div className={styles.heroSticker}>
            <span>BEGINNERS</span>
            <strong>
              VERY
              <br />
              WELCOME
            </strong>
          </div>

          <div
            className={siteStyles.heroOrganisers}
            aria-label="Event organisers"
          >
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

          <div
            className={siteStyles.ticker}
            aria-label="Learn-a-thon promises"
          >
            <div className={siteStyles.tickerTrack}>
              <div className={siteStyles.tickerGroup}>
                {learnathonHighlights.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div className={siteStyles.tickerGroup} aria-hidden="true">
                {learnathonHighlights.map((item) => (
                  <span key={`${item}-repeat`}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.howSection} id="missions">
          <div className={styles.howIntro} data-reveal="up">
            <div>
              <div className={styles.friendlyLabel}>How it works</div>
              <h2>Everything you need to start making.</h2>
            </div>
            <p>
              We remove the intimidating parts and give you a simple path from
              opening the tools to making something that works for you.
            </p>
          </div>

          <div className={styles.howGrid} data-reveal="stagger">
            {howItWorks.map((step) => (
              <article
                className={styles.howCard}
                data-accent={step.accent}
                key={step.number}
              >
                <div className={styles.howMeta}>
                  <span>{step.number}</span>
                  <small>{step.label}</small>
                </div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                <div className={styles.howArrow} aria-hidden="true">
                  →
                </div>
              </article>
            ))}
          </div>
        </section>

        <LearnathonManifesto text={manifesto} />

        <aside className={styles.midCta} aria-label="Learn-a-thon registration">
          <div>
            <span>Ready to make your first thing?</span>
            <p>Bring a laptop and your curiosity. We will help with the rest.</p>
          </div>
          <AimtoButton href={registrationUrl}>
            Secure your seats now <span aria-hidden="true">↗</span>
          </AimtoButton>
        </aside>

        <section
          className={`${siteStyles.trainersSection} ${styles.friendlyTrainers}`}
          aria-labelledby="learnathon-trainers-title"
          id="trainers"
        >
          <div className={siteStyles.trainersIntro} data-reveal="up">
            <div>
              <div className={styles.friendlyLabel}>People who will help you</div>
              <h2 id="learnathon-trainers-title">Meet your trainers</h2>
            </div>
            <p>
              We&apos;re bringing together Malaysia&apos;s leading AI engineers
              and builders to support your first steps. Already building? Bring
              the difficult problem—we&apos;ll help you go further.
            </p>
          </div>
          <div
            className={siteStyles.trainersGrid}
            aria-label="Learn-a-thon trainers"
            data-reveal="stagger"
          >
            {trainers.map((trainer, index) => (
              <article className={siteStyles.trainerCard} key={trainer}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{trainer}</h3>
                <small>Trainer and builder</small>
              </article>
            ))}
          </div>
          <p className={siteStyles.trainersMore}>
            More trainers to be announced
          </p>
        </section>

        <section
          className={`${siteStyles.campusSection} ${styles.friendlyVenue}`}
          id="campus"
        >
          <div className={siteStyles.campusCopy} data-reveal="up">
            <div className={siteStyles.campusIntro}>
              <div>
                <div className={styles.friendlyLabel}>Where we&apos;ll be</div>
                <h2>Located at The Campus</h2>
              </div>
              <p>
                A former school reimagined as an open-air community hub, with
                halls, courtyards, cafés and shared spaces made for learning
                together. For one day, it becomes Malaysia&apos;s public AI
                building floor.
              </p>
            </div>
            <div className={siteStyles.campusMeta}>
              <address>
                The Campus Ampang
                <br />
                Jalan Kolam Air Lama
                <br />
                Ampang, Kuala Lumpur
              </address>
              <a
                className={siteStyles.textLink}
                href="https://maps.google.com/?q=The+Campus+Ampang"
              >
                Open in maps <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <div className={siteStyles.campusGallery} data-reveal="stagger">
            <Image
              className={siteStyles.campusExterior}
              src="/aimto-assets/campus-exterior.jpg"
              alt="The Campus Ampang exterior"
              width={1500}
              height={1000}
              sizes="(max-width: 680px) 100vw, 70vw"
            />
            <Image
              className={siteStyles.campusCourtyard}
              src="/aimto-assets/campus-courtyard.jpg"
              alt="The Campus Ampang open-air courtyard"
              width={1000}
              height={1500}
              sizes="(max-width: 680px) 50vw, 30vw"
            />
            <Image
              className={siteStyles.campusSteps}
              src="/aimto-assets/campus-steps.jpg"
              alt="The Campus Ampang amphitheatre steps"
              width={1500}
              height={1000}
              sizes="(max-width: 680px) 50vw, 30vw"
            />
          </div>
        </section>

        <section className={styles.faqSection} id="faq">
          <div className={styles.faqIntro} data-reveal="up">
            <div className={styles.friendlyLabel}>Good to know</div>
            <h2>Questions from first-time builders.</h2>
          </div>
          <div className={styles.faqList}>
            {faqs.map((faq, index) => (
              <details key={faq.question}>
                <summary>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {faq.question}
                  <i aria-hidden="true">+</i>
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={styles.finalCta}>
          <div className={styles.finalBurst} aria-hidden="true">
            ✦
          </div>
          <div data-reveal="up">
            <div className={styles.friendlyLabel}>
              Your first build starts here
            </div>
            <h2>
              Come curious.
              <br />
              We&apos;ll build from there.
            </h2>
            <p>
              Free to join. Beginners welcome. Bring a laptop, an idea—or just
              yourself.
            </p>
            <AimtoButton href={registrationUrl}>
              Secure your seats now <span aria-hidden="true">↗</span>
            </AimtoButton>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <a href="/aimto" aria-label="Back to AI Malaysia Takeover">
          <Image
            src="/aimto-assets/logo-white.png"
            alt="AI Malaysia Takeover 2026"
            width={600}
            height={113}
            sizes="190px"
          />
        </a>
        <p>Learn-a-thon // 12 August 2026 // The Campus, Ampang</p>
        <div>
          <a href="/aimto">Back to the Takeover</a>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}
