import { useState, type ComponentType } from "react";
import { CTAButton } from "@/components/CTAButton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import {
  CleveAI,
  DocuAsk,
  ReplyrAI,
  ResidentImages,
  Robin,
  StealthStartup,
} from "@/components/ResidentLogos";

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

const initiatives = [
  {
    title: "AI residency",
    description:
      "A structured residency that gives AI-native teams space, mentorship, and launch support.",
  },
  {
    title: "Events and talks",
    description:
      "Demo days, founder stories, and practitioner deep-dives that translate frontier AI into products.",
  },
  {
    title: "Forming communities",
    description:
      "Strengthening grassroots builder networks across Malaysia with shared infrastructure and partners.",
  },
  {
    title: "Content and education",
    description:
      "Playbooks, courses, and learning tracks that upskill talent at every stage of their career.",
  },
];

const communityPartners = [
  {
    name: "Build Club",
    href: "https://www.buildclub.ai",
    logo: "/build-club-logo-navbar.webp",
    summary: "A builder-first community focused on shipping real AI products.",
    focus: "Builder sprints",
    audience: "Founders & makers",
    impact: "Product demos and peer feedback loops.",
  },
  {
    name: "Build with AI",
    href: "https://buildwithai.my/",
    logo: "/build_with_ai_logo.jpeg",
    summary: "Hands-on gatherings that help Malaysians build with frontier AI.",
    focus: "Workshops",
    audience: "Students to professionals",
    impact: "Practical skills and mentorship.",
  },
  {
    name: "AI Tinkerers",
    href: "https://aitinkerers.org",
    logo: "/ai_tinkerers_logo.png",
    summary: "Meetups for people building, tinkering, and learning together.",
    focus: "Meetups",
    audience: "Builders & researchers",
    impact: "Knowledge-sharing across teams.",
  },
  {
    name: "AI Hackerdorm",
    href: "https://aihackerdorm.com",
    logo: "/ai_hackerdorm.webp",
    summary: "A community for fast prototyping and rapid experimentation.",
    focus: "Hack sessions",
    audience: "Hackers & students",
    impact: "Prototype-to-product momentum.",
  },
  {
    name: "AI SEA",
    href: "https://www.aisea.builders",
    logo: "/aisea_logo.png",
    summary: "Regional network linking Southeast Asia&apos;s AI builders.",
    focus: "Regional network",
    audience: "Founders & operators",
    impact: "Cross-border collaboration.",
  },
  {
    name: "Rakan Tutor",
    href: "https://rakantutor.org",
    logo: "/rakan-tutor-logo.png",
    summary: "Community-driven learning support for students and tutors.",
    focus: "Education support",
    audience: "Secondary students",
    impact: "Talent pipeline for future builders.",
  },
];

type Startup = {
  name: string;
  component?: ComponentType<{ className?: string }>;
  image?: string;
  href?: string;
};

const startups: Startup[] = [
  { name: "ReplyrAI", component: ReplyrAI, href: "https://replyr.ai" },
  { name: "Cleve", component: CleveAI, href: "https://cleve.ai" },
  { name: "Robin", component: Robin, href: "https://robinai.com" },
  { name: "DocuAsk", component: DocuAsk, href: "https://docuask.com" },
  { name: "Blue Bolt Labs", image: ResidentImages.bluebolt, href: "https://blueboltlabs.com" },
  { name: "Seavoice", image: ResidentImages.seavoice, href: "https://seavoice.ai" },
  { name: "Klovr", image: ResidentImages.klovr, href: "https://klovr.co/" },
  { name: "Kelas Sekejap", image: ResidentImages.kelassekejap, href: "https://kelassekejap.com" },
  { name: "EasyBuzz", image: ResidentImages.easybuzz },
  { name: "Stealth Startup", component: StealthStartup },
];

const StartupLogo = ({ startup }: { startup: Startup }) => {
  const logoClassName = "h-full w-full max-h-full max-w-full";

  if (startup.component) {
    const Component = startup.component;
    return <Component className={logoClassName} />;
  }

  if (startup.image) {
    return (
      <img
        alt={startup.name}
        className={`${logoClassName} object-contain`}
        loading="lazy"
        src={startup.image}
      />
    );
  }

  return null;
};

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
                src="/batik-paddy-clean.png"
                alt="Sharp, text-free Malaysian paddy fields in Batik style"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 bg-gradient-to-t from-black/60 via-black/20 to-black/30" />
            </div>

            <div className="relative z-10 flex-1 flex flex-col justify-center items-center mx-auto bg-transparent px-6 md:px-10 lg:px-16 max-w-[1440px] w-full pt-32 pb-20 text-center">
              <div className="max-w-4xl">
                <p className="label-default text-white/70 mb-4">National AI builder movement</p>
                <h1 className="hero-title text-white mb-6 drop-shadow-lg">
                  Driving Malaysia&apos;s AI progress
                </h1>
                <p className="text-base md:text-xl font-normal leading-relaxed text-white/90 max-w-2xl mx-auto drop-shadow-md">
                  Malaysian AI connects policy momentum with grassroots builders so the nation can
                  launch globally competitive AI companies.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <CTAButton href="#program" variant="white" size="lg" showArrow isExternal={false}>
                    Explore initiatives
                  </CTAButton>
                  <CTAButton href="#community-partners" variant="secondary" size="lg" showArrow isExternal={false}>
                    See the ecosystem
                  </CTAButton>
                </div>

                <p className="mt-6 text-xs uppercase tracking-[0.3em] text-white/70">
                  Initiated by{" "}
                  <a
                    href="https://500.co"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/90 underline underline-offset-4 hover:text-white"
                  >
                    500 Global
                  </a>
                </p>
              </div>
            </div>
          </section>
        </div>

        <section id="mission" className="py-20 md:py-28 bg-background">
          <div className="mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px]">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] gap-10 lg:gap-16 items-start">
              <div>
                <p className="label-default text-foreground/60 mb-3">Mission</p>
                <h2 className="section-title text-foreground">
                  A national stack for AI talent, adoption, and company creation
                </h2>
                <p className="body-default text-foreground/70 mt-4 max-w-2xl">
                  Malaysia is pushing to scale AI across government, industry, and society. Our role
                  is to make sure that investment translates into upskilled talent, resilient
                  communities, and startups that can compete globally.
                </p>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {highlights.map((item) => (
                    <div key={item.title} className="rounded-2xl border border-border/60 bg-card/60 p-5">
                      <p className="text-sm font-semibold text-foreground">{item.title}</p>
                      <p className="mt-2 text-sm text-foreground/70">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-border/60 bg-muted p-6">
                <p className="label-default text-foreground/60 mb-4">What we stand for</p>
                <ul className="space-y-4 text-sm text-foreground/70">
                  <li className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary/70" />
                    Increase AI readiness through coordinated upskilling and applied learning.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary/70" />
                    Turn grassroots builders into founders who ship globally valuable products.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary/70" />
                    Build open, collaborative networks that reach students and working professionals.
                  </li>
                </ul>
                <div className="mt-6 rounded-xl bg-background/70 border border-border/60 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-foreground/50">
                    Strategic signal
                  </p>
                  <p className="mt-2 text-sm text-foreground/70">
                    Malaysia is investing in AI infrastructure and talent through national budgets,
                    including a proposed sovereign AI cloud and incentives for AI training.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="program" className="py-20 md:py-28 bg-muted">
          <div className="mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px]">
            <div className="mb-12">
              <p className="label-default text-foreground/60 mb-3">Our Initiatives</p>
              <h2 className="section-title text-foreground">
                Programs that turn policy into practice
              </h2>
              <p className="body-default text-foreground/70 mt-3 max-w-2xl">
                We build the scaffolding for Malaysia&apos;s AI ecosystem: from education to community
                to venture-ready companies.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {initiatives.map((initiative, index) => (
                <div
                  key={initiative.title}
                  className="relative flex flex-col rounded-2xl border border-border/60 bg-background p-6"
                >
                  <p className="label-default text-foreground/50">0{index + 1}</p>
                  <h3 className="subsection-title text-foreground mt-4">{initiative.title}</h3>
                  <p className="body-default text-foreground/70 mt-3">{initiative.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="community-partners" className="py-20 md:py-28 bg-background">
          <div className="mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px]">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
              <div className="w-full lg:w-[35%]">
                <p className="label-default text-foreground/60 mb-3">Ecosystem</p>
                <h2 className="section-title text-foreground">
                  The Malaysian talent ecosystem is supported by multiple organisations
                </h2>
                <p className="body-default text-foreground/70 mt-4">
                  Malaysian AI aims to channel resources to these communities to upskill talent
                  and stimulate the growth of startups. These are where we directly impact
                  students from secondary school to members across the workforce.
                </p>
              </div>
              <div className="w-full lg:w-[65%] space-y-6">
                <div className="rounded-2xl border border-border/60 bg-card/60 p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex h-16 w-28 items-center justify-center rounded-xl bg-background/70 border border-border/60">
                      <img
                        src={activePartner.logo}
                        alt={`${activePartner.name} logo`}
                        className="max-h-10 w-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-foreground/50">
                        Community spotlight
                      </p>
                      <h3 className="text-xl font-semibold text-foreground">{activePartner.name}</h3>
                      <p className="mt-2 text-sm text-foreground/70">{activePartner.summary}</p>
                    </div>
                  </div>
                  <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-foreground/70">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-foreground/50">Focus</p>
                      <p className="mt-1 font-medium text-foreground">{activePartner.focus}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-foreground/50">Audience</p>
                      <p className="mt-1 font-medium text-foreground">{activePartner.audience}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-foreground/50">Impact</p>
                      <p className="mt-1 font-medium text-foreground">{activePartner.impact}</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <a
                      href={activePartner.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                    >
                      Visit community site -&gt;
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-5">
                  {communityPartners.map((partner) => (
                    <button
                      key={partner.name}
                      type="button"
                      onClick={() => setActivePartner(partner)}
                      className={cn(
                        "group flex h-full flex-col justify-between rounded-2xl border border-transparent bg-card/60 px-4 py-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:bg-card",
                        activePartner.name === partner.name && "border-primary/50 bg-card"
                      )}
                      aria-pressed={activePartner.name === partner.name}
                      aria-label={`Select ${partner.name}`}
                    >
                      <div className="flex h-16 items-center justify-center">
                        <img
                          src={partner.logo}
                          alt={`${partner.name} logo`}
                          className="max-h-14 w-full object-contain opacity-75 transition-opacity duration-200 group-hover:opacity-100"
                          loading="lazy"
                        />
                      </div>
                      <span className="sr-only">{partner.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="residents" className="py-20 md:py-28 bg-muted">
          <div className="mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px]">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
              <div>
                <p className="label-default text-foreground/60 mb-3">Residency</p>
                <h2 className="section-title text-foreground">
                  Our residency is home to exceptional builders in AI
                </h2>
                <p className="body-default text-foreground/70 mt-3 max-w-2xl">
                  Logos of all the AI startups building with us across the current cohorts.
                </p>
              </div>
              <CTAButton href="/residents" variant="outline" size="md" showArrow isExternal={false}>
                View resident directory
              </CTAButton>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {startups.map((startup) => (
                <div
                  key={startup.name}
                  className="flex items-center justify-center rounded-2xl border border-border/70 bg-background/60 p-4"
                >
                  <div className="h-14 w-20 md:h-16 md:w-24">
                    <StartupLogo startup={startup} />
                  </div>
                </div>
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
                  Get in touch with us
                </h2>
                <p className="mx-auto mb-8 max-w-2xl text-sm md:text-base text-white/80">
                  Partner with Malaysian AI, support the ecosystem, or join a program. We&apos;re ready
                  to collaborate.
                </p>
                <CTAButton href="mailto:hello@malaysianai.org" variant="white" size="lg" showArrow>
                  Email Malaysian AI
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
