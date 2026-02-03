import { MainCTAButton } from "./MainCTAButton";

const demoCards = [
  {
    title: "Partner pilot",
    subtitle: "Industry collaboration",
    items: ["Problem framing", "Pilot metrics", "Deployment plan"],
    duration: "6 weeks",
  },
  {
    title: "Resident showcase",
    subtitle: "Product build",
    items: ["MVP walkthrough", "User feedback", "Go-to-market"],
    duration: "8 weeks",
  },
  {
    title: "Research demo",
    subtitle: "Applied research",
    items: ["Method overview", "Results", "Next experiment"],
    duration: "10 weeks",
  },
];

const DemoSection = () => {
  return (
    <section id="showcase" className="py-16 md:py-20 bg-background min-h-screen flex flex-col justify-center">
      <div className="mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px]">
        <div className="mb-10 md:mb-12">
          <p className="label-default text-foreground/60 uppercase tracking-widest mb-4">
            Showcase
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.1] text-foreground max-w-2xl"
              style={{ textWrap: "balance" }}
            >
              A residency that ends with a demo day.
            </h2>
            <p className="body-large text-foreground/60 max-w-md lg:pb-2">
              Each team ships a working product and shares the story with partners,
              investors, and the community.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {demoCards.map((demo) => (
            <div
              key={demo.title}
              className="group rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-lg overflow-hidden"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-muted border-b border-border" />

              <div className="p-5">
                <div className="mb-4">
                  <h3 className="text-xl md:text-2xl font-normal tracking-tight text-foreground">
                    {demo.title}
                  </h3>
                  <p className="text-sm text-foreground/60 mt-1">{demo.subtitle}</p>
                </div>

                <ul className="mb-6 space-y-2">
                  {demo.items.map((item) => (
                    <li key={item} className="text-xs font-light leading-relaxed text-foreground/70 flex items-start gap-2">
                      <span className="text-foreground/40 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="w-full flex items-center gap-3 py-3 px-4 rounded-xl bg-background border border-border">
                  <div className="w-9 h-9 rounded-full bg-foreground flex items-center justify-center flex-shrink-0">
                    <div className="w-3 h-3 rounded-sm bg-background" />
                  </div>
                  <div className="flex-1">
                    <div className="h-2 w-full bg-border rounded-full" />
                  </div>
                  <span className="text-xs text-foreground/60 font-light flex-shrink-0">
                    {demo.duration}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-6 pt-12 border-t border-border">
          <p className="text-base font-light text-foreground/60">
            Ready to present your work and keep building after the residency?
          </p>
          <MainCTAButton href="/book-demo" variant="primary" size="lg" isExternal={false}>
            Apply to join the cohort
          </MainCTAButton>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
