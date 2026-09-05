import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CTAButton } from "@/components/CTAButton";
import { communityPartners } from "@/data/communityPartners";
import { ArrowUpRight } from "lucide-react";

const LUMA_EVENTS_URL = "https://luma.com/malaysianai";
const ADD_COMMUNITY_HREF =
  "/contact?subject=" + encodeURIComponent("Add my community to the directory");

const stats = [
  { label: "Builders learning AI", value: "10,000+" },
  { label: "Events run in 2024-2025", value: "30+" },
  { label: "Communities listed", value: String(communityPartners.length) },
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
                Malaysia&apos;s AI Communities and Events
              </h1>
              <p className="text-lg md:text-xl text-foreground/70 leading-relaxed">
                A living directory of AI communities across Malaysia — meetups, builder groups,
                student chapters, and everyone in between. Join an event, find your people, or add
                yours to the list.
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <CTAButton href={LUMA_EVENTS_URL} variant="primary" size="lg" showArrow>
                  View upcoming events
                </CTAButton>
                <CTAButton
                  href={ADD_COMMUNITY_HREF}
                  variant="outline"
                  size="lg"
                  showArrow
                  isExternal={false}
                >
                  Add your community
                </CTAButton>
              </div>
              <div className="flex flex-wrap gap-10 pt-4">
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

        <section className="mx-auto mt-16 pb-16 w-full max-w-[1240px] px-6 md:px-10 lg:px-16">
          <div className="mb-8 max-w-2xl">
            <h2 className="text-2xl md:text-3xl text-foreground">Communities</h2>
            <p className="mt-2 text-foreground/70 leading-relaxed">
              These groups run events and bring builders together. This list grows as more
              communities join — if you organise one, we want you here.
            </p>
          </div>
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
                      <p className="text-sm text-foreground/60">Community</p>
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

        <section className="mx-auto pb-24 w-full max-w-[1240px] px-6 md:px-10 lg:px-16">
          <div className="rounded-[2rem] border border-border bg-white px-6 py-10 md:px-10 md:py-12">
            <div className="max-w-2xl space-y-4">
              <h2 className="text-2xl md:text-3xl text-foreground">
                Run a community? Get listed.
              </h2>
              <p className="text-foreground/70 leading-relaxed">
                We&apos;re building this into a shared map of Malaysia&apos;s AI scene — not just
                our partners. If you host meetups, workshops, guilds, or builder nights, send us
                your details and we&apos;ll add you.
              </p>
              <CTAButton
                href={ADD_COMMUNITY_HREF}
                variant="primary"
                size="lg"
                showArrow
                isExternal={false}
              >
                Submit your community
              </CTAButton>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CommunityDirectory;
