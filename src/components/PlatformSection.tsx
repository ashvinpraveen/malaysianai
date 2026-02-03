const PlatformSection = () => {
  return (
    <section className="py-24 md:py-36 bg-background">
      <div className="mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px]">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="label-default text-foreground/60 uppercase tracking-widest mb-4">
              Platform
            </p>
            <h2 className="section-title text-foreground mb-6">Resources that keep you focused</h2>
            <p className="body-default text-foreground/70 max-w-xl">
              Access playbooks, templates, and metrics dashboards to guide your
              build through the residency.
            </p>
          </div>
          <div className="rounded-2xl border border-dashed border-border bg-muted h-72" />
        </div>
      </div>
    </section>
  );
};

export default PlatformSection;
