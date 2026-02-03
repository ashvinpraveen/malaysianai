import { Check } from "lucide-react";

type InsightType = "explorer" | "monitors" | "experiments" | "observability";

const insights: { title: string; description: string; type: InsightType }[] = [
  {
    title: "Explorer",
    description:
      "Analyze handoffs and escalation reasons with clustered highlights across every call.",
    type: "explorer",
  },
  {
    title: "Monitors",
    description:
      "Identify conversations that need attention, then surface trends before they spike.",
    type: "monitors",
  },
  {
    title: "Experiments",
    description:
      "Run controlled tests to improve prompts, playbooks, and agent performance.",
    type: "experiments",
  },
  {
    title: "Observability",
    description:
      "Trace every decision, tool call, and policy check with full accountability.",
    type: "observability",
  },
];

const InsightPreview = ({ type }: { type: InsightType }) => {
  if (type === "explorer") {
    return (
      <div className="h-full w-full rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-sm flex flex-col">
        <div className="text-[10px] uppercase tracking-[0.3em] text-slate-400">Conversation</div>
        <div className="mt-2 text-[12px] text-slate-600 font-medium">Handoff highlights</div>
        <div className="mt-3 space-y-2">
          <div className="h-2 w-11/12 rounded-full bg-slate-100" />
          <div className="h-2 w-9/12 rounded-full bg-slate-100" />
          <div className="h-2 w-8/12 rounded-full bg-slate-100" />
        </div>
        <div className="mt-auto pt-4">
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[10px] text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
            Package stuck in transit
          </div>
        </div>
      </div>
    );
  }

  if (type === "monitors") {
    return (
      <div className="relative h-full w-full rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-sm overflow-hidden">
        <div className="text-[10px] uppercase tracking-[0.3em] text-slate-400">Transfers</div>
        <div className="mt-4 flex h-20 items-end gap-1">
          {[36, 52, 40, 68, 44, 76, 58].map((value, index) => (
            <div
              key={`bar-${value}-${index}`}
              className="w-3 rounded-md bg-gradient-to-t from-blue-500/30 to-blue-500/10"
              style={{ height: `${value}%` }}
            />
          ))}
        </div>
        <div className="absolute right-3 top-3 w-28 rounded-xl border border-slate-200/70 bg-white p-3 shadow-md">
          <div className="text-[10px] text-slate-500">Great sNPS</div>
          <div className="text-xl font-light text-slate-900">32%</div>
          <svg
            viewBox="0 0 100 40"
            className="mt-2 h-8 w-full"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M2 30 L20 26 L38 28 L56 18 L74 20 L98 10"
              className="text-emerald-400"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    );
  }

  if (type === "experiments") {
    return (
      <div className="relative h-full w-full rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-sm overflow-hidden">
        <div className="absolute left-4 top-6 w-32 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="text-[9px] uppercase tracking-[0.3em] text-slate-400">Agent A</div>
          <div className="mt-2 text-[11px] text-slate-600">How can I help?</div>
        </div>
        <div className="absolute right-4 bottom-6 w-32 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="text-[9px] uppercase tracking-[0.3em] text-slate-400">Agent B</div>
          <div className="mt-2 text-[11px] text-slate-600">Let me check that.</div>
        </div>
        <div className="absolute left-1/2 top-4 bottom-4 w-px border-l border-dashed border-slate-200" />
        <div className="absolute left-1/2 top-1/2 w-10 border-t border-dashed border-slate-200" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-100 px-2 py-1 text-[9px] text-slate-500">
          A/B
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-sm">
      <div className="text-[10px] uppercase tracking-[0.3em] text-slate-400">Agent reasoning</div>
      <div className="mt-4 space-y-3 text-[11px] text-slate-600">
        {["Detect abuse", "Observations", "Decisions", "Responses"].map((label) => (
          <div key={label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
              {label}
            </div>
            <Check className="h-3 w-3 text-emerald-500" />
          </div>
        ))}
      </div>
    </div>
  );
};

const InsightsSection = () => {
  return (
    <section id="insights" className="relative overflow-hidden bg-gradient-to-b from-white via-[#F6FAFF] to-white py-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 right-0 h-72 w-72 rounded-full bg-[#E6F0FF] opacity-70 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-[#E6F9F0] opacity-60 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.08),_transparent_55%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-[10px] uppercase tracking-[0.35em] text-slate-500 shadow-sm animate-fade-in">
            <span className="h-2 w-2 rounded-full bg-slate-900" />
            Insights
          </div>
          <h2 className="section-title text-slate-900 mt-6">
            Use AI to improve your AI
          </h2>
          <p className="body-large text-slate-600 mt-4">
            Close the loop with continuous quality signals. Measure, compare, and optimize every agent
            interaction without slowing your team down.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {insights.map((insight, index) => (
            <div
              key={insight.title}
              className="group rounded-[2.5rem] border border-slate-200/70 bg-white/90 p-5 shadow-[0_30px_80px_-60px_rgba(15,23,42,0.6)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_40px_90px_-55px_rgba(15,23,42,0.7)] opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 mb-6">
                <div className="aspect-[4/3] w-full">
                  <InsightPreview type={insight.type} />
                </div>
              </div>
              <h3 className="card-title text-slate-900 mb-2">{insight.title}</h3>
              <p className="body-small text-slate-600">{insight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
