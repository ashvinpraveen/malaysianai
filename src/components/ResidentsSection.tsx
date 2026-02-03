import type { ComponentType } from "react";
import {
  CleveAI,
  DocuAsk,
  ReplyrAI,
  ResidentImages,
  Robin,
  StealthStartup,
} from "@/components/ResidentLogos";

type Resident = {
  name: string;
  link: string;
  component?: ComponentType<{ className?: string }>;
  image?: string;
  size?: string;
};

const residents: Resident[] = [
  {
    component: ReplyrAI,
    link: "https://replyr.ai",
    name: "ReplyrAI",
  },
  {
    component: CleveAI,
    link: "https://cleve.ai",
    name: "CleveAI",
  },
  {
    component: Robin,
    link: "https://robinbiz.com",
    name: "Robin",
    size: "h-5 w-auto sm:h-6 md:h-8 max-w-[100px] object-contain",
  },
  {
    component: DocuAsk,
    link: "https://docuask.ai",
    name: "DocuAsk",
  },
  {
    image: ResidentImages.bluebolt,
    link: "https://blueboltlabs.com",
    name: "Blue Bolt Labs",
    size: "h-8 w-auto sm:h-10 md:h-12 max-w-[140px] object-contain",
  },
  {
    image: ResidentImages.easybuzz,
    link: "https://easybuzz.ai",
    name: "EasyBuzz",
  },
  {
    component: StealthStartup,
    link: "https://stealth-startups.com",
    name: "Stealth Startup",
  },
  {
    link: "/book-demo",
    name: "You?",
  },
];

const ResidentContent = ({ resident }: { resident: Resident }) => {
  if (resident.component) {
    const Component = resident.component;
    return (
      <Component
        className={
          resident.size ||
          "h-6 w-auto max-w-[120px] object-contain sm:h-8 md:h-10"
        }
      />
    );
  }

  if (resident.image) {
    return (
      <img
        alt={resident.name}
        className={
          resident.size ||
          "h-6 w-auto max-w-[120px] object-contain sm:h-8 md:h-10"
        }
        loading="lazy"
        src={resident.image}
      />
    );
  }

  return (
    <span className="text-2xl italic text-foreground sm:text-3xl md:text-4xl">
      {resident.name}
    </span>
  );
};

const ResidentsSection = () => {
  return (
    <section id="residents" className="py-20 md:py-28 bg-background">
      <div className="mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px]">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="label-default text-foreground/60 uppercase tracking-widest mb-4">
            Residents
          </p>
          <h2 className="section-title text-foreground mb-4">Our residents</h2>
          <p className="body-default text-foreground/70">
            Founders, builders, and researchers shipping AI products across
            Malaysia.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-3 lg:grid-cols-4">
          {residents.map((resident) => {
            const isExternal = resident.link.startsWith("http");

            return (
              <a
                key={resident.name}
                aria-label={resident.name}
                className="flex items-center justify-center rounded-2xl border border-border bg-card p-6 text-foreground transition-opacity hover:opacity-70"
                href={resident.link}
                rel={isExternal ? "noopener noreferrer" : undefined}
                target={isExternal ? "_blank" : undefined}
              >
                <ResidentContent resident={resident} />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ResidentsSection;
