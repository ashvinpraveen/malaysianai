import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Plug, TrendingUp } from "lucide-react";

const features = [
  {
    id: "trained",
    number: "01",
    icon: BookOpen,
    title: "Ambitious builders",
    description: "A community of ambitious and innovative builders across Malaysia.",
  },
  {
    id: "integrated",
    number: "02",
    icon: Plug,
    title: "Build in public",
    description: "Share wins, create content, and build alongside peers every day.",
  },
  {
    id: "self-develops",
    number: "03",
    icon: TrendingUp,
    title: "Real conversations",
    description: "Connect through intros and real talk — builders helping builders.",
  },
];

const TrainingSourcesVisual = () => (
  <div className="bg-cream border border-dark-teal/15 rounded-2xl w-full max-w-[500px] shadow-xl relative overflow-hidden">
    <div className="p-6">
      <div className="pb-4 border-b border-dark-teal/15">
        <h3 className="text-lg font-normal text-foreground mb-1">Project Brief</h3>
        <p className="text-xs text-foreground/60 tracking-wide">Share your problem statement</p>
      </div>

      <div className="mt-6">
        <div className="border-2 border-dashed border-dark-teal/20 rounded-xl p-8 text-center bg-cream-dark">
          <div className="flex flex-col items-center gap-2">
            <svg className="w-10 h-10 text-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-sm text-foreground/70">Upload your brief</p>
            <p className="text-xs text-foreground/50">PDF, docs, or slides</p>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <p className="text-xs uppercase tracking-widest text-foreground/50 mb-3">Included</p>

        {["Problem_Statement.pdf", "User_Research.docx", "Prototype_Notes.pdf"].map((file, index) => (
          <div key={file} className="flex items-center gap-3 p-3 rounded-xl bg-cream-dark border border-dark-teal/15">
            <div className="w-8 h-8 rounded bg-cream flex items-center justify-center flex-shrink-0 border border-dark-teal/10">
              <div className="w-4 h-4 rounded bg-dark-teal/40" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-normal text-foreground truncate">{file}</p>
              <p className="text-xs text-foreground/60">Brief - {index + 1}.0 MB</p>
            </div>
            <div className="w-5 h-5 rounded-full bg-dark-teal flex items-center justify-center flex-shrink-0">
              <div className="w-3 h-3 rounded-full bg-cream" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const IntegrationsVisual = () => (
  <div className="w-full max-w-[520px]">
    <div className="grid grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={`integration-${index}`} className="aspect-square flex items-center justify-center">
          <div className="h-16 w-16 rounded-2xl border border-dashed border-dark-teal/20 bg-cream-dark" />
        </div>
      ))}
    </div>
  </div>
);

const SelfDevelopmentVisual = () => (
  <div className="bg-cream border border-dark-teal/15 rounded-2xl w-full max-w-[500px] shadow-xl relative overflow-hidden">
    <div className="p-6">
      <div className="pb-4 border-b border-dark-teal/15">
        <h3 className="text-lg font-normal text-foreground mb-1">Milestone Progress</h3>
        <p className="text-xs text-foreground/60 tracking-wide">Cohort outcomes over time</p>
      </div>

      <div className="mt-6">
        <p className="text-xs uppercase tracking-widest text-foreground/50 mb-4">Sprint Readiness</p>
        <div className="relative h-32 overflow-hidden rounded-xl bg-cream-dark border border-dark-teal/15">
          <div className="absolute inset-0 flex items-end gap-2 px-4 pb-4">
            {[25, 40, 35, 50, 60, 55, 70, 65, 80].map((height, index) => (
              <div
                key={`bar-${index}`}
                className="flex-1 rounded-md bg-dark-teal/30"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        {[
          { label: "Mentor sessions", value: "Weekly" },
          { label: "Partner check-ins", value: "Biweekly" },
          { label: "Demo readiness", value: "Tracked" },
        ].map((stat) => (
          <div key={stat.label} className="p-3 rounded-xl bg-cream-dark border border-dark-teal/15 text-center">
            <p className="text-lg font-normal text-foreground mb-1">{stat.value}</p>
            <p className="text-xs text-foreground/60">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const visuals = [TrainingSourcesVisual, IntegrationsVisual, SelfDevelopmentVisual];

const AgenticIntelligenceSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="community" className="py-24 md:py-36 bg-cream-dark overflow-hidden">
      <div className="mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          <div className="lg:w-[38%] flex flex-col">
            <div className="mb-12">
              <p className="label-default text-foreground/60 uppercase tracking-widest mb-4">Community</p>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.1] text-foreground"
                style={{ textWrap: "balance" }}
              >
                Builders helping builders,
                <br />
                <span className="text-foreground/60">every single day.</span>
              </h2>
            </div>

            <div className="space-y-0 relative">
              {features.map((feature, index) => (
                <div
                  key={feature.id}
                  className={`relative py-6 cursor-pointer group ${index < features.length - 1 ? "border-b border-dark-teal/15" : ""}`}
                  onClick={() => setActiveStep(index)}
                >
                  <div className="flex items-center justify-between">
                    <h3
                      className={`text-lg md:text-xl font-normal tracking-tight transition-colors duration-300 ${
                        activeStep === index ? "text-foreground" : "text-foreground/60 group-hover:text-foreground"
                      }`}
                    >
                      {feature.title}
                    </h3>
                    <span className="text-xs text-foreground/40 tracking-widest flex-shrink-0">{feature.number}</span>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{
                      height: activeStep === index ? "auto" : 0,
                      opacity: activeStep === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm md:text-base font-light leading-relaxed text-foreground/70 mt-3 max-w-md">
                      {feature.description}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-[62%] flex">
            <div className="relative rounded-2xl overflow-hidden bg-cream flex-1 aspect-[4/3] border border-dark-teal/15">
              <div className="absolute inset-0 bg-dark-teal/5" />

              <div className="absolute inset-0 flex items-center justify-center p-6 md:p-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={features[activeStep].id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4 }}
                    className="w-full flex items-center justify-center"
                  >
                    {(() => {
                      const Visual = visuals[activeStep];
                      return <Visual />;
                    })()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgenticIntelligenceSection;
