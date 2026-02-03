const communityPartners = [
  "Build Club",
  "Build with AI",
  "AI Tinkerers",
  "AI Hackerdorm",
  "AI SEA",
  "Rakan Tutor",
];

const LandingNetworkSection = () => {
  return (
    <section id="community" className="py-20 md:py-28 bg-background">
      <div className="mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px]">
        <div className="mb-12">
          <p className="label-default text-foreground/60 uppercase tracking-widest mb-3">
            Network
          </p>
          <h2 className="section-title text-foreground max-w-3xl" style={{ textWrap: "balance" }}>
            Community-backed and globally minded.
          </h2>
          <p className="body-default text-foreground/70 mt-4 max-w-2xl">
            The residency is anchored by local builders and operators with global reach.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <h3 className="text-lg font-semibold text-foreground mb-3">Community Partners</h3>
            <div className="flex flex-wrap gap-2">
              {communityPartners.map((partner) => (
                <span
                  key={partner}
                  className="px-3 py-1.5 rounded-full border border-border bg-muted text-xs text-foreground/70"
                >
                  {partner}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <h3 className="text-lg font-semibold text-foreground mb-3">Sponsored by</h3>
            <p className="text-2xl font-normal text-foreground">500 Global</p>
            <p className="text-sm text-foreground/60 mt-2">
              Backed by operators and investors who know how to launch globally.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <h3 className="text-lg font-semibold text-foreground mb-3">Located at</h3>
            <p className="text-2xl font-normal text-foreground">AICB</p>
            <p className="text-sm text-foreground/60 mt-2">
              AICB - AI Community Builders, the hub for Malaysia&apos;s AI builders.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingNetworkSection;
