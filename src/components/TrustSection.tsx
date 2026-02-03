const pillars = [
  {
    title: "Technical support",
    description: "Debug with peers, architecture reviews, and model or infra help.",
  },
  {
    title: "Product support",
    description: "User research, positioning, and product decision making.",
  },
  {
    title: "GTM support",
    description: "Messaging, distribution, and early sales motion.",
  },
  {
    title: "Fundraising support",
    description: "Pitch feedback, investor readiness, and warm intros.",
  },
  {
    title: "Content support",
    description: "Storytelling, launches, and community building.",
  },
];

const TrustSection = () => {
  return (
    <section className="py-24 md:py-36 bg-background overflow-hidden">
      <div className="mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px]">
        <div className="mb-20">
          <p className="label-default text-foreground/60 uppercase tracking-widest mb-4">
            Support
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.1] text-foreground max-w-3xl"
            style={{ textWrap: "balance" }}
          >
            Support that clears the path to launch.
          </h2>
          <p className="body-large text-foreground/60 mt-6 max-w-2xl">
            Technical, fundraising, product, GTM, and content support from peers and
            mentors at the residency.
          </p>
          <div className="mt-8 space-y-2 text-sm text-foreground/60">
            <p>
              <span className="font-semibold text-foreground">Community partners:</span>{" "}
              Build Club, Build with AI, AI Tinkerers, AI Hackerdorm, AI SEA, Rakan Tutor
            </p>
            <p>
              <span className="font-semibold text-foreground">Sponsored by:</span> 500 Global
            </p>
            <p>
              <span className="font-semibold text-foreground">Located at:</span> AICB - AI Community Builders
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-0 border-t border-l border-border">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="py-12 md:py-16 pb-16 md:pb-20 px-6 md:px-8 lg:px-12 border-b border-r border-border"
            >
              <div className="w-10 h-10 rounded-xl bg-muted border border-border mb-6" />
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
