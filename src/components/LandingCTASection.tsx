import { MainCTAButton } from "./MainCTAButton";

const LandingCTASection = () => {
  return (
    <section id="contact" className="relative overflow-hidden bg-foreground">
      <div className="absolute inset-0 bg-foreground" />

      <div className="relative z-10 py-28 md:py-36">
        <div className="mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px] text-center">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.1] text-background mb-6"
            style={{ textWrap: "balance" }}
          >
            Make insane progress.
          </h2>
          <p className="text-base md:text-lg font-light leading-relaxed text-background/70 max-w-2xl mx-auto mb-10">
            Build in Malaysia with a cohort that ships, then launch to the world.
          </p>
          <MainCTAButton href="/book-demo" variant="white" size="lg" showArrow isExternal={false}>
            Apply for the next cohort
          </MainCTAButton>
        </div>
      </div>
    </section>
  );
};

export default LandingCTASection;
