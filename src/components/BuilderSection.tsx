const features = [
  {
    title: "Prototype & validate",
    description: "Turn your brief into a working prototype with clear user feedback loops.",
  },
  {
    title: "Pilot with partners",
    description: "Run real-world pilots with data access and partner checkpoints.",
  },
  {
    title: "Tell the story",
    description: "Measure impact, refine positioning, and prepare for demo day.",
  },
];

const BuilderSection = () => {
  return (
    <section id="studio" className="py-24 md:py-36 bg-cream-dark overflow-hidden relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="label-default text-foreground/60 uppercase tracking-widest mb-4">
            Studio
          </p>
          <h2 className="section-title text-foreground mb-6">
            The project studio for your residency build.
          </h2>
          <p className="body-default text-foreground/70 max-w-2xl mx-auto">
            Everything you need to move from concept to pilot, with clear rituals
            and feedback built in.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="elevated-card rounded-3xl p-6 flex flex-col bg-cream backdrop-blur-sm"
            >
              <div className="aspect-[4/3] w-full mb-6 rounded-2xl p-6 flex items-center justify-center relative overflow-hidden border border-dark-teal/15 bg-cream">
                <div className="absolute inset-0 bg-gradient-to-br from-cream via-cream to-cream-dark" />
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <div className="h-20 w-20 rounded-2xl border border-dark-teal/15 bg-cream-dark" />
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
