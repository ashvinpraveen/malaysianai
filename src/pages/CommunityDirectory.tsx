import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CTAButton } from "@/components/CTAButton";
import { communityPartners } from "@/data/communityPartners";
import {
  Sparkles,
  ArrowUpRight,
  Lightbulb,
} from "lucide-react";

const stats = [
  { label: "Community partners", value: `${communityPartners.length}` },
  { label: "Partner sites", value: `${communityPartners.length}` },
  { label: "Contact paths", value: "2" },
  { label: "Featured logos", value: `${communityPartners.length}` },
];

const focusAreas = [
  { label: "Builders & shipping", count: "Featured" },
  { label: "Tinkerers & hackers", count: "Featured" },
  { label: "Regional community", count: "Featured" },
  { label: "Education & mentoring", count: "Featured" },
];

const partnerHighlight =
  "Featured on the Malaysian AI landing page. Visit their site to learn more.";

const CommunityDirectory = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-muted/70 via-background to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-muted/60 to-transparent" />
      </div>

      <Navbar />

      <main className="pt-32 pb-24">
        <section className="mx-auto w-full max-w-[1240px] px-6 md:px-10 lg:px-16">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-start">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs uppercase tracking-[0.3em] text-foreground/70">
                <Sparkles className="h-4 w-4" />
                Community Directory
              </div>
              <h1 className="hero-title text-foreground">
                Meet the community partners powering Malaysia&apos;s AI momentum.
              </h1>
              <p className="body-large text-foreground/70 max-w-xl">
                Explore the communities featured on the landing page. Join, collaborate, or list
                your own circle.
              </p>
              <div className="flex flex-wrap gap-4">
                <CTAButton href="mailto:hello@malaysianai.org" variant="primary" size="lg" showArrow isExternal={false}>
                  List your community
                </CTAButton>
                <CTAButton
                  href="mailto:hello@malaysianai.org"
                  variant="outline"
                  size="lg"
                  showArrow={false}
                  isExternal={false}
                >
                  Request an intro
                </CTAButton>
              </div>
              <div className="flex flex-wrap gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col gap-1 rounded-2xl border border-border bg-card/70 px-5 py-4"
                  >
                    <span className="text-2xl font-semibold text-foreground">{stat.value}</span>
                    <span className="text-xs uppercase tracking-[0.25em] text-foreground/60">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-border bg-card/80 p-8 md:p-10 shadow-[0_30px_80px_-50px_rgba(11,31,35,0.45)]">
              <h2 className="subsection-title text-foreground mb-6">Focus areas</h2>
              <div className="space-y-4">
                {focusAreas.map((area) => (
                  <div
                    key={area.label}
                    className="flex items-center justify-between rounded-2xl border border-border/70 bg-background/70 px-4 py-3"
                  >
                    <span className="text-sm font-medium text-foreground">{area.label}</span>
                    <span className="text-xs uppercase tracking-[0.2em] text-foreground/60">
                      {area.count}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-2xl border border-dashed border-border bg-background/70 px-5 py-4">
                <div className="flex items-center gap-3 text-sm text-foreground/70">
                  <Lightbulb className="h-4 w-4" />
                  Looking for a niche group? We can spin up a new circle within 4 weeks.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-20 w-full max-w-[1240px] px-6 md:px-10 lg:px-16">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <p className="label-default text-foreground/60">Directory</p>
              <h2 className="section-title text-foreground">Explore community partners</h2>
              <p className="body-default text-foreground/70 max-w-xl">
                These are the same communities featured on the landing page. Reach out for
                introductions or connect directly through their sites.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                "All partners",
                "Builders",
                "Tinkerers",
                "Hackers",
                "SEA",
                "Tutoring",
              ].map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.25em] text-foreground/60"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {communityPartners.map((partner) => (
              <div
                key={partner.name}
                className="flex h-full flex-col rounded-[2rem] border border-border bg-card p-6 md:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ring-1 ring-foreground/15"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-24 items-center justify-center rounded-2xl border border-border/70 bg-background/70 px-3 py-2">
                      <img
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        className="max-h-10 w-full object-contain opacity-90"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <h3 className="card-title text-foreground mb-1">{partner.name}</h3>
                      <p className="text-xs uppercase tracking-[0.25em] text-foreground/60">
                        Community partner
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full border border-border bg-background px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-foreground/60">
                    Featured
                  </span>
                </div>

                <p className="body-default text-foreground/70 mt-4">
                  {partnerHighlight}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-foreground/70">
                  <a
                    href={partner.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-foreground/80 transition-colors"
                  >
                    Visit community
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <a
                    href="mailto:hello@malaysianai.org"
                    className="inline-flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                  >
                    Request intro
                  </a>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 text-xs uppercase tracking-[0.3em] text-foreground/50">
            Community partners featured on the Malaysian AI landing page.
          </p>
        </section>

        <section className="mx-auto mt-20 w-full max-w-[1240px] px-6 md:px-10 lg:px-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] items-center rounded-[2.5rem] border border-border bg-card px-8 py-12 md:px-12">
            <div className="space-y-5">
              <p className="label-default text-foreground/60">Start a chapter</p>
              <h2 className="section-title text-foreground">
                Launch a local circle with Malaysian AI support.
              </h2>
              <p className="body-default text-foreground/70 max-w-xl">
                We provide facilitator playbooks, speaker matchmaking, and access to resident
                mentors. Bring the community, we&apos;ll help you scale it.
              </p>
              <div className="flex flex-wrap gap-4">
                <CTAButton
                  href="mailto:hello@malaysianai.org"
                  variant="secondary"
                  size="lg"
                  showArrow
                  isExternal={false}
                >
                  Start a chapter
                </CTAButton>
                <CTAButton href="/book-demo" variant="outline" size="lg" showArrow={false} isExternal={false}>
                  Apply to the residency
                </CTAButton>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Host playbooks",
                  description: "Run build nights, office hours, or research salons with proven templates.",
                },
                {
                  title: "Speaker pipeline",
                  description: "Tap into our mentor network for firesides, workshops, and AMAs.",
                },
                {
                  title: "Project matching",
                  description: "Pair member ideas with local partners and residency demo days.",
                },
                {
                  title: "Community fund",
                  description: "Micro-grants for venue, logistics, and experimentation costs.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-border/70 bg-background/70 p-5"
                >
                  <h3 className="text-base font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CommunityDirectory;
