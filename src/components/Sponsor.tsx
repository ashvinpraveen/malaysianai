const Sponsor = () => {
  return (
    <section id="sponsor" className="bg-background py-12 md:py-16">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 items-center gap-6 rounded-[1.75rem] border border-foreground/10 border-l-4 border-l-[#ffdc67] bg-background px-6 py-7 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] md:gap-12 md:px-10">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-foreground/55">Made possible by</p>
            <a
              href="https://500.co"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-2xl bg-background px-5 py-4 shadow-sm transition-transform hover:-translate-y-0.5"
            >
              <img
                src="/500_Global_Logo.svg"
                alt="500 Global"
                className="h-9 w-auto md:h-11"
              />
            </a>
          </div>
          <div className="max-w-2xl">
            <p className="text-sm leading-relaxed text-foreground/70 md:text-base">
              <a
                href="https://500.co"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-foreground underline underline-offset-4 transition-colors hover:text-foreground/70"
              >
                500 Global
              </a>{" "}
              backs early-stage founders across the world and hosts the Malaysian AI Residency in Kuala Lumpur.
              That means a real place to gather, make things, and meet people who are in it with you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsor;
