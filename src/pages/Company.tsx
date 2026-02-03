import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MainCTAButton } from "@/components/MainCTAButton";

const Company = () => {
  return (
    <div className="min-h-screen bg-cream flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow w-full px-4 pt-32 pb-20 selection:bg-cream-dark">
        <div className="w-full max-w-4xl mx-auto mb-20 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream-dark border border-dark-teal/15 text-foreground/70 text-xs font-semibold uppercase tracking-wider">
            About the Residency
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] font-medium text-foreground tracking-[-0.02em]">
            Building Malaysia's AI builders, together.
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            The Malaysian AI Residency is a cohort-based program that helps founders,
            engineers, and researchers ship real AI products with local partners and
            mentors across the country.
          </p>
        </div>

        <div className="container mx-auto max-w-6xl mb-32">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Community-first", description: "We invest in relationships that compound across cohorts." },
              { title: "Applied impact", description: "We prioritize projects that solve real Malaysian problems." },
              { title: "Responsible AI", description: "Ethics, safety, and transparency are non-negotiable." },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-cream rounded-[2rem] p-10 border border-dark-teal/15 shadow-[0_2px_40px_-12px_rgba(11,31,35,0.12)]"
              >
                <div className="w-12 h-12 bg-cream-dark rounded-2xl flex items-center justify-center mb-6 border border-dark-teal/15">
                  <div className="w-5 h-5 rounded bg-dark-teal/30" />
                </div>
                <h3 className="text-xl font-medium text-foreground mb-3">{item.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto max-w-6xl">
          <div className="bg-cream rounded-[2.5rem] p-8 md:p-16 border border-dark-teal/15 shadow-sm overflow-hidden relative">
            <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 text-foreground/70 font-medium">
                  <span>Partner with us</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-medium text-foreground tracking-tight">
                  Bring a real-world brief to the cohort.
                </h2>
                <p className="text-foreground/70 text-lg leading-relaxed max-w-md">
                  We work with companies, nonprofits, and public agencies to scope
                  meaningful AI projects that residents can ship.
                </p>
                <ul className="space-y-3">
                  {["Define a clear problem statement", "Provide domain access and feedback", "Attend demo day"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-foreground/70">
                      <div className="w-1.5 h-1.5 rounded-full bg-dark-teal/70" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="pt-4">
                  <MainCTAButton variant="primary" size="lg" showArrow>
                    Become a partner
                  </MainCTAButton>
                </div>
              </div>
              <div className="relative h-full min-h-[300px] bg-cream-dark rounded-[2rem] flex items-center justify-center p-8 border border-dark-teal/15">
                <div className="w-32 h-32 rounded-3xl border border-dashed border-dark-teal/20" />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Company;
