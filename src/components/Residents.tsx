import { useState, type ComponentType } from "react";
import { Link } from "react-router-dom";
import {
  CleveAI,
  DocuAsk,
  ReplyrAI,
  ResidentImages,
  Robin,
} from "@/components/ResidentLogos";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Resident = {
  name: string;
  component?: ComponentType<{ className?: string }>;
  image?: string;
  href?: string;
};

const residents: Resident[] = [
  { name: "ReplyrAI", component: ReplyrAI, href: "https://replyr.ai" },
  { name: "Cleve", component: CleveAI, href: "https://cleve.ai" },
  {
    name: "Robin",
    component: Robin,
    href: "https://robinai.com",
  },
  { name: "DocuAsk", component: DocuAsk, href: "https://docuask.com" },
  {
    name: "Blue Bolt Labs",
    image: ResidentImages.bluebolt,
    href: "https://blueboltlabs.com",
  },
  { name: "Seavoice", image: ResidentImages.seavoice, href: "https://seavoice.ai" },
  { name: "Klovr", image: ResidentImages.klovr, href: "https://klovr.co/" },
  {
    name: "Kelas Sekejap",
    image: ResidentImages.kelassekejap,
    href: "https://kelassekejap.com",
  },
];

const ResidentLogo = ({ resident }: { resident: Resident }) => {
  const logoClassName = "h-full w-full max-h-full max-w-full";

  if (resident.component) {
    const Component = resident.component;
    return <Component className={logoClassName} />;
  }

  if (resident.image) {
    return (
      <img
        alt={resident.name}
        className={`${logoClassName} object-contain`}
        loading="lazy"
        src={resident.image}
      />
    );
  }

  return null;
};

const Residents = () => {
  const [isPaused, setIsPaused] = useState(false);

  const handlePause = () => setIsPaused(true);
  const handleResume = () => setIsPaused(false);

  const renderResident = (resident: Resident, index: number, isDuplicate: boolean) => {
    const Wrapper = resident.href ? "a" : "div";
    const sharedProps = {
      className:
        "group inline-flex items-center px-5 py-3 rounded-full bg-transparent text-foreground/80 hover:bg-muted/50 transition-colors",
      "aria-label": resident.name,
      title: resident.name,
      onPointerEnter: handlePause,
      onPointerLeave: handleResume,
      onFocus: handlePause,
      onBlur: handleResume,
    };
    const linkProps = resident.href
      ? {
          href: resident.href,
          target: "_blank",
          rel: "noopener noreferrer",
        }
      : {};
    const duplicateProps = isDuplicate
      ? {
          "aria-hidden": true,
          tabIndex: -1,
        }
      : {};

    return (
      <Tooltip key={`${resident.name}-${isDuplicate ? "dup" : "main"}-${index}`}>
        <TooltipTrigger asChild>
          <Wrapper {...sharedProps} {...linkProps} {...duplicateProps}>
            <div className="flex h-14 w-14 items-center justify-center shrink-0 overflow-hidden transition-transform duration-200 group-hover:scale-110 sm:h-16 sm:w-16 md:h-20 md:w-20">
              <ResidentLogo resident={resident} />
            </div>
          </Wrapper>
        </TooltipTrigger>
        <TooltipContent side="top">{resident.name}</TooltipContent>
      </Tooltip>
    );
  };

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

      <div className="relative overflow-hidden">
        <div className="px-6 md:px-10 lg:px-16">
          <div
            className={`flex w-max whitespace-nowrap animate-scroll-left ${isPaused ? "pause-animation" : ""}`}
          >
            <div className="flex items-center gap-6 pr-6 shrink-0">
              {residents.map((resident, index) => renderResident(resident, index, false))}
            </div>
            <div className="flex items-center gap-6 pr-6 shrink-0">
              {residents.map((resident, index) => renderResident(resident, index, true))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Residents;
