"use client";

import { useRef, useEffect, useState } from "react";
import { CTAButton } from "@/components/CTAButton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ResidentsTicker } from "@/components/ResidentsTicker";

const LUMA_EVENTS_URL = "https://luma.com/malaysianai";
const LUMA_EVENTS_EMBED_URL = "https://luma.com/embed/calendar/cal-pPgkuwCFrycSv1Z/events";

const LumaEventsEmbed = () => {
  const frameRef = useRef<HTMLDivElement>(null);
  const [shouldLoadFrame, setShouldLoadFrame] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || shouldLoadFrame) return;

    let timeoutId: number | undefined;
    const loadFrame = () => {
      timeoutId = window.setTimeout(() => setShouldLoadFrame(true), 400);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        loadFrame();
      },
      { rootMargin: "120px 0px", threshold: 0.01 }
    );

    observer.observe(frame);

    return () => {
      observer.disconnect();
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [shouldLoadFrame]);

  return (
    <div
      ref={frameRef}
      className="overflow-hidden rounded-xl border border-border/60 bg-background [content-visibility:auto] [contain-intrinsic-size:720px]"
    >
      {shouldLoadFrame ? (
        <iframe
          src={LUMA_EVENTS_EMBED_URL}
          title="Malaysian AI upcoming events on Lu.ma"
          className="h-[720px] w-full"
          loading="lazy"
          allow="clipboard-write; payment"
        />
      ) : (
        <div className="flex min-h-[420px] flex-col items-center justify-center px-6 text-center md:min-h-[720px]">
          <p className="label-default text-foreground/50">Live Lu.ma Calendar</p>
          <p className="body-default mt-3 max-w-md text-foreground/70">
            Upcoming Malaysian AI events will load here as you reach this section.
          </p>
          <div className="mt-6">
            <CTAButton href={LUMA_EVENTS_URL} variant="outline" size="sm" showArrow isExternal={true}>
              Open full calendar
            </CTAButton>
          </div>
        </div>
      )}
    </div>
  );
};

const ScrollRevealText = ({ text, className }: { text: string; className?: string }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const words = text.split(" ");

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);

    const onScroll = () => {
      if (!mq.matches) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      setProgress(Math.max(0, Math.min(1, (vh * 0.85 - rect.top) / (vh * 0.65))));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const wordProgress = isDesktop
          ? Math.max(0, Math.min(1, progress * words.length - i))
          : null;
        return (
          <span
            key={i}
            className="transition-colors duration-150"
            style={wordProgress !== null ? { color: `hsl(var(--foreground) / ${0.3 + wordProgress * 0.7})` } : undefined}
          >
            {word}{" "}
          </span>
        );
      })}
    </p>
  );
};


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
      href: "#events",
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
      href: "/community",
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
      href: "https://instagram.com/malaysianai",
      isExternal: true,
    },
  },
];

const MalaysianAI = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      <main>
        <section id="events" className="poster-wash relative overflow-hidden border-b border-foreground/15 pb-14 pt-28 md:pb-20 md:pt-32">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#f4e6c7] to-transparent" />
          <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 items-start gap-10 px-6 md:px-10 lg:grid-cols-[1fr_1fr] lg:gap-14 lg:px-16">
            <div className="pt-2 lg:sticky lg:top-24">
              <p className="poster-kicker mb-5 text-sm text-foreground/70">
                Malaysian AI meetups
              </p>
              <h1 className="hero-title poster-title max-w-2xl text-foreground lg:text-[4.2rem]">
                <span className="lg:whitespace-nowrap">AI things worth</span><br /> <span className="lg:whitespace-nowrap">leaving the house for.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base font-medium leading-relaxed text-foreground/70 md:text-lg">
                Runs, show &amp; tells, workshops, hackathons and the people making them happen.
              </p>

              <div className="mt-8">
                <CTAButton href={LUMA_EVENTS_URL} variant="primary" size="lg" showArrow isExternal={true}>
                  See all upcoming events
                </CTAButton>
              </div>

            </div>

            <div className="relative lg:pt-2">
              <p className="poster-kicker mb-3 flex items-center gap-2 text-sm text-foreground">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#f35b84]" /> Happening next
              </p>
              <div className="rounded-[1.25rem] border border-foreground/20 bg-white p-2 shadow-[0_10px_0_hsl(var(--foreground)/0.14)]">
                <LumaEventsEmbed />
              </div>
              <p className="mt-4 text-center text-xs font-medium text-foreground/50">
                Find a thing. Bring a friend. Make a little trouble.
              </p>
            </div>
          </div>
        </section>

        <section id="mission" className="bg-background py-16 md:py-20 lg:py-24">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-6 md:px-10 lg:grid-cols-[1.06fr_0.94fr] lg:gap-14 lg:px-16">
            <div className="max-w-2xl">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-foreground/55">No gatekeeping</p>
              <h2 className="section-title text-foreground lg:text-6xl">
                A good place to start is with other people.
              </h2>
              <ScrollRevealText
                className="mt-5 max-w-xl text-lg font-medium leading-[1.3] text-foreground/55 md:text-xl"
                text="Malaysian AI connects you to workshops, events, and a community of people figuring out AI together - from beginners to serious builders."
              />
            </div>
            <figure className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.5rem] border border-foreground/10 bg-foreground shadow-[0_8px_0_hsl(var(--foreground)/0.1)]">
              <img
                src="/show-and-tell.jpg"
                alt="Builders sharing work at a Malaysian AI Show and Tell"
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <figcaption className="absolute bottom-4 left-4 rounded-full bg-background/95 px-3 py-2 text-xs font-bold text-foreground shadow-sm">
                Show &amp; Tell Thursdays at the residency
              </figcaption>
            </figure>
          </div>
        </section>

        <section id="program" className="py-20 md:py-28 bg-muted/80">
          <div className="mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px]">
            <div className="mb-12">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-foreground/55">Pick your adventure</p>
              <h2 className="section-title text-foreground">
                There&apos;s more than one way in.
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12">
              {initiatives.map((initiative, index) => (
                <div
                  key={initiative.title}
                  className={`playful-card group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-foreground/10 bg-background p-6 md:p-7 ${[
                    "lg:col-span-7",
                    "lg:col-span-5",
                    "lg:col-span-5",
                    "lg:col-span-7",
                  ][index]}`}
                >
                  <div className={`relative -mx-6 -mt-6 mb-5 overflow-hidden rounded-t-[1.75rem] md:-mx-7 md:-mt-7 ${index === 0 || index === 3 ? "h-[17rem] lg:h-[20rem]" : "h-[14rem] lg:h-[16rem]"}`}>
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
                  <p className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">0{index + 1}</p>
                  <p className="body-default text-foreground/70 mt-3">{initiative.description}</p>
                  {initiative.cta ? (
                    <div className="mt-5">
                      <CTAButton
                        href={initiative.cta.href}
                        variant="outline"
                        size="sm"
                        showArrow
                        isExternal={initiative.cta.href.startsWith("#") ? false : initiative.cta.isExternal}
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

        <section id="residents" className="py-20 md:py-28 bg-muted/80 overflow-hidden">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-6 md:px-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-16">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-foreground/55">The residency</p>
              <h2 className="section-title text-foreground">
                A home for Malaysian AI startups.
              </h2>
              <p className="body-default text-foreground/70 mt-3">
                Be surrounded by a community of ambitious founders like you, who go on to win hackathons, organise major regional movements, raise VC and work at the edge of the technology.
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-6">
                <CTAButton href="/residency" variant="primary" size="md" showArrow isExternal={false}>
                  Learn more
                </CTAButton>
                <CTAButton href="/residents" variant="outline" size="md" showArrow isExternal={false}>
                  View resident directory
                </CTAButton>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[1.75rem] border border-foreground/10 bg-foreground shadow-[0_8px_0_hsl(var(--foreground)/0.1)]">
              <img
                src="/batik-paddy-clean.png"
                alt="Malaysian paddy fields in batik style"
                loading="lazy"
                className="aspect-[4/3] h-full w-full object-cover"
              />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-foreground/90 px-4 py-3 text-sm font-medium text-white backdrop-blur-sm">
                Build in Malaysia. Ship for the world.
              </div>
            </div>
          </div>
          <div className="mt-10 px-6 md:px-10 lg:px-16">
            <ResidentsTicker />
          </div>
        </section>

        <section id="contact" className="relative overflow-hidden bg-background py-20 md:py-28">
          <div className="mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px]">
            <div className="grid overflow-hidden rounded-[2rem] border border-foreground/15 bg-foreground text-white shadow-[0_10px_0_hsl(var(--foreground)/0.12)] lg:grid-cols-[0.82fr_1.18fr]">
              <div className="relative overflow-hidden px-7 py-16 md:px-12 md:py-24">
                <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:20px_20px]" />
                <div className="relative z-10 max-w-xl">
                  <h2 className="section-title mb-6 text-white" style={{ textWrap: "balance" }}>
                    Bring the thing you&apos;re working on.
                  </h2>
                  <p className="mb-8 max-w-2xl text-sm leading-relaxed text-white/75 md:text-base">
                    A half-formed idea, a question, a side project — it all counts. Find an event, say hello, and see what happens when you put it in a room with other builders.
                  </p>
                  <CTAButton href="https://luma.com/malaysianai" variant="white" size="lg" showArrow isExternal={true}>
                    Find an event this week
                  </CTAButton>
                </div>
              </div>
              <div className="relative min-h-[280px] overflow-hidden md:min-h-[380px]">
                <img
                  src="/batik-kinabalu-hero.png"
                  alt="Mount Kinabalu in Batik style"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent lg:bg-gradient-to-r" />
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
