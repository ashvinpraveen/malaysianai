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
        <section className="relative overflow-hidden pt-28">
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

        <section className="mx-auto mt-16 pb-24 w-full max-w-[1240px] px-6 md:px-10 lg:px-16">
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

      </main>

      <Footer />
    </div>
  );
};

export default CommunityDirectory;
