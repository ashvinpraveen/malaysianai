import type { Metadata } from "next";
import Image from "next/image";
import AimtoButton from "../AimtoButton";
import AimtoMotion from "../AimtoMotion";
import AimtoNav from "../AimtoNav";
import siteStyles from "../page.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: {
    absolute: "The Malaysian Learn-a-thon — Build With AI",
  },
  description:
    "One giant AI build floor for the rakyat. Arrive with curiosity and leave with something you made at The Campus, Ampang on 12 August 2026.",
};

const registrationUrl =
  "https://event.aimto.my/concierge-menu/registration";

const tickerItems = [
  "ONE GIANT BUILD FLOOR_",
  "ALL SKILL LEVELS TOGETHER_",
  "HUMAN HELP EVERYWHERE_",
  "BUILD IT. SHARE IT. TAKE IT HOME._",
];

const journey = [
  {
    number: "01",
    verb: "Arrive",
    title: "Walk in curious.",
    body: "Collect your Builder Pass, get onto the WiFi and set up the AI tools you will use. Our installation crew will help you get ready.",
    detail: "Registration + installation",
  },
  {
    number: "02",
    verb: "Choose",
    title: "Find your spark.",
    body: "Put your idea on the Build Wall, browse beginner prompts or find someone tackling a problem you care about. No idea is a perfectly good starting point.",
    detail: "Build Wall + inspiration board",
  },
  {
    number: "03",
    verb: "Build",
    title: "Join the nice chaos.",
    body: "Beginners, founders, students, parents and experienced builders sit side by side. Watch, ask, learn, make and help the person next to you.",
    detail: "One shared Builder Floor",
  },
  {
    number: "04",
    verb: "Unstick",
    title: "Raise your hand.",
    body: "Call a roaming mentor, use the virtual helpdesk or grab a quick-start guide. There will always be another way to get help.",
    detail: "Mentors + resource hub",
  },
  {
    number: "05",
    verb: "Ship",
    title: "Make it real.",
    body: "Take your working idea to the Debug & Deploy Bar for troubleshooting, integrations, publishing and the final push from prototype to something shareable.",
    detail: "Debug + deploy support",
  },
  {
    number: "06",
    verb: "Share",
    title: "Show Malaysia.",
    body: "Add your project to the Builder Gallery. If you feel like it, jump into a five-minute Show & Tell—finished, unfinished and gloriously messy builds welcome.",
    detail: "Gallery + rolling demos",
  },
];

const activationZones = [
  {
    number: "01",
    eyebrow: "THE STARTING LINE",
    title: "Registration & Installation",
    body: "Fast check-in, Builder Pass collection, WiFi, account setup and a human welcome before you reach the floor.",
    tag: "ARRIVAL WAVES · 10:30AM + 2:30PM",
    accent: "lime",
  },
  {
    number: "02",
    eyebrow: "THE HEART OF IT",
    title: "Builder Floor",
    body: "No beginner corner. No expert corner. One open floor where every level builds together and mentors can reach anyone.",
    tag: "OPEN BUILDING · 10AM—5PM",
    accent: "pink",
  },
  {
    number: "03",
    eyebrow: "THE IDEA ENGINE",
    title: "Build Wall",
    body: "Post what you want to make, find teammates, offer a skill, ask for help or pick a ready-made challenge when you need a spark.",
    tag: "LIVE + CHANGING ALL DAY",
    accent: "cyan",
  },
  {
    number: "04",
    eyebrow: "THE SAFETY NET",
    title: "Mentors & Helpdesk",
    body: "Roaming mentors, a staffed station, self-serve resources and a virtual queue keep help moving without one long bottleneck.",
    tag: "MULTIPLE WAYS TO ASK",
    accent: "violet",
  },
  {
    number: "05",
    eyebrow: "THE LAST MILE",
    title: "Debug & Deploy Bar",
    body: "Working prototype in hand? Get deeper help with errors, integrations, hosting, publishing and demo preparation.",
    tag: "FROM WORKING TO SHIPPED",
    accent: "orange",
  },
  {
    number: "06",
    eyebrow: "THE CELEBRATION",
    title: "Sandbox Stage",
    body: "A pulse of mini-workshops, works in progress, builder stories and five-minute demos that keeps the whole venue moving.",
    tag: "SHOW & TELL EVERY 30—45 MIN",
    accent: "yellow",
  },
];

const helpLayers = [
  {
    title: "Floating mentors",
    body: "Real people moving through the tables, spotting blockers and helping you take the next step.",
  },
  {
    title: "Virtual helpdesk",
    body: "Ask through WhatsApp so you can keep building while the right mentor finds you.",
  },
  {
    title: "SOS signals",
    body: "A simple table signal makes it easy to say “I’m stuck” without leaving your seat.",
  },
  {
    title: "Resource hub",
    body: "Starter prompts, templates, quick-start links and guides you can use at your own pace.",
  },
];

const ideas = [
  "A family recipe keeper",
  "A study buddy that explains your way",
  "A tool that removes one annoying task at work",
  "A neighbourhood information helper",
  "A content workflow for your small business",
  "Something wonderfully strange",
];

const trainers = [
  {
    name: "Timothy Tiah",
    title: "Founder & CEO, Colony",
    image: "/aimto-assets/trainers/timothy-tiah.png",
  },
  {
    name: "Jon Lai",
    title: "Founder & CEO, Atomic Group",
    image: "/aimto-assets/trainers/jon-lai.jpg",
  },
  {
    name: "Warren Leow",
    title: "Founder & Strategy Lead, AITraining2U",
    image: "/aimto-assets/trainers/warren-leow.jpg",
  },
  {
    name: "Danial Hadi",
    title: "Founder, KrackedDevs",
    image: "/aimto-assets/trainers/danial-hadi.jpg",
  },
];

const faqs = [
  {
    question: "Do I need to know how to code?",
    answer:
      "No. Complete beginners are welcome. We are designing the day around guided starting points, practical resources and several ways to ask a real person for help.",
  },
  {
    question: "What if I have no idea what to build?",
    answer:
      "That is exactly what the Inspiration Board is for. Pick a beginner prompt, browse community problems or find a teammate at the Build Wall.",
  },
  {
    question: "Do I have to stay for the whole day?",
    answer:
      "You can build at your own pace. Registration is planned in morning and afternoon waves, and the build floor runs throughout the day.",
  },
  {
    question: "What should I bring?",
    answer:
      "Bring a laptop and charger if you want to build. We will share any account or setup guidance before the event. Curiosity is the only experience you need.",
  },
  {
    question: "Can I come with friends or family?",
    answer:
      "Please do. Come with a friend, a colleague, your child, your parent or your grandparent. Everyone who plans to take part should register because capacity is limited.",
  },
  {
    question: "Do I have to present my project?",
    answer:
      "Not at all. Show & Tell is optional. You can submit to the Builder Gallery, quietly take your project home or volunteer for a five-minute demo.",
  },
  {
    question: "Is the Learn-a-thon free?",
    answer:
      "Yes. Public registration is free. Some AI tools may have optional paid plans after the event; we will make any tool requirements clear before the day.",
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
          <div
            className={`${siteStyles.heroContent} ${styles.learnathonHeroContent}`}
          >
            <p className={styles.heroKicker}>THE MALAYSIAN LEARN-A-THON_</p>
            <h1>
              One giant
              <br />
              <span>AI build floor.</span>
              <br />
              All of Malaysia
              <br />
              invited.
            </h1>
            <p className={styles.heroIntro}>
              On 12 August, we&apos;re turning The Campus into a living,
              breathing build floor for the rakyat. Arrive with curiosity.
              Leave with something you made.
            </p>
            <div className={styles.heroActions}>
              <AimtoButton href={registrationUrl}>
                Secure your seats now <span aria-hidden="true">↗</span>
              </AimtoButton>
              <a className={siteStyles.textLink} href="#experience">
                Feel the energy <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <div className={styles.heroDateCard}>
            <span>THE DAY_</span>
            <strong>
              12
              <br />
              AUG 2026
            </strong>
            <p>
              THE CAMPUS
              <br />
              AMPANG
            </p>
          </div>

          <div className={styles.heroPromise}>
            <span>OUR AMBITION_</span>
            <strong>
              MALAYSIA&apos;S BIGGEST OPEN AI ACTIVATION FOR THE RAKYAT
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

          <div className={siteStyles.ticker} aria-label="Learn-a-thon promises">
            <div className={siteStyles.tickerTrack}>
              <div className={siteStyles.tickerGroup}>
                {tickerItems.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div className={siteStyles.tickerGroup} aria-hidden="true">
                {tickerItems.map((item) => (
                  <span key={`${item}-repeat`}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.scaleStrip} aria-label="Learn-a-thon facts">
          <div>
            <strong>01</strong>
            <span>ONE FULL DAY</span>
          </div>
          <div>
            <strong>01</strong>
            <span>SHARED BUILD FLOOR</span>
          </div>
          <div>
            <strong>02</strong>
            <span>ARRIVAL WAVES</span>
          </div>
          <div>
            <strong>∞</strong>
            <span>WAYS TO START</span>
          </div>
        </section>

        <section className={styles.movementSection} id="experience">
          <div className={styles.movementCopy} data-reveal="up">
            <p className={styles.sectionLabel}>THIS IS THE ACTIVATION_</p>
            <h2>
              Malaysia doesn&apos;t need another room of people watching AI
              happen.
              <span> This is the day we make it.</span>
            </h2>
            <p>
              A whole venue designed around one transformation: you walk in
              thinking AI is for someone else, and walk out able to say,
              “I built this.”
            </p>
          </div>

          <div className={styles.energyGallery} data-reveal="stagger">
            <figure className={styles.energyMain}>
              <Image
                src="/aimto-assets/learnathon-builder-floor.jpg"
                alt="A packed collaborative AI builder floor at The Campus"
                fill
                sizes="(max-width: 760px) 100vw, 72vw"
                priority
              />
              <figcaption>
                <span>THE BUILDER FLOOR_</span>
                <strong>PRODUCTIVE, FRIENDLY CHAOS</strong>
              </figcaption>
            </figure>
            <figure className={styles.energySideTop}>
              <Image
                src="/aimto-assets/campus-courtyard.jpg"
                alt="The open-air courtyard at The Campus Ampang"
                fill
                sizes="(max-width: 760px) 50vw, 28vw"
              />
            </figure>
            <figure className={styles.energySideBottom}>
              <Image
                src="/aimto-assets/campus-steps.jpg"
                alt="The amphitheatre steps at The Campus Ampang"
                fill
                sizes="(max-width: 760px) 50vw, 28vw"
              />
              <figcaption>THE SANDBOX STAGE_</figcaption>
            </figure>
          </div>
        </section>

        <section className={styles.journeySection} id="journey">
          <div className={styles.sectionHeading} data-reveal="up">
            <div>
              <p className={styles.sectionLabel}>YOUR DAY, BUILT WITH INTENT_</p>
              <h2>From “I have no idea” to “look what I made.”</h2>
            </div>
            <p>
              Every touchpoint is being designed to keep you moving—from your
              first login to a build you can share and continue at home.
            </p>
          </div>

          <ol className={styles.journeyList}>
            {journey.map((step) => (
              <li key={step.number} data-reveal="up">
                <div className={styles.journeyIndex}>
                  <span>{step.number}</span>
                  <small>{step.verb}</small>
                </div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                <strong>{step.detail}</strong>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.activationSection} id="zones">
          <div className={styles.activationHeading} data-reveal="up">
            <p className={styles.sectionLabel}>THE ACTIVATION MAP_</p>
            <h2>Six zones. One unstoppable build loop.</h2>
            <p>
              This is the invisible work behind the day: every zone has a job,
              every handoff removes a blocker, and every path leads back to
              making.
            </p>
          </div>
          <div className={styles.activationGrid} data-reveal="stagger">
            {activationZones.map((zone) => (
              <article
                className={styles.zoneCard}
                data-accent={zone.accent}
                key={zone.number}
              >
                <div className={styles.zoneTopline}>
                  <span>{zone.number}</span>
                  <small>{zone.eyebrow}</small>
                </div>
                <h3>{zone.title}</h3>
                <p>{zone.body}</p>
                <strong>{zone.tag}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.helpSection} id="help">
          <div className={styles.helpLead} data-reveal="up">
            <p className={styles.sectionLabel}>THE HUMAN SAFETY NET_</p>
            <h2>
              Stuck is not
              <br />
              the end.
              <br />
              <span>It&apos;s a signal.</span>
            </h2>
            <p>
              We&apos;re designing several ways to ask for help so no beginner
              has to queue, feel embarrassed or quietly give up.
            </p>
          </div>

          <div className={styles.helpSystem} data-reveal="stagger">
            {helpLayers.map((layer, index) => (
              <article key={layer.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{layer.title}</h3>
                  <p>{layer.body}</p>
                </div>
                <i aria-hidden="true">↗</i>
              </article>
            ))}
            <div className={styles.helpEscalation}>
              <span>DEEPER HELP_</span>
              <strong>DEBUG &amp; DEPLOY BAR</strong>
              <p>
                Troubleshooting, integrations, hosting, publishing and final
                demo preparation with technical specialists.
              </p>
            </div>
          </div>
        </section>

        <aside className={styles.pulseBand} aria-label="Learn-a-thon atmosphere">
          <span>BUILD WALL</span>
          <i aria-hidden="true">✦</i>
          <span>MENTOR FLAGS</span>
          <i aria-hidden="true">✦</i>
          <span>LIVE DEMOS</span>
          <i aria-hidden="true">✦</i>
          <span>BUILDER GALLERY</span>
        </aside>

        <section className={styles.stageSection} id="stage">
          <div className={styles.stageVisual} data-reveal="soft">
            <Image
              src="/aimto-assets/the-sandbox.jpg"
              alt="A lively public session on the Sandbox stage"
              fill
              sizes="(max-width: 900px) 100vw, 55vw"
            />
            <div>
              <span>THE SANDBOX STAGE_</span>
              <strong>THE FLOOR HAS A PULSE</strong>
            </div>
          </div>
          <div className={styles.stageCopy} data-reveal="up">
            <p className={styles.sectionLabel}>ALL DAY, SOMETHING IS MOVING_</p>
            <h2>Learn. Build. Look up. Cheer. Keep going.</h2>
            <p>
              Short mini-workshops give you a skill you can use immediately.
              Rolling Show &amp; Tell brings unfinished work, breakthroughs and
              builder stories onto the stage without stopping the floor.
            </p>
            <div className={styles.stageRhythm}>
              <div>
                <strong>10—20 MIN</strong>
                <span>practical mini-workshops</span>
              </div>
              <div>
                <strong>30—45 MIN</strong>
                <span>between Show &amp; Tell pulses</span>
              </div>
              <div>
                <strong>05 MIN</strong>
                <span>per builder demo</span>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.ideasSection} id="ideas">
          <div className={styles.ideasIntro} data-reveal="up">
            <p className={styles.sectionLabel}>WHAT COULD YOU MAKE?_</p>
            <h2>Start with your life, not the technology.</h2>
            <p>
              The best first build solves something familiar. Pick one of ours,
              bring your own or meet someone whose idea needs your perspective.
            </p>
          </div>
          <div className={styles.ideaRail} data-reveal="stagger">
            {ideas.map((idea, index) => (
              <article key={idea}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{idea}</h3>
                <i aria-hidden="true">+</i>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.rakyatSection}>
          <div className={styles.rakyatStatement} data-reveal="up">
            <p className={styles.sectionLabel}>AI FOR THE RAKYAT_</p>
            <h2>
              Bring your teammate.
              <br />
              Bring your mum.
              <br />
              Bring your curiosity.
            </h2>
            <p>
              We want the floor to look like Malaysia: teenagers and retirees,
              first-time builders and experienced engineers, founders and
              families—watching, learning and helping across generations.
            </p>
          </div>
          <div className={styles.rakyatCollage} data-reveal="stagger">
            <Image
              src="/aimto-assets/gallery-top-1.jpg"
              alt="A diverse crowd arriving at a Malaysian AI event"
              width={900}
              height={520}
              sizes="(max-width: 760px) 100vw, 56vw"
            />
            <div className={styles.rakyatCard}>
              <span>THE MOMENT WE WANT_</span>
              <strong>
                “AI feels
                <br />
                approachable.
                <br />
                I can do this.”
              </strong>
            </div>
          </div>
        </section>

        <section className={styles.trainersSection} id="trainers">
          <div className={styles.sectionHeading} data-reveal="up">
            <div>
              <p className={styles.sectionLabel}>REAL BUILDERS, BESIDE YOU_</p>
              <h2>People who know how to get things made.</h2>
            </div>
            <p>
              Trainers, technical specialists and community mentors are being
              brought together to help first-timers start—and experienced
              builders go further.
            </p>
          </div>
          <div className={styles.trainersGrid} data-reveal="stagger">
            {trainers.map((trainer, index) => (
              <article key={trainer.name}>
                <div className={styles.trainerImage}>
                  <Image
                    src={trainer.image}
                    alt={trainer.name}
                    fill
                    sizes="(max-width: 760px) 50vw, 25vw"
                  />
                </div>
                <div>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{trainer.name}</h3>
                  <p>{trainer.title}</p>
                </div>
              </article>
            ))}
          </div>
          <p className={styles.morePeople}>
            MORE TRAINERS, MENTORS + TECHNICAL SPECIALISTS TO BE ANNOUNCED_
          </p>
        </section>

        <section className={styles.venueSection} id="campus">
          <div className={styles.venueGallery} data-reveal="stagger">
            <Image
              className={styles.venueMain}
              src="/aimto-assets/campus-exterior.jpg"
              alt="The Campus Ampang exterior"
              width={1500}
              height={1000}
              sizes="(max-width: 760px) 100vw, 68vw"
            />
            <Image
              className={styles.venueDetail}
              src="/aimto-assets/campus-courtyard.jpg"
              alt="The Campus Ampang courtyard"
              width={1000}
              height={1500}
              sizes="(max-width: 760px) 50vw, 28vw"
            />
          </div>
          <div className={styles.venueCopy} data-reveal="up">
            <p className={styles.sectionLabel}>THE WHOLE CAMPUS, ACTIVATED_</p>
            <h2>Built to spill beyond four walls.</h2>
            <p>
              A former school reimagined as an open-air community hub—with
              halls, courtyards, cafés, steps and shared spaces that make it
              natural to wander, meet and build together.
            </p>
            <address>
              THE CAMPUS AMPANG
              <br />
              JALAN KOLAM AIR LAMA
              <br />
              AMPANG, KUALA LUMPUR
            </address>
            <a
              className={styles.inlineLink}
              href="https://maps.google.com/?q=The+Campus+Ampang"
            >
              Open in maps <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <section className={styles.faqSection} id="faq">
          <div className={styles.faqIntro} data-reveal="up">
            <p className={styles.sectionLabel}>BEFORE YOU COME_</p>
            <h2>Good questions. Simple answers.</h2>
            <p>
              If you&apos;re wondering whether this is for you, the answer is
              probably yes.
            </p>
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
          <div className={styles.finalMarquee} aria-hidden="true">
            RAKYAT BUILD AI
          </div>
          <div data-reveal="up">
            <p className={styles.sectionLabel}>12 AUGUST 2026 · THE CAMPUS_</p>
            <h2>
              Don&apos;t just
              <br />
              watch the future.
              <br />
              <span>Build yours.</span>
            </h2>
            <p>
              Come with a laptop, an idea—or neither. We&apos;re putting the
              people, tools and momentum around you.
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
        <p>LEARN-A-THON // 12 AUG 2026 // THE CAMPUS, AMPANG</p>
        <div>
          <a href="/aimto">Back to the Takeover</a>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}
