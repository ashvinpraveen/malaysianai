import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { communityPartners } from "@/data/communityPartners";

const CommunityPartners = () => {
  return (
    <section id="community-partners" className="py-20 md:py-28 bg-background">
      <div className="mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px]">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
          <div className="w-full md:w-[35%]">
            <p className="label-default text-foreground/60 mb-3">Community</p>
            <h2 className="section-title text-foreground">Community partners</h2>
            <p className="mt-4 text-base text-foreground/70">
              In partnership with Malaysia&apos;s leading AI builder communities.
            </p>
            <a
              href="/community"
              className="mt-4 inline-flex text-sm text-foreground/70 transition-colors hover:text-foreground"
            >
              View community directory -&gt;
            </a>
          </div>
          <div className="w-full md:w-[65%]">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-5">
              {communityPartners.map((partner) => (
                <Tooltip key={partner.name}>
                  <TooltipTrigger asChild>
                    <a
                      href={partner.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={partner.name}
                      className="group flex h-full flex-col justify-between rounded-2xl bg-card/60 px-4 py-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:bg-card"
                    >
                      <div className="flex h-16 items-center justify-center">
                        <img
                          src={partner.logo}
                          alt={`${partner.name} logo`}
                          className="max-h-14 w-full object-contain opacity-75 transition-opacity duration-200 group-hover:opacity-100"
                          loading="lazy"
                        />
                      </div>
                      <span className="sr-only">{partner.name}</span>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent side="top">{partner.name}</TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityPartners;
