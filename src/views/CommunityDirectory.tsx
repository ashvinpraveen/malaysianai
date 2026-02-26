import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CTAButton } from "@/components/CTAButton";
import { communityPartners } from "@/data/communityPartners";
import {
  ArrowUpRight,
} from "lucide-react";

const stats = [
  { label: "Builders learning AI", value: "10,000" },
  { label: "Events run in 2024-2025", value: "30" },
  { label: "Partner organizations", value: "8" },
];

const CommunityDirectory = () => {
  return (
    <div className="min-h-screen bg-[#f7f2e8] text-foreground flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <section className="relative overflow-hidden pt-28 pb-12">
          <div className="mx-auto w-full max-w-[1240px] px-6 md:px-10 lg:px-16">
            <div className="max-w-3xl space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-foreground">
                Find your tribe.
              </h1>
              <p className="text-lg md:text-xl text-foreground/70 leading-relaxed">
                There&apos;s a community for everyone — from total beginners to developers going deep into AI.
                Join events, meet like-minded people, and start building. Many are free and very friendly.
              </p>
              <div className="flex flex-wrap gap-10 pt-2">
                {stats.map((stat) => (
                  <div key={stat.label} className="min-w-[160px]">
                    <div className="text-3xl md:text-4xl font-semibold text-foreground">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-sm text-foreground/60">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-16 w-full max-w-[1240px] px-6 md:px-10 lg:px-16">
          <div className="grid gap-6 md:grid-cols-2">
            {communityPartners.map((partner) => {
              const Wrapper = partner.href ? "a" : "div";
              const wrapperProps = partner.href
                ? { href: partner.href, target: "_blank", rel: "noopener noreferrer" }
                : {};
              return (
              <Wrapper
                key={partner.name}
                {...wrapperProps}
                className="group relative flex h-full flex-col justify-between rounded-[2rem] border border-border bg-white p-6 md:p-8 transition-colors duration-300 hover:border-foreground/30"
              >
                <div className="space-y-6">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="h-14 md:h-16 w-auto max-w-[220px] object-contain opacity-90"
                    loading="lazy"
                  />
                  <div>
                    <h3 className="text-2xl font-medium text-foreground">{partner.name}</h3>
                    <p className="text-sm text-foreground/60">Community partner</p>
                  </div>
                </div>

                <p className="mt-4 text-sm text-foreground/70 leading-relaxed">
                  {partner.summary}
                </p>

                {partner.href && (
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground/70 transition-colors group-hover:text-foreground">
                    Visit website
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                )}
              </Wrapper>
            );
            })}
          </div>
        </section>

        <section className="mx-auto mt-20 w-full max-w-[1240px] px-6 pb-24 md:px-10 lg:px-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] items-center rounded-[2.5rem] border border-border bg-card px-8 py-12 md:px-12">
            <div className="space-y-5">
              <p className="text-sm text-foreground/60">Start a chapter</p>
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
                <CTAButton href="/residency/apply" variant="outline" size="lg" showArrow={false} isExternal={false}>
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
