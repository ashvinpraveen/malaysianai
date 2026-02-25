import { CTAButton } from "./CTAButton";

const CTA = () => {
  return (
    <section id="contact" className="relative overflow-hidden bg-background py-20 md:py-28">
      <div className="mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px]">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-background text-white">
          <div className="absolute inset-0 z-0">
            <img
              src="/batik-kinabalu-hero.png"
              alt="Mount Kinabalu in Batik style"
              className="w-full h-full object-cover opacity-100"
            />
            <div className="absolute inset-0 bg-black/55" />
          </div>
          <div className="relative z-10 py-20 md:py-28 text-center px-6 md:px-10">
            <h2
              className="section-title text-white mb-6"
              style={{ textWrap: "balance" }}
            >
              Join the residency
            </h2>
            <p className="mx-auto mb-8 max-w-3xl text-sm md:text-base text-white/80">
              Apply for the next cohort and build your AI startup surrounded by ambitious
              founders, mentors, and partners across Malaysia.
            </p>
            <CTAButton href="/residency/apply" variant="white" size="lg" showArrow isExternal={false}>
              Apply now
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
