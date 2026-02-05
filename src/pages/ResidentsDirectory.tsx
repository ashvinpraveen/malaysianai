import { useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CTAButton } from "@/components/CTAButton";
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
    <div className="min-h-screen bg-[#f7f2e8] flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow">
        <section className="relative overflow-hidden pt-28 pb-12">
          <div className="mx-auto w-full max-w-[1240px] px-6 md:px-10 lg:px-16">
            <div className="max-w-3xl space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-foreground">
                Residents directory
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

        <section className="mx-auto w-full max-w-[1240px] px-6 pb-20 md:px-10 lg:px-16">
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
                  className="w-full rounded-full border border-foreground/10 bg-white py-3 pl-11 pr-4 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
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
                  className="group relative flex h-full flex-col justify-between rounded-[2rem] border border-border bg-white p-6 transition-colors duration-300 hover:border-foreground/30"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-16 w-16 items-center justify-center">
                        <ResidentMark resident={resident} />
                      </div>
                    </div>

                    <h3 className="mt-7 text-2xl font-medium text-foreground">
                      {resident.name}
                    </h3>
                    <p className="mt-3 text-sm text-foreground/70 leading-relaxed">
                      {resident.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {[resident.focus, ...resident.tags].map((tag) => (
                        <span
                          key={`${resident.name}-${tag}`}
                          className="rounded-full border border-foreground/10 bg-white px-3 py-1 text-xs text-foreground/60"
                        >
                          {tag}
                        </span>
                      ))}
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

        <section className="mx-auto w-full max-w-[1240px] px-6 pb-24 md:px-10 lg:px-16">
          <div className="rounded-[2.5rem] border border-border bg-white px-8 py-12 md:px-12">
            <h2 className="text-3xl md:text-4xl font-medium text-foreground">
              Apply to the residency
            </h2>
            <p className="mt-3 text-sm text-foreground/70">
              Join the cohort or partner with residents to pilot and ship applied AI products.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <CTAButton href="/book-demo" variant="primary" size="lg" showArrow isExternal={false}>
                Apply for residency
              </CTAButton>
              <CTAButton href="/company" variant="secondary" size="lg" showArrow isExternal={false}>
                Partner with residents
              </CTAButton>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ResidentsDirectory;
