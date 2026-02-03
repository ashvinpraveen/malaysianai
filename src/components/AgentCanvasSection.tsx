const AgentCanvasSection = () => {
  return (
    <section className="py-24 md:py-36 bg-foreground text-background">
      <div className="mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px]">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="label-default text-background/60 uppercase tracking-widest mb-4">
              Residency workspace
            </p>
            <h2 className="section-title text-background mb-6">A shared canvas for your build</h2>
            <p className="body-default text-background/70 max-w-xl">
              Use the residency workspace to align on problems, track milestones,
              and document progress with mentors.
            </p>
          </div>
          <div className="rounded-2xl border border-dashed border-background/20 bg-background/5 h-72" />
        </div>
      </div>
    </section>
  );
};

export default AgentCanvasSection;
