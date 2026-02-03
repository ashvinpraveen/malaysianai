import { MainCTAButton } from "./MainCTAButton";

const LandingHeroSection = () => {
  return (
    <section className="relative h-[calc(100vh-78px)] flex flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-[#0b1d17] via-[#0f2a2b] to-[#103a4a] border border-border text-white">
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px] w-full pt-32 pb-20 text-center">
        <div className="max-w-4xl">
          <h1 className="hero-title text-white mb-6">
            Build in Malaysia. Ship for the world.
          </h1>
          <p className="text-base md:text-xl font-normal leading-relaxed text-white/70 max-w-2xl mx-auto">
            A residency for Malaysia&apos;s AI-native builders to go all-in, make insane
            progress and launch globally.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <MainCTAButton href="/book-demo" variant="white" size="lg" showArrow isExternal={false}>
              Apply for the next cohort
            </MainCTAButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingHeroSection;
