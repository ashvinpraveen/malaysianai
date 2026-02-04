import { useState } from "react";
import { residents as defaultResidents, type Resident } from "@/lib/residents";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

export const ResidentsTicker = ({ residents: residentsProp }: { residents?: Resident[] }) => {
  const [isPaused, setIsPaused] = useState(false);
  const list = residentsProp ?? defaultResidents;

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
    <div className="relative overflow-hidden">
      <div
        className={`flex w-max whitespace-nowrap animate-scroll-left ${isPaused ? "pause-animation" : ""}`}
      >
        <div className="flex items-center gap-6 pr-6 shrink-0">
          {list.map((resident, index) => renderResident(resident, index, false))}
        </div>
        <div className="flex items-center gap-6 pr-6 shrink-0">
          {list.map((resident, index) => renderResident(resident, index, true))}
        </div>
      </div>
    </div>
  );
};
