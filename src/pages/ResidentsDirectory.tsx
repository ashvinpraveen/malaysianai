import { useMemo, useState } from "react";
import { ArrowUpRight, MapPin, Search, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CTAButton } from "@/components/CTAButton";
import { cn } from "@/lib/utils";
import { residents, type Resident } from "@/lib/residents";

const ResidentMark = ({ resident }: { resident: Resident }) => {
  if (resident.component) {
    const Component = resident.component;
    return <Component className="h-full w-full text-foreground" />;
  }

  if (resident.image) {
    return (
      <img
        alt={resident.name}
        className="h-full w-full object-contain"
        loading="lazy"
        src={resident.image}
      />
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-foreground/70">
      {resident.name.slice(0, 2).toUpperCase()}
    </div>
  );
};

const ResidentsDirectory = () => {
  const [query, setQuery] = useState("");

  const filteredResidents = useMemo(() => {
    return residents.filter((resident) => {
      const searchTarget = `${resident.name} ${resident.description} ${resident.tags.join(" ")}`.toLowerCase();
      const matchesQuery = searchTarget.includes(query.trim().toLowerCase());
      return matchesQuery;
    });
  }, [query]);

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow">
        <section className="relative overflow-hidden pt-32 pb-16">
          <div className="absolute inset-0">
            <div className="absolute -top-40 right-0 h-80 w-80 rounded-full bg-foreground/10 blur-[120px]" />
            <div className="absolute -bottom-32 left-10 h-72 w-72 rounded-full bg-primary/10 blur-[110px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(9,45,51,0.16),transparent_65%),radial-gradient(circle_at_20%_90%,rgba(177,123,46,0.22),transparent_55%)]" />
          </div>

          <div className="relative z-10 container mx-auto px-6">
            <div className="max-w-3xl space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-foreground/70">
                Residents Directory
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-foreground">
                The builders shipping Malaysia&apos;s next wave of applied AI.
              </h1>
              <p className="text-lg md:text-xl text-foreground/70 leading-relaxed">
                Explore the current cohort, discover what they&apos;re building, and connect with
                the teams shaping the local AI ecosystem.
              </p>
              <div className="flex flex-wrap gap-4">
                <CTAButton href="/book-demo" variant="primary" size="lg" showArrow isExternal={false}>
                  Apply for residency
                </CTAButton>
                <CTAButton href="/company" variant="secondary" size="lg" showArrow isExternal={false}>
                  Partner with residents
                </CTAButton>
              </div>
            </div>

          </div>
        </section>

        <section className="container mx-auto px-6 pb-20">
          <div className="mt-10 mb-12 flex justify-center">
            <div className="w-full max-w-md">
              <label className="sr-only" htmlFor="resident-search">
                Search residents
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/50" />
                <input
                  id="resident-search"
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search by name, focus, or tag"
                  className="w-full rounded-full border border-foreground/10 bg-background/80 py-3 pl-11 pr-4 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
                />
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredResidents.map((resident) => {
              const Wrapper = resident.href ? "a" : "div";
              const wrapperProps = resident.href
                ? { href: resident.href, target: "_blank", rel: "noopener noreferrer" }
                : {};
              return (
                <Wrapper
                  key={resident.name}
                  {...wrapperProps}
                  className="group relative flex h-full flex-col justify-between rounded-[2rem] border border-border bg-card p-6 transition-colors duration-300 hover:border-foreground/30 hover:ring-1 hover:ring-foreground/20"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-foreground/10 bg-background">
                        <ResidentMark resident={resident} />
                      </div>
                      <span
                        className={cn(
                          "rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em]",
                          resident.status === "Stealth"
                            ? "bg-foreground text-background"
                            : "bg-foreground/10 text-foreground/70"
                        )}
                      >
                        {resident.status}
                      </span>
                    </div>

                    <h3 className="mt-6 text-2xl font-medium text-foreground">
                      {resident.name}
                    </h3>
                    <p className="mt-3 text-sm text-foreground/70 leading-relaxed">
                      {resident.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {[resident.focus, ...resident.tags].map((tag) => (
                        <span
                          key={`${resident.name}-${tag}`}
                          className="rounded-full border border-foreground/10 bg-background/70 px-3 py-1 text-xs text-foreground/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between text-xs text-foreground/60">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5" />
                      {resident.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-3.5 w-3.5" />
                      {resident.cohort}
                    </div>
                  </div>

                  {resident.href && (
                    <div className="mt-4 flex items-center gap-2 text-sm font-medium text-foreground/70 transition-colors group-hover:text-foreground">
                      Visit site
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  )}
                </Wrapper>
              );
            })}
          </div>
        </section>

        <section className="container mx-auto px-6 pb-24">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2.5rem] border border-border bg-background/80 p-8 md:p-12">
              <p className="label-default text-foreground/60 mb-4">Residency signals</p>
              <h2 className="subsection-title text-foreground">
                What it means to be listed in the directory
              </h2>
              <p className="body-default text-foreground/70 mt-4">
                Residents are active participants in the program, meet weekly with mentors, and
                ship their product milestones in public demos.
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {[
                  {
                    title: "Weekly shipping cadence",
                    detail: "Teams commit to a published roadmap and deliver every sprint.",
                  },
                  {
                    title: "Partner feedback loops",
                    detail: "Resident partners review pilots in the field and unblock adoption.",
                  },
                  {
                    title: "Responsible AI playbooks",
                    detail: "Every product documents data sources, risk, and mitigation.",
                  },
                  {
                    title: "Cohort collaboration",
                    detail: "Residents share learnings, code, and infra across squads.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-foreground/10 bg-card/80 p-5"
                  >
                    <h3 className="text-lg font-medium text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm text-foreground/70 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-foreground/10 bg-foreground p-8 md:p-12 text-background">
              <div className="flex items-center gap-3 text-background/70 text-xs font-semibold uppercase tracking-[0.3em]">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-background/60" />
                Directory highlights
              </div>
              <h3 className="mt-4 text-3xl font-medium">Feature your team</h3>
              <p className="mt-4 text-sm text-background/70 leading-relaxed">
                If you are a resident, we can add milestones, press, and demo reels to your card.
                Partners can request warm introductions through the program team.
              </p>
              <div className="mt-8 flex flex-col gap-4">
                {[
                  "Resident demo day access",
                  "Partner matchmaking",
                  "Cohort storytelling support",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-background/80">
                    <span className="h-2 w-2 rounded-full bg-background" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <CTAButton href="/book-demo" variant="white" size="lg" showArrow isExternal={false}>
                  Apply or nominate
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

export default ResidentsDirectory;
