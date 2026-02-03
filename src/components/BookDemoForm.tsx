import { MainCTAButton } from "./MainCTAButton";

const BookDemoForm = () => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-cream rounded-[2.5rem] p-8 md:p-16 shadow-[0_2px_40px_-12px_rgba(11,31,35,0.12)] border border-dark-teal/15">
      <h2 className="text-2xl md:text-3xl font-medium text-center text-foreground mb-12">
        Residency application form
      </h2>

      <form className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-semibold text-foreground/70 ml-1">First name</label>
            <input
              placeholder="First name"
              className="mt-2 h-14 w-full rounded-xl border-dark-teal/20 bg-cream placeholder:text-foreground/40 focus:border-dark-teal/50 focus:ring-0 text-base px-5 transition-all"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-foreground/70 ml-1">Last name</label>
            <input
              placeholder="Last name"
              className="mt-2 h-14 w-full rounded-xl border-dark-teal/20 bg-cream placeholder:text-foreground/40 focus:border-dark-teal/50 focus:ring-0 text-base px-5 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-foreground/70 ml-1">Email</label>
          <input
            placeholder="you@domain.com"
            className="mt-2 h-14 w-full rounded-xl border-dark-teal/20 bg-cream placeholder:text-foreground/40 focus:border-dark-teal/50 focus:ring-0 text-base px-5 transition-all"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-foreground/70 ml-1">Current role or organization</label>
          <input
            placeholder="Role, team, or organization"
            className="mt-2 h-14 w-full rounded-xl border-dark-teal/20 bg-cream placeholder:text-foreground/40 focus:border-dark-teal/50 focus:ring-0 text-base px-5 transition-all"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-foreground/70 ml-1">Project idea</label>
          <textarea
            placeholder="Describe the problem you want to solve and who it helps"
            className="mt-2 min-h-[140px] w-full rounded-xl border-dark-teal/20 bg-cream placeholder:text-foreground/40 focus:border-dark-teal/50 focus:ring-0 text-base px-5 py-4 transition-all"
          />
        </div>

        <div className="pt-6 text-center space-y-6">
          <p className="text-sm text-foreground/60">
            Connect this form to your intake workflow or application system.
          </p>

          <MainCTAButton
            type="button"
            disabled
            variant="primary"
            size="md"
            className="px-12"
          >
            Submit application
          </MainCTAButton>
        </div>
      </form>
    </div>
  );
};

export default BookDemoForm;
