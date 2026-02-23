"use client";

import { useState } from "react";
import { CTAButton } from "@/components/CTAButton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
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
  };
};

const initiatives: Initiative[] = [
  {
    title: "AI residency",
    description:
      "A structured residency that gives AI-native teams space, mentorship, and launch support.",
    image: "/batik-paddy-clean.png",
    cta: {
      label: "Learn more",
      href: "#residents",
    },
  },
  {
    title: "Events and talks",
    description:
      "Demo days, founder stories, and practitioner deep-dives that translate frontier AI into products.",
    image: "/batik_kl_night_wide.png",
  },
  {
    title: "Connecting communities",
    description:
      "Strengthening grassroots builder networks across Malaysia with shared infrastructure and partners.",
    image: "/batik_kl_city_sunset.png",
    cta: {
      label: "Learn more",
      href: "#community-partners",
    },
  },
  {
    title: "Content and education",
    description:
      "Playbooks, courses, and learning tracks that upskill talent at every stage of their career.",
    image: "/batik_robot_hero.png",
  },
];

const communityPartners = [
  {
    name: "Build Club",
    href: "https://www.buildclub.ai",
    logo: "/build-club-logo-navbar.webp",
    summary:
      "A collaborative AI learning community focused on learning through building, with AI-native courses, role tracks, and certifications. It brings together young professionals, AI evangelists, agencies, and solopreneurs who want to grow their skills with a builder community.",
  },
  {
    name: "Build with AI",
    href: "https://buildwithai.my/",
    logo: "/build_with_ai_logo.jpeg",
    summary:
      "A project showcase for the Build With AI Malaysia community, featuring AI projects built by Malaysian builders across many categories. It helps people discover what locals are creating and invites builders to explore projects or join the community.",
  },
  {
    name: "AI Tinkerers",
    href: "https://aitinkerers.org",
    logo: "/ai_tinkerers_logo.png",
    summary:
      "A global community of AI engineers and researchers building real systems and sharing unfinished work. It runs local meetups centered on demos, code, and technical insights while connecting builders through a global network.",
  },
  {
    name: "AI Hackerdorm",
    href: "https://aihackerdorm.com",
    logo: "/ai_hackerdorm.webp",
    summary:
      "A student-first community that hosts regular builder sessions with project showcases, co-building time, and mentorship. It welcomes coders, designers, entrepreneurs, and curious makers who want to build and learn together.",
  },
  {
    name: "AI SEA",
    href: "https://www.aisea.builders",
    logo: "/aisea_logo.png",
    summary:
      "A Southeast Asia grassroots builder movement and network for people shipping AI that connects local communities into a coalition. They run hackathons, co-build sessions, and sprints while sharing infrastructure for cross-border collaboration.",
  },
  {
    name: "Rakan Tutor",
    href: "https://rakantutor.org",
    logo: "/rakan-tutor-logo.png",
    summary:
      "An organization providing free, hybrid AI programs for ASEAN youth through hands-on workshops and a digital learning platform. Its mission is to equip secondary school students with the skills and confidence for an AI-powered future.",
  },
];

const MalaysianAI = () => {
  const [activePartner, setActivePartner] = useState(communityPartners[0]);

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
                  className="w-full h-full object-cover object-[50%_60%]"
                />
              {/* Warm gold overlay to make city lights glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-amber-800/35 via-transparent to-pink-500/50 mix-blend-overlay" />
              {/* Readability gradient at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/5" />
            </div>

            <div className="relative z-10 flex-1 flex flex-col justify-center items-center mx-auto bg-transparent px-6 md:px-10 lg:px-16 max-w-[1440px] w-full pt-32 pb-20 text-center">
              <div className="max-w-4xl">
                <h1 className="hero-title text-white mb-6 drop-shadow-lg">
                  Driving Malaysia&apos;s AI progress
                </h1>
                <p className="text-base md:text-xl font-normal leading-relaxed text-white/90 max-w-2xl mx-auto drop-shadow-md">
                  Malaysian AI backs grassroots builders with visibility, learning, and resources
                  so more Malaysian teams can ship real AI products and grow globally.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <CTAButton
                    href="#program"
                    variant="white"
                    size="lg"
                    showArrow
                    isExternal={false}
                    className="w-64"
                  >
                    Explore initiatives
                  </CTAButton>
                  <CTAButton
                    href="/contact"
                    variant="outline"
                    size="lg"
                    showArrow
                    isExternal={false}
                    className="w-64 text-white/90 border-white/50 hover:bg-white/10 hover:text-white"
                  >
                    Get in touch
                  </CTAButton>
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
                Help Malaysians in AI succeed in their goals
              </h2>
              <p className="body-default text-foreground/70 mt-4">
                Malaysia is scaling AI across government, industry, and society. Malaysian AI makes
                sure that momentum reaches the people who build: students breaking in,
                practitioners leveling up, and founders turning prototypes into companies.
              </p>
              <p className="body-default text-foreground/70 mt-4">
                We help Malaysians in AI succeed in their goals by attracting attention,
                accelerating learning, and unlocking resources. That means demo days and talks
                that put builders in front of the right rooms, playbooks and learning tracks that
                translate frontier AI into practical skills, and a residency that provides space,
                mentorship, and launch support. We also strengthen grassroots communities across
                Malaysia so builders can find collaborators, customers, and partners, and keep
                shipping toward globally competitive outcomes.
              </p>
            </div>
          </div>
        </section>

        <Sponsor />

        <section id="program" className="py-20 md:py-28 bg-muted">
          <div className="mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px]">
            <div className="mb-12">
              <p className="label-default text-foreground/60 mb-3">Our Initiatives</p>
              <h2 className="section-title text-foreground">
                Backing the people who build Malaysia&apos;s AI
              </h2>
              <p className="body-default text-foreground/70 mt-3 max-w-2xl">
                We partner with top communities, run acceleration events, and operate a residency
                that helps teams go from idea to product.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {initiatives.map((initiative, index) => (
                <div
                  key={initiative.title}
                  className="relative flex flex-col rounded-2xl border border-border/60 bg-background p-6"
                >
                  <div className="relative -mx-6 -mt-6 mb-5 h-[22rem] overflow-hidden rounded-t-2xl">
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
                        isExternal={false}
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
                These are the organisations that are championing AI with us - they run hundreds of
                events across Malaysia, hackathons, and workshops each year, upskilling Malaysian
                talent, stimulating startups, and building fluency in AI across ages.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] gap-6 lg:gap-8">
              <div className="rounded-2xl border border-border/60 bg-card/60 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-foreground/50">
                  Communities
                </p>
                <div className="mt-4 space-y-3">
                  {communityPartners.map((partner) => (
                    <button
                      key={partner.name}
                      type="button"
                      onClick={() => setActivePartner(partner)}
                      className={cn(
                        "group flex w-full items-center gap-3 rounded-2xl border border-transparent bg-background/70 px-4 py-3 text-left transition-all duration-200 hover:-translate-y-0.5 hover:bg-background",
                        activePartner.name === partner.name && "border-primary/50 bg-background"
                      )}
                      aria-pressed={activePartner.name === partner.name}
                      aria-label={`Select ${partner.name}`}
                    >
                      <div className="flex h-12 w-16 items-center justify-center rounded-xl bg-background/80 border border-border/60">
                        <img
                          src={partner.logo}
                          alt={`${partner.name} logo`}
                          className="max-h-8 w-full object-contain opacity-75 transition-opacity duration-200 group-hover:opacity-100"
                          loading="lazy"
                        />
                      </div>
                      <span className="text-sm font-medium text-foreground">{partner.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border/60 bg-card/60 p-6">
                <div className="flex flex-col gap-6">
                  <div className="flex w-full items-center justify-center rounded-2xl bg-background/70 border border-border/60 px-10 py-12">
                    <img
                      src={activePartner.logo}
                      alt={`${activePartner.name} logo`}
                      className="h-24 sm:h-28 md:h-32 lg:h-36 w-auto max-w-[420px] object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{activePartner.name}</h3>
                    <p className="mt-3 text-sm text-foreground/70">{activePartner.summary}</p>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <CTAButton
                    href="/community"
                    variant="outline"
                    size="sm"
                    isExternal={false}
                    showArrow={false}
                  >
                    Learn more
                  </CTAButton>
                  <CTAButton href={activePartner.href} variant="outline" size="sm" showArrow={false}>
                    Visit website
                  </CTAButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="residents" className="py-20 md:py-28 bg-muted overflow-hidden">
          <div className="mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px]">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
              <div>
                <p className="label-default text-foreground/60 mb-3">Residency</p>
                <h2 className="section-title text-foreground">
                  Our residency is home to exceptional builders in AI
                </h2>
                <p className="body-default text-foreground/70 mt-3 max-w-2xl">
                  Get to know some of the startups building in Malaysia in the current cohorts.
                </p>
              </div>
              <CTAButton href="/residents" variant="outline" size="md" showArrow isExternal={false}>
                View resident directory
              </CTAButton>
            </div>
          </div>
          <div className="px-6 md:px-10 lg:px-16">
            <ResidentsTicker />
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
                  Get in touch with us
                </h2>
                <p className="mx-auto mb-8 max-w-2xl text-sm md:text-base text-white/80">
                  Partner with Malaysian AI, support the ecosystem, or join a program. We&apos;re ready
                  to collaborate.
                </p>
                <CTAButton href="/contact" variant="white" size="lg" showArrow isExternal={false}>
                  Contact us
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
