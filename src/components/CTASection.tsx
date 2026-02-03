import { MainCTAButton } from "./MainCTAButton";

const tags = [
  "Ship daily",
  "Build in public",
  "Malaysia-first",
  "500 Social House",
  "Founders",
  "Builders",
  "Hackers",
  "Residency",
];

const CTASection = () => {
  return (
    <section id="contact" className="relative overflow-hidden bg-dark-teal">
      <div className="absolute inset-0 bg-dark-teal" />

      <div className="relative z-10 py-32 md:py-40">
        <div className="mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px]">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.1] text-cream mb-8"
              style={{ textWrap: "balance" }}
            >
              Join us now.
            </h2>
            <p className="text-base md:text-lg font-light leading-relaxed text-cream/70 max-w-2xl mx-auto mb-12">
              Malaysia&apos;s first AI residency. Where it all starts.
            </p>
            <MainCTAButton href="/book-demo" variant="white" size="lg" showArrow isExternal={false}>
              Apply now
            </MainCTAButton>
          </div>
        </div>

        <div className="space-y-5 mt-8">
          <div className="overflow-hidden relative w-full">
          <div className="flex flex-wrap justify-center gap-3 px-6">
            {tags.map((tag) => (
              <div
                key={tag}
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-cream/[0.08] backdrop-blur-sm border border-cream/10"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cream/60" />
                <span className="text-sm font-light text-cream/70 whitespace-nowrap">
                  {tag}
                </span>
              </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
