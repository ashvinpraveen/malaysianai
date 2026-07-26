import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Sponsor from "@/components/Sponsor";
import { CTAButton } from "@/components/CTAButton";

const communityTestimonials = [
  "I came for one workshop and left with people I now build with every week.",
  "It is an easy room to walk into, even if you are still figuring out where you fit in AI.",
  "The energy is practical: people share what they are making, what broke, and what they learned.",
  "I found collaborators here before I had a polished idea or a pitch deck.",
  "There is space for ambitious work without pretending everyone already knows the answer.",
  "The community makes starting feel much less intimidating.",
];

const About = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Navbar />

      <main>
        <section className="relative overflow-hidden border-b border-foreground/10 bg-[#fbf8f2] pb-16 pt-28 md:pb-24 md:pt-36">
          <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(hsl(var(--foreground)/0.13)_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 items-end gap-10 px-6 md:px-10 lg:grid-cols-[1fr_0.8fr] lg:gap-16 lg:px-16">
            <div className="max-w-4xl">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-foreground/55">About Malaysian AI</p>
              <h1 className="hero-title text-foreground">A place to show up, meet people, and build.</h1>
              <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-foreground/70 md:text-lg">
                Malaysian AI brings together the people, events, and spaces helping builders learn AI by making things with others. Start with an event; the rest tends to follow.
              </p>
              <div className="mt-8">
                <CTAButton href="/#events" variant="primary" size="lg" showArrow isExternal={false}>
                  View upcoming events
                </CTAButton>
              </div>
              <p className="mt-10 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-foreground/45">
                Initiated by <a href="https://500.co" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-foreground">500 Global</a> · Managed by <a href="https://www.aisea.builders/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-foreground">AI SEA</a>
              </p>
            </div>
            <figure className="relative overflow-hidden rounded-[1.75rem] border border-foreground/10 bg-foreground shadow-[0_10px_0_hsl(var(--foreground)/0.1)]">
              <img
                src="/show-and-tell.jpg"
                alt="Builders sharing work at a Malaysian AI Show and Tell"
                className="aspect-[4/3] h-full w-full object-cover"
              />
              <figcaption className="absolute bottom-4 left-4 rounded-full bg-background/95 px-3 py-2 text-xs font-bold text-foreground shadow-sm">
                Show &amp; Tell Thursdays at the residency
              </figcaption>
            </figure>
          </div>
        </section>

        <Sponsor />

        <section className="bg-muted/80 py-20 md:py-28">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
              <div className="max-w-xl">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-foreground/55">A connected scene</p>
                <h2 className="section-title text-foreground">Many communities. One generous starting point.</h2>
                <p className="body-default mt-4 text-foreground/70">
                  There are rooms for students, new builders, founders, and technical people who want to go deep. Explore the community directory to find yours.
                </p>
                <div className="mt-7">
                  <CTAButton href="/community" variant="outline" size="md" showArrow isExternal={false}>
                    Explore communities
                  </CTAButton>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {communityTestimonials.map((testimonial, index) => (
                  <blockquote
                    key={testimonial}
                    className={`playful-card rounded-[1.5rem] border border-foreground/10 bg-background p-6 text-base font-medium leading-relaxed tracking-tight text-foreground ${[
                      "sm:translate-y-0",
                      "sm:translate-y-6",
                      "sm:translate-y-2",
                      "sm:translate-y-8",
                      "sm:translate-y-4",
                      "sm:translate-y-10",
                    ][index]}`}
                  >
                    <span className="mb-3 block text-3xl leading-none text-[#f35b84]">“</span>
                    {testimonial}
                  </blockquote>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-background py-20 md:py-28">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
            <div className="overflow-hidden rounded-[2rem] border border-foreground/15 bg-foreground px-7 py-16 text-white shadow-[0_10px_0_hsl(var(--foreground)/0.12)] md:px-12 md:py-20">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-white/55">Come as you are</p>
              <h2 className="section-title max-w-3xl text-white">Find a thing that sounds interesting and turn up.</h2>
              <div className="mt-8">
                <CTAButton href="/#events" variant="white" size="lg" showArrow isExternal={false}>
                  See what&apos;s on
                </CTAButton>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
