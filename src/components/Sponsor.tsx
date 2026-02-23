const Sponsor = () => {
  return (
    <section id="sponsor" className="py-20 md:py-28 bg-background">
      <div className="mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px]">
        <div className="flex flex-col md:grid md:grid-cols-[minmax(0,360px)_minmax(0,1fr)] md:items-start md:gap-16 gap-8">
          <div>
            <p className="label-default text-foreground/60 mb-6">Host &amp; Initiator</p>
            <a
              href="https://500.co"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transition-opacity hover:opacity-80"
            >
              <img
                src="/500_Global_Logo.svg"
                alt="500 Global"
                className="h-12 md:h-16 w-auto"
              />
            </a>
          </div>
          <div className="max-w-xl">
            <p className="body-default text-foreground/70">
              <a
                href="https://500.co"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-foreground transition-colors"
              >
                500 Global
              </a>{" "}
              is a venture capital firm backing AI-native companies and the founders building on
              frontier models. As the host and initiator of the Malaysian AI Residency, they
              provide the permanent space, capital, networks, and global reach that gives
              Malaysia&apos;s best builders an unfair advantage.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsor;
