const AgentOSSection = () => {
  return (
    <section className="py-24 md:py-36 bg-background">
      <div className="mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          <div className="lg:w-1/2">
            <p className="label-default text-foreground/60 uppercase tracking-widest mb-4">
              Residency operating model
            </p>
            <h2 className="section-title text-foreground mb-6">A repeatable system to ship</h2>
            <p className="body-default text-foreground/70">
              The residency provides a clear cadence of sprints, reviews, and
              partner checkpoints to keep teams moving.
            </p>
          </div>
          <div className="lg:w-1/2 rounded-2xl border border-dashed border-border bg-muted h-80" />
        </div>
      </div>
    </section>
  );
};

export default AgentOSSection;
