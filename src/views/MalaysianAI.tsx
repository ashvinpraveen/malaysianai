"use client";

import { CTAButton } from "@/components/CTAButton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ResidentsTicker } from "@/components/ResidentsTicker";
import Sponsor from "@/components/Sponsor";


const highlights = [
  {
    title: "Government investment momentum",
    description:
      "National budgets and digital economy plans are allocating new funding for AI infrastructure and adoption.",
  },
  {
    title: "National AI Office (NAIO)",
    description:
      "A dedicated office to coordinate AI strategy, governance, and talent development across sectors.",
  },
  {
    title: "Grassroots builder support",
    description:
      "Malaysian AI backs communities with resources to build valuable, export-ready companies.",
  },
];

type Initiative = {
  title: string;
  description: string;
  image: string;
  cta?: {
    label: string;
    href: string;
    isExternal: boolean;
  };
};

const initiatives: Initiative[] = [
  {
    title: "Events and talks",
    description:
      "Join events, panels, hackathons, and workshops to meet the community and learn.",
    image: "/batik_kl_night_wide.png",
    cta: {
      label: "View events",
      href: "https://luma.com/malaysianai",
      isExternal: true,
    },
  },
  {
    title: "Connecting communities",
    description:
      "Be a part of Malaysia's thriving AI communities and meet like-minded people to build with.",
    image: "/batik_kl_city_sunset.png",
    cta: {
      label: "Learn more",
      href: "#community-partners",
      isExternal: false,
    },
  },
  {
    title: "AI residency",
    description:
      "Accelerate your progress in building your startup, surrounded by builders like you.",
    image: "/batik-paddy-clean.png",
    cta: {
      label: "Learn more",
      href: "#residents",
      isExternal: false,
    },
  },
  {
    title: "Content and education",
    description:
      "Watch videos, hear stories from builders and learn from the community.",
    image: "/batik_robot_hero.png",
    cta: {
      label: "Learn more",
      href: "https://instagram.com/aitakeover.co",
      isExternal: true,
    },
  },
];

const communityPartners = [
  {
    name: "Build Club",
    href: "https://www.buildclub.ai",
    logo: "/build-club-logo-navbar.webp",
    summary:
      "One of the largest AI communities in Asia-Pacific with 5,000+ members. Offers bite-sized courses, role-based learning tracks, and a bounty marketplace — great for anyone wanting to learn AI by actually building things.",
  },
  {
    name: "Build with AI",
    href: "https://buildwithai.my/",
    logo: "/build_with_ai_logo.jpeg",
    summary:
      "Malaysia's home for developers and non-technical builders creating AI projects. Hosts regular meetups, showcases 65+ member projects, and welcomes everyone from total beginners to experienced devs.",
  },
  {
    name: "AI Tinkerers",
    href: "https://aitinkerers.org",
    logo: "/ai_tinkerers_logo.png",
    summary:
      "A global network of 86,000+ AI engineers across 203 cities. KL chapter runs monthly meetups with live demos and technical deep-dives — no pitches, just builders sharing real work.",
  },
  {
    name: "AI Hackerdorm",
    href: "https://aihackerdorm.com",
    logo: "/ai_hackerdorm.webp",
    summary:
      "Student-first community for coders, designers, and entrepreneurs building AI projects together. Runs weekly sprints, hackathons, and mentorship sessions open to all skill levels.",
  },
  {
    name: "AI SEA",
    href: "https://www.aisea.builders",
    logo: "/aisea_logo.png",
    summary:
      "A 10,000+ builder network across Southeast Asia shipping real AI products. Organises regional hackathons, co-build sprints, and the flagship AI.SEA Week conference connecting engineers across the region.",
  },
  {
    name: "Rakan Tutor",
    href: "https://rakantutor.org",
    logo: "/rakan-tutor-logo.png",
    summary:
      "Non-profit bringing free AI education to underserved secondary school students in Malaysia. Runs hands-on workshops and an online learning platform to prepare young Malaysians for an AI-driven future.",
  },
  {
    name: "CoderPuffs",
    href: "https://luma.com/calendar/cal-GfEevCO5iGF9vbu?period=past",
    logo: "/coderpuffs_logo.png",
    summary:
      "A women-first initiative hosting hands-on café-based build sessions that make coding and AI more welcoming and accessible for all levels. Runs monthly meetups at various cafés across KL.",
  },
  {
    name: "Cursor Community",
    href: "https://www.cursor.com",
    logo: "/cursor-community-logo.png",
    summary:
      "Co-organised the Cursor Malaysia hackathon with 1000+ signups and the official community for Cursor in KL. Join hackathons, workshops and chat with builders.",
  },
];

type TestimonialFragment = {
  text: string;
  accent?: boolean;
};

type CommunityTestimonial = {
  fragments: TestimonialFragment[];
};

const communityTestimonials: CommunityTestimonial[] = [
  {
    fragments: [
      { text: "\"SF vibes and atmosphere,", accent: true },
      { text: " one-of-a-kind place in Malaysia\"" },
    ],
  },
  {
    fragments: [
      { text: "\"You guys brought all the big guns.", accent: true },
      {
        text: " That was insanely good to see the perspectives, hopes and dreams the way you guys prop up builders. ",
      },
      { text: "F***ing Awesome! A+\"", accent: true },
    ],
  },
  {
    fragments: [
      { text: "\"I felt the pulse of the community.", accent: true },
      { text: " It inspired me to build with AI. " },
      { text: "I went home and learnt Claude Code.", accent: true },
      {
        text: " I loved how supportive the community is to newbies. I felt very safe, heard and seen.\"",
      },
    ],
  },
  {
    fragments: [
      { text: "\"One of the few sessions where we had a ", accent: false },
      { text: "serious discussion about AI", accent: true },
      {
        text: " and its implications for our companies, society, and the country as a whole. ",
      },
      {
        text: "It gave me the sense that people outside our builders' bubble genuinely care about our nation's future.\"",
        accent: true,
      },
    ],
  },
  {
    fragments: [
      { text: "\"Gave me hope about the state of Malaysian youth and builders", accent: true },
      { text: " - it was so refreshing!\"" },
    ],
  },
  {
    fragments: [
      { text: "\"Gave me the idea that ", accent: false },
      { text: "I should create", accent: true },
      { text: " similar programme where " },
      { text: "I can provide opportunity for the school students to learn vibe coding", accent: true },
      { text: " and start building something, and also for myself to " },
      { text: "try build something on my own.\"", accent: true },
    ],
  },
];

const MalaysianAI = () => {

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      <main>
        <div className="px-3 md:px-4 lg:px-6 pt-16">
          <section className="relative h-[calc(100vh-78px)] flex flex-col overflow-hidden rounded-2xl border border-border text-white">
            <div className="absolute inset-0 z-0">
                <img
                  src="/batik_kl_city_sunrise.png"
                  alt="Batik KL city sunrise"
                  className="w-full h-full object-cover object-[50%_60%] saturate-[1.3]"
                />
              {/* Warm gold overlay to make city lights glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-amber-800/35 via-transparent to-pink-500/50 mix-blend-overlay" />
              {/* Readability gradient + overall darkening */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/5" />
              <div className="absolute inset-0 bg-black/10" />
            </div>

            <div className="relative z-10 flex-1 flex flex-col justify-center items-center mx-auto bg-transparent px-6 md:px-10 lg:px-16 max-w-[1440px] w-full pt-32 pb-20 text-center">
              <div className="max-w-4xl">
                <h1 className="hero-title text-white mb-6 drop-shadow-lg">
                  Driving Malaysia&apos;s AI progress
                </h1>
                <p className="text-base md:text-xl font-normal leading-relaxed text-white/90 max-w-2xl mx-auto drop-shadow-md">
                  The home of AI builders in Malaysia. Join workshops, events and get to know the
                  communities that help you get started and get going with AI.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <CTAButton
                    href="https://luma.com/malaysianai"
                    variant="white"
                    size="lg"
                    showArrow
                    isExternal={true}
                    className="w-64"
                  >
                    Join the next AI event
                  </CTAButton>
                  {/* Chat with our AI agent button — commented out for now
                  <CTAButton
                    href="https://wa.me/60103341501?text=Hey%2C%20I%27d%20like%20to%20stay%20updated%20about%20local%20AI%20community%20events"
                    variant="primary"
                    size="lg"
                    showArrow={true}
                    isExternal={true}
                    className="w-64 bg-foreground text-white hover:bg-foreground/90 border-foreground/10"
                  >
                    Chat with our AI agent
                  </CTAButton>
                  */}
                </div>
              </div>
            </div>
          </section>
          <div className="mt-6 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-foreground/60">
              Initiated by{" "}
              <a
                href="https://500.co"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 underline underline-offset-4 hover:text-foreground"
              >
                500 Global
              </a>
            </p>
          </div>
        </div>

        <section id="mission" className="py-20 md:py-28 bg-background">
          <div className="mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px]">
            <div className="max-w-4xl">
              <h2 className="section-title text-foreground">
                Your first step into AI starts here.
              </h2>
              <p className="section-title text-foreground/40 mt-2">
                Malaysian AI connects you to workshops, events, and a community of people figuring out AI together - from beginners to serious builders.
              </p>
            </div>
          </div>
        </section>

        <Sponsor />

        <section id="program" className="py-20 md:py-28 bg-muted">
          <div className="mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px]">
            <div className="mb-12">
              <p className="label-default text-foreground/60 mb-3">How We Support</p>
              <h2 className="section-title text-foreground">
                Join an event, a community, or join the residency to accelerate your AI journey.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {initiatives.map((initiative, index) => (
                <div
                  key={initiative.title}
                  className="relative flex flex-col rounded-2xl border border-border/60 bg-background p-6"
                >
                  <div className="relative -mx-6 -mt-6 mb-5 h-[14rem] overflow-hidden rounded-t-2xl">
                    <img
                      src={initiative.image}
                      alt={`${initiative.title} batik illustration`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 px-5 pb-4">
                      <h3 className="subsection-title text-white">{initiative.title}</h3>
                    </div>
                  </div>
                  <p className="label-default text-foreground/50">0{index + 1}</p>
                  <p className="body-default text-foreground/70 mt-3">{initiative.description}</p>
                  {initiative.cta ? (
                    <div className="mt-5">
                      <CTAButton
                        href={initiative.cta.href}
                        variant="outline"
                        size="sm"
                        showArrow
                        isExternal={initiative.cta.isExternal}
                      >
                        {initiative.cta.label}
                      </CTAButton>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="community-partners" className="py-20 md:py-28 bg-background">
          <div className="mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px]">
            <div>
              <h2 className="section-title text-foreground">
                Meet Malaysia&apos;s AI communities
              </h2>
              <p className="body-default text-foreground/70 mt-4 max-w-3xl">
                The best way to get started is by joining an event and meeting like-minded people.
                There&apos;s communities for everyone — from people totally new to coding, students,
                to technical ones for devs looking to go deeper into AI. Find your tribe and join
                an event. Many are free and very friendly!
              </p>
              <div className="mt-8">
                <CTAButton href="https://luma.com/malaysianai" variant="primary" size="lg" showArrow isExternal={true}>
                  Join the next AI event
                </CTAButton>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {communityPartners.map((partner) => (
                <div
                  key={partner.name}
                  className="flex flex-col rounded-2xl border border-border/60 bg-card/40 overflow-hidden"
                >
                  {/* Logo area */}
                  <div className="flex items-center justify-center bg-background border-b border-border/60 px-6 py-6">
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      className={`h-24 w-auto max-w-[220px] object-contain ${partner.name === "Cursor Community" ? "rounded-2xl" : "rounded-lg"}`}
                      loading="lazy"
                    />
                  </div>
                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6">
                    <h3 className="card-title text-foreground">{partner.name}</h3>
                    <p className="body-small text-foreground/60 mt-2 flex-1">{partner.summary}</p>
                    <div className="mt-5">
                      <CTAButton href={partner.href} variant="outline" size="sm" showArrow>
                        Visit website
                      </CTAButton>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="residents" className="py-20 md:py-28 bg-muted overflow-hidden">
          <div className="mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px] mb-10">
            <div className="max-w-3xl">
              <p className="label-default text-foreground/60 mb-3">Residency</p>
              <h2 className="section-title text-foreground">
                Home to ambitious Malaysian AI Startups.
              </h2>
              <p className="body-default text-foreground/70 mt-3">
                Be surrounded by a community of ambitious founders like you, who go on to win hackathons, organise major regional movements, raise VC and work at the edge of the technology.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-6">
              <CTAButton href="/residency" variant="primary" size="md" showArrow isExternal={false}>
                Learn more
              </CTAButton>
              <CTAButton href="/residents" variant="outline" size="md" showArrow isExternal={false}>
                View resident directory
              </CTAButton>
            </div>
          </div>
          <div className="px-6 md:px-10 lg:px-16">
            <ResidentsTicker />
          </div>
        </section>

        <section id="community-voices" className="bg-muted py-20 md:py-28">
          <div className="mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px]">
            <div className="max-w-3xl">
              <p className="label-default text-foreground/60 mb-3">Community Voices</p>
              <h2 className="section-title text-foreground">What the community has to say</h2>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
              {communityTestimonials.map((testimonial, index) => (
                <blockquote
                  key={index}
                  className="rounded-2xl border border-border/60 bg-background/85 p-6 md:p-7 text-base md:text-lg font-light leading-relaxed tracking-tight text-foreground"
                >
                  {testimonial.fragments.map((fragment, fragmentIndex) => (
                    <span
                      key={`${index}-${fragmentIndex}`}
                      className={fragment.accent ? "text-lime-700 font-semibold" : "text-foreground/95"}
                    >
                      {fragment.text}
                    </span>
                  ))}
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="relative overflow-hidden bg-background py-20 md:py-28">
          <div className="mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px]">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-background text-white">
              <div className="absolute inset-0 z-0">
                <img
                  src="/batik-kinabalu-hero.png"
                  alt="Mount Kinabalu in Batik style"
                  className="w-full h-full object-cover opacity-100"
                />
                <div className="absolute inset-0 bg-black/55" />
              </div>
              <div className="relative z-10 py-20 md:py-28 text-center px-6 md:px-10">
                <h2 className="section-title text-white mb-6" style={{ textWrap: "balance" }}>
                  Start building today
                </h2>
                <p className="mx-auto mb-8 max-w-2xl text-sm md:text-base text-white/80">
                  The best place to start is by signing up for an event. You&apos;ll get to know people, meet the community and get an immersive experience to accelerate your AI journey.
                </p>
                <CTAButton href="https://luma.com/malaysianai" variant="white" size="lg" showArrow isExternal={true}>
                  Join the next AI event
                </CTAButton>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MalaysianAI;
