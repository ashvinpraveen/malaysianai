import { Link } from "react-router-dom";
import { ResidentsTicker } from "@/components/ResidentsTicker";

const Residents = () => {
  return (
    <section id="residents" className="py-20 md:py-28 bg-muted overflow-hidden">
      <div className="mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="label-default text-foreground/60 mb-3">Residents</p>
            <h2 className="section-title text-foreground">You're in great company</h2>
          </div>
          <Link
            to="/residents"
            className="inline-flex items-center justify-center rounded-full border border-foreground/20 bg-transparent px-4 py-2 text-sm font-medium text-foreground/80 transition-all hover:border-foreground/40 hover:text-foreground hover:bg-foreground/5"
          >
            View all residents -&gt;
          </Link>
        </div>
      </div>

      <div className="px-6 md:px-10 lg:px-16">
        <ResidentsTicker />
      </div>
    </section>
  );
};

export default Residents;
