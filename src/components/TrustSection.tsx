const pillars = [
  {
    title: "Responsible AI",
    description: "Ethics, safety, and governance are embedded in every sprint.",
  },
  {
    title: "Data stewardship",
    description: "Clear data agreements, privacy safeguards, and partner consent.",
  },
  {
    title: "Partner alignment",
    description: "Residency goals are tied to real partner needs and outcomes.",
  },
  {
    title: "Operational support",
    description: "Program staff help remove blockers so you can keep shipping.",
  },
];

const TrustSection = () => {
  return (
    <section className="py-24 md:py-36 bg-cream overflow-hidden">
      <div className="mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px]">
        <div className="mb-20">
          <p className="label-default text-foreground/60 uppercase tracking-widest mb-4">
            Support
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.1] text-foreground max-w-3xl"
            style={{ textWrap: "balance" }}
          >
            Built on trust, safety, and real-world impact.
          </h2>
          <p className="body-large text-foreground/60 mt-6 max-w-2xl">
            We prioritize responsible AI practices, strong partner alignment, and
            long-term outcomes for the Malaysian ecosystem.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-dark-teal/15">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="py-12 md:py-16 pb-16 md:pb-20 px-6 md:px-8 lg:px-12 border-b border-r border-dark-teal/15"
            >
              <div className="w-10 h-10 rounded-xl bg-cream-dark border border-dark-teal/15 mb-6" />
              <h3 className="text-xl md:text-2xl font-normal tracking-tight text-foreground mb-4">
                {pillar.title}
              </h3>
              <p className="text-sm md:text-base font-light leading-relaxed text-foreground/70">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
