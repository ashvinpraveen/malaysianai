const supportAreas = ["Technical", "Fundraising", "Product", "GTM", "Content"];

const LandingSupportSection = () => {
  return (
    <section id="support" className="py-20 md:py-28 bg-muted">
      <div className="mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
          <div className="max-w-2xl">
            <p className="label-default text-foreground/60 uppercase tracking-widest mb-3">
              Support
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.1] text-foreground">
              Get support across the stack.
            </h2>
            <p className="body-default text-foreground/70 mt-4">
              We&apos;re all in the same boat. Learn from peers and mentors at the residency
              as you ship.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 max-w-xl">
            {supportAreas.map((area) => (
              <span
                key={area}
                className="px-4 py-2 rounded-full border border-border bg-card text-sm text-foreground/80"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingSupportSection;
