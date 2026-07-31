import type { Metadata } from "next";
import Image from "next/image";
import AimtoMotion from "../AimtoMotion";
import AimtoNav from "../AimtoNav";
import AimtoScrambleTitle from "../AimtoScrambleTitle";
import AimtoButton from "./AimtoButton";
import LearnathonCountdown from "./LearnathonCountdown";
import LearnathonProjects from "./LearnathonProjects";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: {
    absolute: "The Malaysian Learn-a-thon — Learn AI. Build Something.",
  },
  icons: {
    icon: [
      {
        url: "/aimto-assets/favicon.png",
        type: "image/png",
        sizes: "32x32",
      },
    ],
  },
  description:
    "A one-day public AI build experience for every Malaysian. Learn, make and get help from real builders on 12 August 2026 at The Campus, Ampang.",
  openGraph: {
    title: "The Malaysian Learn-a-thon",
    description:
      "Learn AI, build something useful and take it home. 12 August 2026 at The Campus Ampang.",
    url: "/aimto/learnathon",
    type: "website",
    images: [
      {
        url: "/aimto-assets/learnathon-builder-floor.jpg",
        width: 1536,
        height: 1024,
        alt: "A collaborative AI builder floor at The Campus Ampang",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Malaysian Learn-a-thon",
    description:
      "Learn AI, build something useful and take it home.",
    images: ["/aimto-assets/learnathon-builder-floor.jpg"],
  },
};

const registrationUrl =
  "https://event.aimto.my/concierge-menu/registration";

const tickerItems = [
  "ONE SHARED BUILDER FLOOR_",
  "NO CODING EXPERIENCE NEEDED_",
  "MENTORS ON THE FLOOR_",
  "BUILD WALL + IDEA PROMPTS_",
  "DEBUG + DEPLOY BAR_",
  "ROLLING SHOW + TELL_",
  "TAKE YOUR BUILD HOME_",
];

const experienceZones = [
  {
    label: "GET MOVING_",
    days: ["START"],
    title: "Starter Kits & Resource Hub",
    body: "Open a ready-made starter pack with simple tool guides, templates and beginner prompts so your first useful build is never a blank page.",
    image: "/aimto-assets/learnathon-zones/starter-kits.jpg",
  },
  {
    label: "FIND YOUR SPARK_",
    days: ["CHOOSE"],
    title: "Build Wall & Inspiration Board",
    body: "Post what you want to make, find a teammate, ask for help or choose a beginner-friendly idea when you are not sure where to start.",
    image: "/aimto-assets/learnathon-zones/inspiration-wall.jpg",
  },
  {
    label: "THE HEART OF IT_",
    days: ["BUILD"],
    title: "One Shared Builder Floor",
    body: "Beginners and experienced builders sit side by side. Watch, ask, learn, make and help the person next to you in productive, friendly chaos.",
    image: "/aimto-assets/learnathon-zones/builder-floor.jpg",
  },
  {
    label: "THE HUMAN SAFETY NET_",
    days: ["UNSTICK"],
    title: "Mentors & Helpdesk",
    body: "Ask a roaming mentor, use the virtual helpdesk or pick up a quick-start resource. There will always be another way to get help.",
    image: "/aimto-assets/learnathon-zones/mentor-helpdesk.jpg",
  },
  {
    label: "THE LAST MILE_",
    days: ["SHIP"],
    title: "Debug & Deploy Bar",
    body: "Bring a working prototype for deeper help with errors, integrations, hosting, publishing and preparing something you can share.",
    image: "/aimto-assets/learnathon-zones/debug-deploy.jpg",
  },
  {
    label: "CELEBRATE THE BUILD_",
    days: ["SHARE"],
    title: "Sandbox Stage & Show and Tell",
    body: "Catch short practical workshops and rolling five-minute demos. Finished, unfinished and wonderfully messy projects are all welcome.",
    image: "/aimto-assets/learnathon-zones/show-and-tell.jpg",
  },
];

const learnathonStats = [
  { value: "3,000+", label: "International & Local Participants" },
  { value: "1,000+", label: "Hacker House Participants" },
  { value: "50+", label: "Local & International Speakers" },
  { value: "50+", label: "Sponsors & Exhibitors" },
];

const trainers = [
  {
    name: "Timothy Tiah",
    title: "Founder & CEO, Colony",
    bio: "Founder and CEO of Colony and co-founder of Nuffnang, sharing practical lessons from building and scaling Malaysian companies.",
    image: "/aimto-assets/trainers/timothy-tiah.png",
  },
  {
    name: "Jon Lai",
    title: "Founder & CEO, Atomic Group",
    bio: "Founder and CEO of Atomic Group, building digital-first consumer brands in health and wellness.",
    image: "/aimto-assets/trainers/jon-lai.jpg",
  },
  {
    name: "Warren Leow",
    title: "Founder & Strategy Lead, AITraining2U",
    bio: "Former Bain consultant and former CEO of Designs.ai, now leading practical AI training and automation at AITraining2U.",
    image: "/aimto-assets/trainers/warren-leow.jpg",
  },
  {
    name: "Danial Hadi",
    title: "Founder, KrackedDevs",
    bio: "Founder of KrackedDevs, a Malaysian builder community where people learn, build and ship real software projects.",
    image: "/aimto-assets/trainers/danial-hadi.jpg",
  },
];

const faqs = [
  {
    question: "Is the Learn-a-thon free?",
    answer:
      "Yes. Public registration is free. Some AI tools may have optional paid plans after the event; we will make any tool requirements clear before the day.",
  },
  {
    question: "Do I need coding experience?",
    answer:
      "No. Complete beginners are welcome, with setup support, practical sessions and mentors who can help you take the next step.",
  },
  {
    question: "Should I bring a laptop?",
    answer:
      "Yes—bring a laptop and charger if you want to build. We will share any account or setup guidance before the day.",
  },
  {
    question: "What if I have no idea what to build?",
    answer:
      "That is exactly what the Inspiration Board is for. Choose a beginner prompt, browse community problems or find a teammate at the Build Wall.",
  },
  {
    question: "Can experienced builders join?",
    answer:
      "Absolutely. Take on a challenge, explore advanced tools, meet other builders, showcase a project or help someone who is just getting started.",
  },
  {
    question: "Do I have to present my project?",
    answer:
      "No. Show and Tell is optional. You can submit to the Builder Gallery, quietly take your project home or volunteer for a five-minute demo.",
  },
];

export default function LearnathonThreePage() {
  return (
    <div className={styles.site} id="aimto-learnathon-site">
      <AimtoMotion rootId="aimto-learnathon-site" />
      <AimtoNav registrationUrl={registrationUrl} />

      <main>
        <section className={styles.hero} id="top">
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className={styles.heroContent}>
            <h1>
              The Malaysian
              <br />
              <span>Learn-a-thon</span>
            </h1>
            <p className={styles.heroIntro}>
              One day for every Malaysian to learn AI, build something useful
              and get help from real builders along the way.
            </p>
            <div className={styles.heroEventMeta}>
              <div className={styles.heroDate}>
                <strong>
                  12
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
              <AimtoButton href={registrationUrl}>
                Secure your seats now <span aria-hidden="true">↗</span>
              </AimtoButton>
              <a className={styles.textLink} href="#overview">
                See how the day works <span aria-hidden="true">↓</span>
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

          <div className={styles.ticker} aria-label="Learn-a-thon highlights">
            <div className={styles.tickerTrack}>
              <div className={styles.tickerGroup}>
                {tickerItems.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div className={styles.tickerGroup} aria-hidden="true">
                {tickerItems.map((item) => (
                  <span key={`${item}-repeat`}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          className={styles.proof}
          aria-label="Learn-a-thon at a glance"
          data-reveal="up"
        >
          {learnathonStats.map((stat) => (
            <div className={styles.proofStat} key={stat.label}>
              <strong>{stat.value}</strong>
              <p>{stat.label}</p>
            </div>
          ))}
        </section>

        <section className={styles.introSection} id="overview">
          <div className={styles.sectionLabel} data-reveal="up">
            AI DOESN&apos;T HAVE TO BE CONFUSING_
          </div>
          <div className={styles.introLayout} data-reveal="up">
            <AimtoScrambleTitle />
            <div
              className={`${styles.introCopy} ${styles.learnathonIntroCopy}`}
            >
              <p className={styles.lead}>
                Building cool things with AI has never been easier, yet getting
                started is so hard.
              </p>
              <p>
                The Learn-a-thon is a space where anyone with zero experience
                can learn to build apps and websites and publish them all within
                a day.
              </p>
              <p>
                Accelerate your learning with the support from Malaysia&apos;s
                leading trainers and mentors.
              </p>
            </div>
            <div className={styles.introArtwork} data-reveal="soft">
              <Image
                src="/aimto-assets/digital-hibiscus.png"
                alt="A hibiscus constructed from hot-pink and violet ASCII characters"
                width={1402}
                height={1122}
                sizes="(max-width: 680px) calc(100vw - 40px), 360px"
              />
            </div>
          </div>
        </section>

        <LearnathonProjects />

        <section className={styles.zonesSection} id="experience">
          <div className={styles.sectionHeading} data-reveal="up">
            <div className={styles.sectionLabel}>YOUR BUILD JOURNEY_</div>
            <h2>
              Stations and Interactive Activities to support you in your AI
              journey
            </h2>
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
                <div className={styles.zoneMeta}>
                  <span className={styles.zoneIndex}>
                    {String(index + 1).padStart(2, "0")}_
                  </span>
                  <span className={styles.zoneProperties}>
                    <span className={styles.zoneDays}>
                      {zone.days.map((day) => (
                        <small key={day}>{day}</small>
                      ))}
                    </span>
                    <em>{zone.label}</em>
                  </span>
                </div>
                <h3>{zone.title}</h3>
                <p>{zone.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className={styles.trainersSection}
          aria-labelledby="trainers-title"
          id="trainers"
        >
          <div className={styles.trainersIntro} data-reveal="up">
            <div>
              <div className={styles.sectionLabel}>
                REAL BUILDERS, BESIDE YOU_
              </div>
              <h2 id="trainers-title">Meet your Trainers &amp; Builders</h2>
            </div>
            <p>
              Learn from people doing the work, ask the difficult question and
              get practical help when your build needs a push.
            </p>
          </div>
          <div
            className={styles.trainersGrid}
            aria-label="Learn-a-thon trainers"
            data-reveal="stagger"
          >
            {trainers.map((trainer) => (
              <article className={styles.trainerCard} key={trainer.name}>
                <div className={styles.trainerPortrait}>
                  <Image
                    src={trainer.image}
                    alt={trainer.name}
                    fill
                    sizes="(max-width: 680px) calc(100vw - 40px), (max-width: 1000px) 44vw, 22vw"
                  />
                </div>
                <div className={styles.trainerDetails}>
                  <h3>{trainer.name}</h3>
                  <small>{trainer.title}</small>
                  <p>{trainer.bio}</p>
                </div>
              </article>
            ))}
          </div>
          <p className={styles.trainersMore}>MORE TRAINERS TO BE ANNOUNCED_</p>
        </section>

        <LearnathonCountdown />

        <section className={styles.campusSection} id="campus">
          <div className={styles.campusCopy} data-reveal="up">
            <div className={styles.campusIntro}>
              <div className={styles.sectionLabel}>VENUE_</div>
              <h2>Located at The Campus</h2>
              <p>
                Experience the future in a familiar space. The Campus is a
                former school, reimagined as an open-air community hub, with
                courtyards, halls and shared spaces made for people to gather.
                For one day, it becomes Malaysia&apos;s shared AI builder floor.
              </p>
            </div>
            <div className={styles.campusMeta}>
              <address>
                The Campus Ampang
                <br />
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
              className={styles.campusMain}
              src="/aimto-assets/campus-steps.jpg"
              alt="The Campus Ampang amphitheatre steps"
              width={1500}
              height={1000}
              sizes="(max-width: 680px) 100vw, 70vw"
            />
            <Image
              className={styles.campusRoof}
              src="/aimto-assets/campus-exterior.jpg"
              alt="The Campus Ampang exterior"
              width={1500}
              height={1000}
              sizes="(max-width: 680px) 50vw, 30vw"
            />
            <Image
              className={styles.campusCourtyard}
              src="/aimto-assets/campus-courtyard.jpg"
              alt="The Campus Ampang open-air courtyard"
              width={1000}
              height={1500}
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

        <section className={styles.participationSection}>
          <div className={styles.participationIntro} data-reveal="up">
            <div className={styles.headingTitleGroup}>
              <div className={styles.sectionLabel}>YOUR WAY IN_</div>
              <h2>One floor. Many ways to begin.</h2>
            </div>
            <p>
              Come alone, bring family, start from zero or arrive with a build
              already underway. There is a place for you on the floor.
            </p>
          </div>
          <div className={styles.participationGrid} data-reveal="stagger">
            <a href={registrationUrl}>
              <Image
                src="/aimto-assets/learnathon-builder-floor.jpg"
                alt="A busy, collaborative AI Builder Floor"
                width={720}
                height={480}
                sizes="(max-width: 680px) 100vw, (max-width: 980px) 50vw, 25vw"
              />
              <div className={styles.participationCardBody}>
                <span>01_</span>
                <strong>Start from zero</strong>
                <small>Use a guided idea and get set up with support.</small>
                <span className={styles.participationCardLink}>Register ↗</span>
              </div>
            </a>
            <a href={registrationUrl}>
              <Image
                src="/aimto-assets/campus-courtyard.jpg"
                alt="The open courtyard at The Campus Ampang"
                width={720}
                height={480}
                sizes="(max-width: 680px) 100vw, (max-width: 980px) 50vw, 25vw"
              />
              <div className={styles.participationCardBody}>
                <span>02_</span>
                <strong>Bring someone</strong>
                <small>Learn alongside a friend, colleague or family member.</small>
                <span className={styles.participationCardLink}>
                  Register together ↗
                </span>
              </div>
            </a>
            <a href={registrationUrl}>
              <Image
                src="/aimto-assets/for-thinkers-builders.jpg"
                alt="Builders sharing ideas and practical experience"
                width={720}
                height={480}
                sizes="(max-width: 680px) 100vw, (max-width: 980px) 50vw, 25vw"
              />
              <div className={styles.participationCardBody}>
                <span>03_</span>
                <strong>Bring a problem</strong>
                <small>Turn one real frustration into a useful AI workflow.</small>
                <span className={styles.participationCardLink}>
                  Start building ↗
                </span>
              </div>
            </a>
            <a href={registrationUrl}>
              <Image
                src="/aimto-assets/the-sandbox.jpg"
                alt="A public session on the Sandbox Stage"
                width={720}
                height={480}
                sizes="(max-width: 680px) 100vw, (max-width: 980px) 50vw, 25vw"
              />
              <div className={styles.participationCardBody}>
                <span>04_</span>
                <strong>Show your work</strong>
                <small>Share a finished build or a work in progress on stage.</small>
                <span className={styles.participationCardLink}>
                  Join the floor ↗
                </span>
              </div>
            </a>
          </div>
        </section>

        <section className={styles.faqSection} id="faq">
          <div className={styles.faqIntro} data-reveal="up">
            <div className={styles.sectionLabel}>FAQ_</div>
            <h2>Questions &amp; Answers</h2>
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
          <div className={styles.finalGlow} aria-hidden="true" />
          <div data-reveal="up">
            <h2>
              <span>Build</span> something that matters.
            </h2>
            <p className={styles.finalDescription}>
              One day. One shared floor. A useful build you can take home.
            </p>
            <AimtoButton href={registrationUrl}>
              Secure your seats now <span aria-hidden="true">↗</span>
            </AimtoButton>
          </div>
        </section>
      </main>

      <footer className={styles.footer} id="contact">
        <div className={styles.footerLead}>
          <div>
            <a className={styles.footerBrand} href="#top">
              <Image
                src="/aimto-assets/logo-white.png"
                alt="AI Malaysia Takeover 2026"
                width={600}
                height={113}
                sizes="220px"
              />
            </a>
            <p>Malaysia learns AI by building, together.</p>
          </div>
          <AimtoButton className={styles.footerCta} href={registrationUrl}>
            Secure your seats now <span aria-hidden="true">↗</span>
          </AimtoButton>
        </div>

        <nav className={styles.footerNav} aria-label="Footer navigation">
          <div>
            <h2>Program_</h2>
            <a href="#overview">About the Learn-a-thon</a>
            <a href="#experience">Your build journey</a>
            <a href="#trainers">Trainers &amp; builders</a>
          </div>
          <div>
            <h2>About_</h2>
            <a href="/aimto">AI Malaysia Takeover</a>
            <a href="#campus">The Campus</a>
            <a href="https://instagram.com/malaysianai">
              Instagram <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div>
            <h2>Attend_</h2>
            <a href={registrationUrl}>Tickets</a>
            <a href="#campus">Get here</a>
            <a href="#faq">FAQ</a>
          </div>
          <div>
            <h2>Legal_</h2>
            <a href="/privacy">Privacy notice</a>
            <a href="/terms">Terms &amp; conditions</a>
          </div>
        </nav>

        <div className={styles.footerMeta}>
          <p>© The Malaysian Learn-a-thon 2026</p>
          <a href="#top">
            Back to top <span aria-hidden="true">↑</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
