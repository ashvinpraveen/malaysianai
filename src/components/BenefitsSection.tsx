const benefits = [
  {
    title: "Based at 500 Social House",
    description: "Premium co-working space with ambitious peers shipping every day.",
  },
  {
    title: "Builders helping builders",
    description: "Share wins, debug together, and grow with fellow residents.",
  },
  {
    title: "For technical founders",
    description: "We back builders creating with AI and shipping real products.",
  },
];

const BenefitsSection = () => {
  return (
    <section id="program" className="pt-32 md:pt-40 pb-16 md:pb-20 bg-cream">
      <div className="mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px]">
        <div className="mb-16 md:mb-20">
          <p className="label-default text-foreground/60 uppercase tracking-widest mb-3">
            About
          </p>
          <h2 className="section-title text-foreground max-w-3xl" style={{ textWrap: "balance" }}>
            Malaysia&apos;s premier AI residency.
          </h2>
          <p className="body-default text-foreground/70 mt-4 max-w-2xl">
            We connect Malaysia&apos;s most ambitious builders and support them with
            space, community, and momentum to ship AI products that matter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="relative overflow-hidden rounded-2xl border border-dashed border-dark-teal/20 p-6 md:p-8 flex flex-col bg-cream-dark"
            >
              <div className="h-32 rounded-xl bg-cream border border-dark-teal/15 mb-6" />
              <h3 className="text-2xl md:text-3xl font-normal tracking-tight leading-[1.1] text-foreground mb-4">
                {benefit.title}
              </h3>
              <p className="text-sm md:text-base font-light leading-relaxed text-foreground/70">
                {benefit.description}
              </p>
              <div className="mt-6 flex gap-2">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <span
                    key={`${index}-tag-${idx}`}
                    className="h-2 w-10 rounded-full bg-dark-teal/10"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
