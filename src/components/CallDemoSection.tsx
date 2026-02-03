const CallDemoSection = () => {
  return (
    <section className="py-24 md:py-36 bg-background">
      <div className="mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px]">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="label-default text-foreground/60 uppercase tracking-widest mb-4">
              Info session
            </p>
            <h2 className="section-title text-foreground mb-6">Join a residency info session</h2>
            <p className="body-default text-foreground/70">
              Learn about the cohort structure, partner briefs, and application steps.
            </p>
          </div>
          <div className="rounded-2xl border border-dashed border-border bg-muted h-72" />
        </div>
      </div>
    </section>
  );
};

export default CallDemoSection;
