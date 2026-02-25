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
                    href="/book-demo"
                    variant="white"
                    size="lg"
                    showArrow
                    isExternal={false}
                    className="w-64"
                  >
                    Join the next AI event
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
                Your first step into AI starts here
              </h2>
              <p className="body-default text-foreground/70 mt-4">
                Malaysian AI connects you to workshops, events, and a community of people figuring out AI together — whether you're just curious or ready to go deep.
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
                The best way to get started is by joining an event and meeting like-minded people.
                There&apos;s communities for everyone — from people totally new to coding, students,
                to technical ones for devs looking to go deeper into AI. Find your tribe and join
                an event. Many are free and very friendly!
              </p>
              <div className="mt-8">
                <CTAButton href="/book-demo" variant="default" size="lg" showArrow isExternal={false}>
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
                  <div className="flex items-center justify-center bg-background border-b border-border/60 px-10 py-10">
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      className="h-16 w-auto max-w-[180px] object-contain"
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
