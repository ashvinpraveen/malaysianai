const FeaturesSection = () => {
  return (
    <section className="py-24 md:py-36 bg-cream">
      <div className="mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px]">
        <div className="mb-12">
          <p className="label-default text-foreground/60 uppercase tracking-widest mb-4">
            Features
          </p>
          <h2 className="section-title text-foreground">Residency highlights</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={`feature-${index}`}
              className="rounded-2xl border border-dark-teal/15 bg-cream-dark p-6"
            >
              <div className="h-10 w-10 rounded-xl bg-cream border border-dark-teal/15 mb-4" />
              <div className="h-4 w-40 bg-dark-teal/10 rounded-full mb-3" />
              <div className="h-3 w-full bg-dark-teal/5 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
