const residents = [
  "ReplyrAI",
  "CleveAI",
  "Robin",
  "DocuAsk",
  "Blue Bolt Labs",
  "EasyBuzz",
  "Stealth Startup",
];

const LandingResidentsTickerSection = () => {
  const tickerItems = [...residents, ...residents];

  return (
    <section id="residents" className="py-20 md:py-28 bg-muted overflow-hidden">
      <div className="mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="label-default text-foreground/60 uppercase tracking-widest mb-3">
              Current residents
            </p>
            <h2 className="section-title text-foreground">Current residents</h2>
            <p className="body-default text-foreground/70 mt-3 max-w-xl">
              A snapshot of the builders shipping right now.
            </p>
          </div>
          <a
            href="/residents"
            className="text-sm uppercase tracking-[0.3em] text-foreground/70 hover:text-foreground transition-colors"
          >
            View all residents
          </a>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="flex w-max min-w-full whitespace-nowrap gap-6 animate-scroll-left px-6 md:px-10 lg:px-16">
          {tickerItems.map((name, index) => (
            <div
              key={`${name}-${index}`}
              className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-border bg-background text-foreground/80"
            >
              <span className="w-2 h-2 rounded-full bg-foreground/60" />
              <span className="text-sm">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingResidentsTickerSection;
