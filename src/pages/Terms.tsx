import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  const updated = "February 3, 2026";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    { id: "intro", title: "Introduction" },
    { id: "use", title: "Acceptable Use" },
    { id: "billing", title: "Billing" },
    { id: "ip", title: "Intellectual Property" },
    { id: "liability", title: "Limitations" },
    { id: "contact", title: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-cream font-sans selection:bg-cream-dark">
      <Navbar />

      <main className="relative">
        <section className="relative min-h-[40vh] flex items-center justify-center pt-32 pb-20 px-4 md:px-6 overflow-hidden bg-cream-dark">
          <div className="container relative z-10 max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-medium text-foreground tracking-[-0.02em]">
              Terms of Service
            </h1>

            <p className="text-sm md:text-base text-foreground/60 font-medium uppercase tracking-[0.2em]">
              Last updated: {updated}
            </p>

            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              These terms govern participation in The Malaysian AI Residency and
              use of its related services.
            </p>
          </div>
        </section>

        <section className="px-4 md:px-6 py-20 relative z-10">
          <div className="container max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16">
              <aside className="hidden lg:block">
                <div className="sticky top-28 bg-cream p-8 rounded-[2rem] border border-dark-teal/15 shadow-[0_2px_40px_-12px_rgba(11,31,35,0.12)]">
                  <h3 className="font-bold text-xs uppercase tracking-[0.2em] text-foreground mb-6">
                    Contents
                  </h3>
                  <nav className="flex flex-col gap-3">
                    {sections.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="text-sm text-foreground/60 hover:text-foreground hover:translate-x-1 transition-all duration-200 font-medium"
                      >
                        {item.title}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>

              <div className="space-y-16">
                <section id="intro" className="space-y-4">
                  <h2 className="text-2xl font-semibold text-foreground">Introduction</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    By applying or participating, you agree to these terms and
                    the residency guidelines shared during onboarding.
                  </p>
                </section>

                <section id="use" className="space-y-4">
                  <h2 className="text-2xl font-semibold text-foreground">Acceptable Use</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    Participants must use program resources responsibly and respect
                    partner data agreements.
                  </p>
                </section>

                <section id="billing" className="space-y-4">
                  <h2 className="text-2xl font-semibold text-foreground">Billing</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    Any fees, stipends, or sponsorship terms will be outlined in
                    cohort-specific agreements.
                  </p>
                </section>

                <section id="ip" className="space-y-4">
                  <h2 className="text-2xl font-semibold text-foreground">Intellectual Property</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    Participants retain ownership of their work, subject to any
                    partner agreements negotiated during the residency.
                  </p>
                </section>

                <section id="liability" className="space-y-4">
                  <h2 className="text-2xl font-semibold text-foreground">Limitations</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    The residency is provided on an as-is basis and does not
                    guarantee funding, employment, or commercial success.
                  </p>
                </section>

                <section id="contact" className="space-y-4 border-t border-dark-teal/15 pt-12">
                  <h2 className="text-2xl font-semibold text-foreground">Contact</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    Reach out with questions about these terms or program agreements.
                  </p>
                  <div className="text-lg font-semibold text-foreground">terms@malaysianai.org</div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
