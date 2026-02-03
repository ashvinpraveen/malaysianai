const benefits = [
  {
    title: "Learn from like-minded builders",
    description: "Weekly show-and-tells. Be surrounded by people tinkering with the same things you are.",
  },
  {
    title: "Coworking space for serious builders",
    description: "It's like having colleagues while everyone independently builds their own thing.",
  },
  {
    title: "Get support across the stack",
    description: "Technical, fundraising, product, GTM, and content support from peers and mentors.",
  },
];

const LandingBenefitsSection = () => {
  return (
    <section id="program" className="pt-28 md:pt-36 pb-16 md:pb-20 bg-background">
      <div className="mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px]">
        <div className="mb-16 md:mb-20">
          <p className="label-default text-foreground/60 uppercase tracking-widest mb-3">
            Residency
          </p>
          <h2 className="section-title text-foreground max-w-3xl" style={{ textWrap: "balance" }}>
            Go all-in with a cohort that ships.
          </h2>
          <p className="body-default text-foreground/70 mt-4 max-w-2xl">
            Weekly show-and-tells, focused coworking, and support across the stack to
            help you ship faster and launch globally.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="relative overflow-hidden rounded-2xl border border-dashed border-border p-6 md:p-8 flex flex-col bg-card"
            >
              <div className="h-32 rounded-xl bg-muted border border-border mb-6" />
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
                    className="h-2 w-10 rounded-full bg-border/60"
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

export default LandingBenefitsSection;
