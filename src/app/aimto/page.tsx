import type { Metadata } from "next";
import Image from "next/image";
import AimtoAudience from "./AimtoAudience";
import AimtoButton from "./AimtoButton";
import AimtoCountdown from "./AimtoCountdown";
import AimtoMotion from "./AimtoMotion";
import AimtoNav from "./AimtoNav";
import AimtoStats from "./AimtoStats";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: {
    absolute:
      "AI Malaysia Takeover 2026 — Learn, Build & Experience Malaysian AI",
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
    "Two days of hands-on AI learning, live demonstrations, community and new ideas. 11–12 August 2026 at The Campus, Ampang.",
  openGraph: {
    title: "AI Malaysia Takeover 2026",
    description:
      "Learn, build and experience Malaysian AI. Join us on 11–12 August 2026 at The Campus Ampang.",
    url: "/aimto",
    type: "website",
    images: [
      {
        url: "/aimto-assets/og-image.png?v=20260730-2",
        width: 1200,
        height: 630,
        alt: "AI Malaysia Takeover 2026, 11–12 August at The Campus Kuala Lumpur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Malaysia Takeover 2026",
    description:
      "Two days of hands-on AI learning at The Campus, Ampang.",
    images: ["/aimto-assets/og-image.png?v=20260730-2"],
  },
};

const registrationUrl =
  "https://event.aimto.my/concierge-menu/registration";

const tickerItems = [
  "KEYNOTES + PANELS_",
  "LEARN-A-THON_",
  "WORKSHOPS + LIVE DEMOS_",
  "AI OPEN HOUSE_",
  "THE CAMPUS AMPANG_",
  "BEGINNERS WELCOME_",
  "MEET THE AI COMMUNITY_",
];

const experienceZones = [
  {
    label: "BUILD AI_",
    days: ["DAY 2"],
    title: "Learn-a-thon",
    body: "Get hands-on with AI. Vibe-code your first website or app, set up personal AI agents, meet Malaysia’s AI builder community and get help from mentors and AI engineers.",
    image: "/aimto-assets/learnathon-builder-floor.jpg",
  },
  {
    label: "THE WAR ROOM_",
    days: ["DAY 1", "DAY 2"],
    title: "Keynotes & Panels",
    body: "Hear from Malaysia’s top tech architects, policymakers and global AI leaders as they discuss and map the nation’s digital future.",
    image: "/aimto-assets/the-war-room.jpg",
  },
  {
    label: "THE SANDBOX_",
    days: ["DAY 1", "DAY 2"],
    title: "Workshops & Live Demos",
    body: "Catch up on the latest AI developments shaping the industry. Learn what’s working from leading practitioners, then take home ideas and skills you can apply in your life.",
    image: "/aimto-assets/the-sandbox.jpg",
  },
  {
    label: "PASAR AI_",
    days: ["DAY 1", "DAY 2"],
    title: "AI Open House",
    body: "Discover AI solutions, products and experiences from leading institutions. The AI Open House brings exhibitors and participants together to explore how AI is changing work, business, creativity and everyday life in Malaysia.",
    image: "/aimto-assets/pasar-ai-booths-wide.jpg",
  },
];

const partnerLogos = Array.from(
  { length: 30 },
  (_, index) => `/aimto-assets/partners/${index + 1}.png`,
);

const trainers = [
  "Timothy Tiah",
  "Jon Lai",
  "Warren Leow",
  "Kracked Dev",
];

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
              <AimtoButton href={registrationUrl}>
                Secure your seats now <span aria-hidden="true">↗</span>
              </AimtoButton>
              <a className={styles.textLink} href="#overview">
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

        <AimtoStats />

        <section className={styles.introSection} id="overview">
          <div className={styles.sectionLabel} data-reveal="up">
            AI FOR THE PEOPLE_
          </div>
          <div className={styles.introLayout} data-reveal="up">
            <h2>
              AI For the
              <br />
              Rakyat
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
              <p>
                Two days of free public training, with no coding experience
                needed. Bring your mom, aunties, teenagers and uncles to learn
                together with us.
              </p>
            </div>
          </div>
        </section>

        <AimtoAudience />

        <section className={styles.zonesSection} id="experience">
          <div className={styles.sectionHeading} data-reveal="up">
            <div className={styles.sectionLabel}>EXPERIENCE_</div>
            <h2>What&apos;s happening in AI Malaysia Takeover 2026.</h2>
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
        >
          <div className={styles.trainersIntro} data-reveal="up">
            <div>
              <div className={styles.sectionLabel}>
                LEARN FROM PEOPLE DOING THE WORK_
              </div>
              <h2 id="trainers-title">Meet your Trainers &amp; Speakers</h2>
            </div>
            <p>
              Learning AI from professional trainers like these can often cost
              thousands of ringgit. Here, you get to learn with them as part of
              two free public training days.
            </p>
          </div>
          <div
            className={styles.trainersGrid}
            aria-label="AI Malaysia Takeover trainers"
            data-reveal="stagger"
          >
            {trainers.map((trainer, index) => (
              <article className={styles.trainerCard} key={trainer}>
                <span>{String(index + 1).padStart(2, "0")}_</span>
                <h3>{trainer}</h3>
                <small>TRAINER_</small>
              </article>
            ))}
          </div>
          <p className={styles.trainersMore}>MORE TRAINERS TO BE ANNOUNCED_</p>
        </section>

        <AimtoCountdown />

        <section className={styles.campusSection} id="campus">
          <div className={styles.campusCopy} data-reveal="up">
            <div className={styles.campusIntro}>
              <div className={styles.sectionLabel}>VENUE_</div>
              <h2>Located at The Campus</h2>
              <p>
                Experience the future in a familiar space. The Campus is a
                former school, reimagined as an open-air community hub, with
                courtyards, halls and shared spaces made for people to gather.
                For two days, the whole campus becomes the home of AI Malaysia
                Takeover.
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

        <section className={styles.participationSection}>
          <div className={styles.participationIntro} data-reveal="up">
            <div className={styles.headingTitleGroup}>
              <div className={styles.sectionLabel}>GET INVOLVED_</div>
              <h2>Be a part of the 2026 Takeover.</h2>
            </div>
            <p>
              Whether you are building the future or funding it, there is a
              place for you inside Malaysia&apos;s AI ecosystem.
            </p>
          </div>
          <div className={styles.participationGrid} data-reveal="stagger">
            <a href={registrationUrl}>
              <Image
                src="/aimto-assets/gallery-top-1.jpg"
                alt="Attendees gathering at AI Malaysia"
                width={720}
                height={480}
                sizes="(max-width: 680px) 100vw, (max-width: 980px) 50vw, 25vw"
              />
              <div className={styles.participationCardBody}>
                <span>01_</span>
                <strong>Attend</strong>
                <small>Learn, build and meet the community.</small>
                <span className={styles.participationCardLink}>Sign up ↗</span>
              </div>
            </a>
            <a href="mailto:hello@ludic.asia?subject=AIMTO%202026%20contribution">
              <Image
                src="/aimto-assets/for-thinkers-builders.jpg"
                alt="Speakers sharing ideas on stage at AI Malaysia"
                width={720}
                height={480}
                sizes="(max-width: 680px) 100vw, (max-width: 980px) 50vw, 25vw"
              />
              <div className={styles.participationCardBody}>
                <span>02_</span>
                <strong>Speak</strong>
                <small>Share your ideas, experience and perspective.</small>
                <span className={styles.participationCardLink}>
                  Apply to speak ↗
                </span>
              </div>
            </a>
            <a href="mailto:hello@ludic.asia?subject=AIMTO%202026%20exhibitor">
              <Image
                src="/aimto-assets/enterprise-ecosystem-leaders.jpg"
                alt="Participants discovering AI products and experiences"
                width={720}
                height={480}
                sizes="(max-width: 680px) 100vw, (max-width: 980px) 50vw, 25vw"
              />
              <div className={styles.participationCardBody}>
                <span>03_</span>
                <strong>Showcase</strong>
                <small>Put your AI product or experience in the room.</small>
                <span className={styles.participationCardLink}>
                  Reach out to us ↗
                </span>
              </div>
            </a>
            <a href="mailto:hello@ludic.asia?subject=AIMTO%202026%20partnership">
              <Image
                src="/aimto-assets/gallery-bottom.jpg"
                alt="Industry and community leaders at AI Malaysia"
                width={720}
                height={480}
                sizes="(max-width: 680px) 100vw, (max-width: 980px) 50vw, 25vw"
              />
              <div className={styles.participationCardBody}>
                <span>04_</span>
                <strong>Partner</strong>
                <small>Help make Malaysia&apos;s largest AI gathering happen.</small>
                <span className={styles.participationCardLink}>
                  Let&apos;s talk ↗
                </span>
              </div>
            </a>
          </div>
        </section>

        <section className={styles.eventGallery} aria-labelledby="gallery-title">
          <div className={styles.galleryHeading} data-reveal="up">
            <div className={styles.sectionLabel}>THE ENERGY OF 2025_</div>
            <h2 id="gallery-title">What happened in AI Malaysia 2025.</h2>
          </div>
          <div className={styles.galleryGrid} data-reveal="stagger">
            <figure>
              <Image
                src="/aimto-assets/gallery-top-1.jpg"
                alt="Attendees gathering at AI Malaysia in 2025"
                width={1200}
                height={900}
                sizes="(max-width: 680px) 100vw, 50vw"
              />
              <figcaption>2,500+ builders gathered in 2025.</figcaption>
            </figure>
            <figure>
              <Image
                src="/aimto-assets/gallery-top-2.jpg"
                alt="A panel discussion at AI Malaysia in 2025"
                width={1200}
                height={900}
                sizes="(max-width: 680px) 100vw, 50vw"
              />
              <figcaption>Where ideas meet opportunity.</figcaption>
            </figure>
            <figure>
              <Image
                src="/aimto-assets/gallery-mid-2.jpg"
                alt="A keynote stage at AI Malaysia in 2025"
                width={900}
                height={900}
                sizes="(max-width: 680px) 100vw, 50vw"
              />
              <figcaption>Connecting minds. Building the future.</figcaption>
            </figure>
            <figure>
              <Image
                src="/aimto-assets/gallery-mid-1.jpg"
                alt="Community members connecting at AI Malaysia in 2025"
                width={900}
                height={900}
                sizes="(max-width: 680px) 100vw, 50vw"
              />
              <figcaption>Ideas shared. Connections made.</figcaption>
            </figure>
            <figure>
              <Image
                src="/aimto-assets/gallery-mid-3.jpg"
                alt="An AI Malaysia speaker presenting in 2025"
                width={900}
                height={900}
                sizes="(max-width: 680px) 100vw, 50vw"
              />
              <figcaption>Stronger together for real impact.</figcaption>
            </figure>
            <figure>
              <Image
                src="/aimto-assets/gallery-bottom.jpg"
                alt="Leaders gathering on stage at AI Malaysia in 2025"
                width={1200}
                height={900}
                sizes="(max-width: 680px) 100vw, 50vw"
              />
              <figcaption>A platform for builders, by builders.</figcaption>
            </figure>
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

        <section className={styles.partnersSection} id="partners">
          <div className={styles.partnersHeading} data-reveal="up">
            <div className={styles.headingTitleGroup}>
              <div className={styles.sectionLabel}>THE 2025 COHORT_</div>
              <h2>Backed by industry giants.</h2>
            </div>
            <p>
              The powerhouse lineup that made last year possible, driving the
              success of the ASEAN AI Malaysia Summit 2025 and the future of
              our ecosystem.
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
              <span>Join</span> the takeover.
            </h2>
            <p className={styles.finalDescription}>
              Two days of practical AI learning, building and discovery.
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
            <p>Building Malaysia&apos;s AI future, together.</p>
          </div>
          <AimtoButton className={styles.footerCta} href={registrationUrl}>
            Secure your seats now <span aria-hidden="true">↗</span>
          </AimtoButton>
        </div>

        <nav className={styles.footerNav} aria-label="Footer navigation">
          <div>
            <h2>Program_</h2>
            <a href="#experience">Event programme</a>
            <a href="/aimto/learnathon">Learn-a-thon</a>
            <a href="https://aimto.my/side-events.html">Side events</a>
            <a href="https://aimto.my/#speakers">Speakers</a>
          </div>
          <div>
            <h2>About_</h2>
            <a href="#experience">Experience</a>
            <a href="#partners">Partners</a>
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
          <p>© AI Malaysia Takeover 2026</p>
          <a href="#top">
            Back to top <span aria-hidden="true">↑</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
