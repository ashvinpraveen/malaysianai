const features = [
  {
    title: "Ship every week",
    description: "Set tight milestones and use show-and-tells to keep momentum.",
  },
  {
    title: "Pilot fast",
    description: "Get real user feedback and partner inputs to validate quickly.",
  },
  {
    title: "Launch globally",
    description: "Refine product, GTM, and story for a global audience.",
  },
];

const BuilderSection = () => {
  return (
    <section id="studio" className="py-24 md:py-36 bg-muted overflow-hidden relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="label-default text-foreground/60 uppercase tracking-widest mb-4">
            Build
          </p>
          <h2 className="section-title text-foreground mb-6">
            A build environment that makes progress inevitable.
          </h2>
          <p className="body-default text-foreground/70 max-w-2xl mx-auto">
            Focused coworking, clear rituals, and weekly accountability to help you
            move fast and ship real products.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="elevated-card rounded-3xl p-6 flex flex-col bg-card backdrop-blur-sm"
            >
              <div className="aspect-[4/3] w-full mb-6 rounded-2xl p-6 flex items-center justify-center relative overflow-hidden border border-border bg-background">
                <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted" />
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <div className="h-20 w-20 rounded-2xl border border-border bg-muted" />
                </div>
              </div>

              <div className="px-2 pb-2">
                <h3 className="card-title text-foreground mb-3 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuilderSection;
