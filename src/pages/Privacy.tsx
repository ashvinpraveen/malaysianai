import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
  const updated = "February 3, 2026";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    { id: "overview", title: "Overview" },
    { id: "collection", title: "Data Collection" },
    { id: "usage", title: "Data Usage" },
    { id: "sharing", title: "Data Sharing" },
    { id: "media", title: "Photos & Media" },
    { id: "contact", title: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-muted">
      <Navbar />

      <main className="relative">
        <section className="relative min-h-[40vh] flex items-center justify-center pt-32 pb-20 px-4 md:px-6 overflow-hidden bg-muted">
          <div className="container relative z-10 max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-medium text-foreground tracking-[-0.02em]">
              Privacy Policy
            </h1>

            <p className="text-sm md:text-base text-foreground/60 font-medium uppercase tracking-[0.2em]">
              Last updated: {updated}
            </p>

            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              This policy explains how The Malaysian AI Residency collects, uses,
              and protects personal information.
            </p>
          </div>
        </section>

        <section className="px-4 md:px-6 py-20 relative z-10">
          <div className="container max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16">
              <aside className="hidden lg:block">
                <div className="sticky top-28 bg-card p-8 rounded-[2rem] border border-border shadow-[0_2px_40px_-12px_rgba(11,31,35,0.12)]">
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
                <section id="overview" className="space-y-4">
                  <h2 className="text-2xl font-semibold text-foreground">Overview</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    We collect limited data to run the residency, review applications,
                    and communicate with participants and partners.
                  </p>
                </section>

                <section id="collection" className="space-y-4">
                  <h2 className="text-2xl font-semibold text-foreground">Data Collection</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    We collect information submitted through application forms,
                    event registrations, and residency communications.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "Application details",
                      "Program participation data",
                      "Feedback and survey responses",
                      "Event registrations",
                    ].map((item) => (
                      <div key={item} className="p-6 rounded-2xl bg-muted border border-border text-foreground/70">
                        {item}
                      </div>
                    ))}
                  </div>
                </section>

                <section id="usage" className="space-y-4">
                  <h2 className="text-2xl font-semibold text-foreground">Data Usage</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    We use data to evaluate applications, coordinate mentors and
                    partners, and improve the residency experience.
                  </p>
                </section>

                <section id="sharing" className="space-y-4">
                  <h2 className="text-2xl font-semibold text-foreground">Data Sharing</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    We share information only with trusted partners and service
                    providers when required to deliver the program.
                  </p>
                </section>

                <section id="media" className="space-y-4">
                  <h2 className="text-2xl font-semibold text-foreground">Photos &amp; Media</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    By attending our events or participating in the residency, you
                    consent to being photographed, filmed, or recorded. We may use
                    your image, likeness, and voice in our materials (including the
                    website, social media, and other communications) without
                    compensation. If you prefer not to be recorded, let us know in
                    advance and we will do our best to accommodate.
                  </p>
                </section>

                <section id="contact" className="space-y-4 border-t border-border pt-12">
                  <h2 className="text-2xl font-semibold text-foreground">Contact</h2>
                  <p className="text-foreground/70 leading-relaxed">
                    Contact us with questions about privacy or data requests.
                  </p>
                  <div className="text-lg font-semibold text-foreground">privacy@malaysianai.org</div>
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

export default Privacy;
