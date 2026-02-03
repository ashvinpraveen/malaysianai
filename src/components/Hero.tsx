import { CTAButton } from "./CTAButton";

const Hero = () => {
  return (
    <section className="relative h-[calc(100vh-78px)] flex flex-col overflow-hidden rounded-2xl border border-border text-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/batik-paddy-clean.png"
          alt="Sharp, text-free Malaysian paddy fields in Batik style"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 bg-gradient-to-t from-black/60 via-black/20 to-black/30" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center items-center mx-auto bg-transparent px-6 md:px-10 lg:px-16 max-w-[1440px] w-full pt-32 pb-20 text-center">
        <div className="max-w-4xl">
          <h1 className="hero-title text-white mb-6 drop-shadow-lg">
            Build in Malaysia. Ship for the world.
          </h1>
          <p className="text-base md:text-xl font-normal leading-relaxed text-white/90 max-w-2xl mx-auto drop-shadow-md">
            A residency for Malaysia&apos;s AI-native builders to go all-in, make insane
            progress and launch globally.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <CTAButton href="/book-demo" variant="white" size="lg" showArrow isExternal={false}>
              Apply for the next cohort
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
