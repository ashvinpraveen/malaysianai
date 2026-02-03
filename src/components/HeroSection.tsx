import { MainCTAButton } from "./MainCTAButton";

const HeroSection = () => {
  return (
    <section className="relative h-[calc(100vh-78px)] flex flex-col overflow-hidden rounded-2xl bg-cream border border-dark-teal/20">

      <div className="relative z-10 flex-1 flex flex-col justify-center items-center mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px] w-full pt-32 pb-20 text-center">
        <div className="max-w-4xl">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="rounded-full bg-cream-dark border border-dark-teal/15 px-4 py-2">
              <p className="text-xs md:text-sm text-foreground/70 tracking-[0.3em] uppercase">
                Powered by The Global Social House
              </p>
            </div>
          </div>

          <h1 className="hero-title text-foreground mb-6">
            Ship daily. Scale infinitely. At the residency.
          </h1>
          <p className="text-base md:text-xl font-normal leading-relaxed text-foreground/70 max-w-2xl mx-auto">
            An experimental AI residency connecting Malaysia&apos;s ambitious and
            innovative builders. Based at 500 Social House, we offer premium
            co-working with peers who aim to ship AI products that matter.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <MainCTAButton href="/book-demo" variant="primary" size="lg" showArrow isExternal={false}>
              Apply for the next cohort
            </MainCTAButton>
            <MainCTAButton href="/#curriculum" variant="outline" size="lg" showArrow={false} isExternal={false}>
              View curriculum
            </MainCTAButton>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <div className="mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px] py-6 pb-8 md:pb-16">
          <div className="grid grid-cols-2 md:flex md:items-center md:justify-center w-full gap-6 md:gap-10 lg:gap-16">
            {[
              { value: "Build faster", label: "Momentum" },
              { value: "Ship daily", label: "Cadence" },
              { value: "Grow exponentially", label: "Growth" },
              { value: "Build in public", label: "Community" },
            ].map((metric) => (
              <div key={metric.label} className="text-center">
                <p className="text-xl md:text-2xl font-normal text-foreground tracking-tight whitespace-nowrap">
                  {metric.value}
                </p>
                <p className="text-[10px] text-foreground/60 tracking-[0.3em] uppercase mt-1">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
