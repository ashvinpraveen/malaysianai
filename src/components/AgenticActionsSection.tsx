import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Users, Globe } from "lucide-react";

const features = [
  {
    id: "show-and-tells",
    number: "01",
    icon: Zap,
    title: "Weekly show-and-tells",
    description: "Demo what you shipped, get sharp feedback, and borrow patterns from peers.",
  },
  {
    id: "coworking",
    number: "02",
    icon: Users,
    title: "Focused coworking",
    description: "It's like having colleagues while everyone independently builds their own thing.",
  },
  {
    id: "support",
    number: "03",
    icon: Globe,
    title: "Support across the stack",
    description: "Technical, product, GTM, fundraising, and content support from peers and mentors.",
  },
];

const ActionsVisual = () => {
  const messages = [
    { role: "user", text: "Show-and-tell today: here is our new onboarding flow." },
    { role: "agent", text: "Great. Let's do a quick feedback loop after standup." },
  ];

  return (
    <div className="w-full max-w-[500px] relative">
      <div
        className="relative h-[320px] flex flex-col justify-end overflow-hidden p-6"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 55%, black 100%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 55%, black 100%)",
        }}
      >
        <div className="flex flex-col gap-4">
          {messages.map((message, index) => {
            const isAgent = message.role === "agent";

            return (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${isAgent ? "justify-start" : "justify-end"} opacity-0 animate-chat-pop`}
                style={{ animationDelay: `${index * 400}ms` }}
              >
                <div className="max-w-[85%] shadow-[0_20px_35px_-28px_rgba(11,31,35,0.45)]">
                  <div
                    className={`rounded-2xl border px-5 py-4 text-base md:text-lg leading-relaxed ${
                      isAgent ? "bg-card border-border text-foreground" : "bg-card border-border text-foreground"
                    }`}
                  >
                    {isAgent && (
                      <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-foreground/60">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-muted border border-border">
                          <svg viewBox="0 0 32 32" className="h-4 w-4 text-foreground" fill="currentColor" aria-hidden="true">
                            <path d="M16 2c-3.5 0-6.5 1.5-8.5 4C5.5 8.5 3 11 1 16c2 5 4.5 7.5 6.5 10 2 2.5 5 4 8.5 4s6.5-1.5 8.5-4c2-2.5 4.5-5 6.5-10-2-5-4.5-7.5-6.5-10C22.5 3.5 19.5 2 16 2zm0 4c2.5 0 4.5 1.2 5.8 3.1 1.3 1.9 3.3 3.1 5.8 3.1 0 2.5-1.2 4.5-3.1 5.8-1.9 1.3-3.1 3.3-3.1 5.8-2.5 0-4.5-1.2-5.8-3.1-1.3-1.9-3.3-3.1-5.8-3.1 0-2.5 1.2-4.5 3.1-5.8 1.9-1.3 3.1-3.3 3.1-5.8z" />
                          </svg>
                        </span>
                        <span>Mentor</span>
                      </div>
                    )}
                    <p>{message.text}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const EscalationVisual = () => {
  const messages = [
    { role: "user", text: "We need help with GTM positioning." },
    { role: "agent", text: "Pairing you with a resident who has launched in this space." },
  ];

  return (
    <div className="w-full max-w-[500px] relative">
      <div
        className="relative h-[320px] flex flex-col justify-end overflow-hidden p-6"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 55%, black 100%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 55%, black 100%)",
        }}
      >
        <div className="flex flex-col gap-4">
          {messages.map((message, index) => {
            const isAgent = message.role === "agent";

            return (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${isAgent ? "justify-start" : "justify-end"} opacity-0 animate-chat-pop`}
                style={{ animationDelay: `${index * 400}ms` }}
              >
                <div className="max-w-[85%] shadow-[0_20px_35px_-28px_rgba(11,31,35,0.45)]">
                  <div
                    className={`rounded-2xl border px-5 py-4 text-base md:text-lg leading-relaxed ${
                      isAgent ? "bg-card border-border text-foreground" : "bg-card border-border text-foreground"
                    }`}
                  >
                    {isAgent && (
                      <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-foreground/60">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-muted border border-border">
                          <svg viewBox="0 0 32 32" className="h-4 w-4 text-foreground" fill="currentColor" aria-hidden="true">
                            <path d="M16 2c-3.5 0-6.5 1.5-8.5 4C5.5 8.5 3 11 1 16c2 5 4.5 7.5 6.5 10 2 2.5 5 4 8.5 4s6.5-1.5 8.5-4c2-2.5 4.5-5 6.5-10-2-5-4.5-7.5-6.5-10C22.5 3.5 19.5 2 16 2zm0 4c2.5 0 4.5 1.2 5.8 3.1 1.3 1.9 3.3 3.1 5.8 3.1 0 2.5-1.2 4.5-3.1 5.8-1.9 1.3-3.1 3.3-3.1 5.8-2.5 0-4.5-1.2-5.8-3.1-1.3-1.9-3.3-3.1-5.8-3.1 0-2.5 1.2-4.5 3.1-5.8 1.9-1.3 3.1-3.3 3.1-5.8z" />
                          </svg>
                        </span>
                        <span>Mentor</span>
                      </div>
                    )}
                    <p>{message.text}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const MultilingualVisual = () => (
  <div className="bg-card border border-border rounded-2xl w-full max-w-[500px] shadow-xl relative overflow-hidden">
    <div className="p-4 border-b border-border flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-foreground/70" />
        <span className="text-sm font-normal text-foreground">Support Tracks</span>
      </div>
      <span className="text-xs text-foreground/60">Focus</span>
    </div>
    <div className="p-5 space-y-3">
      {[
        { lang: "Technical", flag: "TE", calls: "Support", pct: 30 },
        { lang: "Product", flag: "PR", calls: "Support", pct: 25 },
        { lang: "GTM", flag: "GT", calls: "Support", pct: 20 },
        { lang: "Fundraising", flag: "FR", calls: "Support", pct: 15 },
        { lang: "Content", flag: "CO", calls: "Support", pct: 10 },
      ].map((l) => (
        <div key={l.lang} className="p-3.5 rounded-xl bg-muted border border-border">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-3">
              <span className="text-lg">{l.flag}</span>
              <p className="text-sm font-normal text-foreground">{l.lang}</p>
            </div>
            <p className="text-sm text-foreground/60">{l.calls}</p>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-foreground rounded-full transition-all duration-500" style={{ width: `${l.pct}%` }} />
          </div>
        </div>
      ))}
    </div>
    <div className="px-5 pb-5">
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <p className="text-xl font-light text-foreground mb-0.5">Weekly</p>
          <p className="text-xs text-foreground/60">Show-and-tells</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-light text-foreground mb-0.5">Focused</p>
          <p className="text-xs text-foreground/60">Coworking</p>
        </div>
      </div>
    </div>
  </div>
);

const visuals = [ActionsVisual, EscalationVisual, MultilingualVisual];

const AgenticActionsSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="curriculum" className="py-24 md:py-36 bg-background overflow-hidden">
      <div className="mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          <div className="lg:w-[38%] flex flex-col">
            <div className="mb-12">
              <p className="label-default text-foreground/60 uppercase tracking-widest mb-4">Cadence</p>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.1] text-foreground"
                style={{ textWrap: "balance" }}
              >
                A weekly cadence
                <br />
                <span className="text-foreground/60">that keeps you shipping.</span>
              </h2>
            </div>

            <div className="space-y-0 relative">
              {features.map((feature, index) => (
                <div
                  key={feature.id}
                  className={`relative py-6 cursor-pointer group ${index < features.length - 1 ? "border-b border-border" : ""}`}
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
            <div className="relative rounded-2xl overflow-hidden bg-muted flex-1 aspect-[4/3] border border-border">
              <div className="absolute inset-0 bg-foreground/5" />

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

export default AgenticActionsSection;
