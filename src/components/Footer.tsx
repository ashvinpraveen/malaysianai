import Link from "next/link";
import { CTAButton } from "./CTAButton";

type FooterSection = {
  title: string;
  links: Array<{ label: string; href: string; isExternal?: boolean }>;
  footerNote?: string;
};

const footerSections: FooterSection[] = [
  {
    title: "Get involved",
    links: [
      { label: "View events", href: "https://luma.com/malaysianai", isExternal: true },
      { label: "Communities", href: "/community" },
      { label: "Residency", href: "/residency" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "AI Takeover", href: "https://www.aitakeover.co/", isExternal: true },
      { label: "Blog", href: "/blog" },
      { label: "Residents", href: "/residents" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Contact", href: "/contact" },
    ],
    footerNote: `© ${new Date().getFullYear()} Malaysian AI`,
  },
];

const Footer = () => {
  return (
    <footer className="border-t border-background/15 bg-foreground relative z-10">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <img
                src="/logo-ai-residency.png"
                alt="Malaysian AI logo"
                className="h-8 w-auto"
              />
              <span className="navbar-brand text-xl text-background">
                Malaysian AI
              </span>
            </Link>
            <p className="body-small text-background/70 mb-6 max-w-xs">
              The home of AI builders in Malaysia. Join workshops, events, and a community figuring out AI together.
            </p>
            <div className="mb-8">
              <CTAButton href="https://luma.com/malaysianai" variant="white" size="sm" showArrow isExternal={true}>
                View events
              </CTAButton>
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-normal text-background/50 mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={link.isExternal ? "_blank" : undefined}
                      rel={link.isExternal ? "noopener noreferrer" : undefined}
                      className="text-sm text-background/70 hover:text-background transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              {section.footerNote ? (
                <p className="mt-6 text-xs text-background/40">{section.footerNote}</p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 pb-6 overflow-hidden w-screen relative left-1/2 -translate-x-1/2 px-0">
        <div className="navbar-brand text-background/15 text-[clamp(4rem,18vw,18rem)] font-semibold tracking-[-0.06em] text-center leading-none whitespace-nowrap -translate-y-4">
          Malaysian AI
        </div>
      </div>
    </footer>
  );
};

export default Footer;
