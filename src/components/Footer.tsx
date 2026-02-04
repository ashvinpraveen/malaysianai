import { CTAButton } from "./CTAButton";

const footerSections = [
  {
    title: "Program",
    links: [
      { label: "Residency", href: "/residency" },
      { label: "Apply", href: "/book-demo" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Meet the residents", href: "/residents" },
      { label: "Communities", href: "/community" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/company" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
    footerNote: `© ${new Date().getFullYear()} Malaysian AI`,
  },
] as const;

const Footer = () => {
  return (
    <footer className="border-t border-background/15 bg-foreground relative z-10">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          <div className="col-span-2">
            <a href="/" className="flex items-center gap-2 mb-6 group">
              <img
                src="/favicon.svg"
                alt="Malaysian AI logo"
                className="w-9 h-9 brightness-0 invert"
              />
              <span className="navbar-brand text-xl text-background">
                Malaysian AI
              </span>
            </a>
            <p className="body-small text-background/70 mb-6 max-w-xs">
              A residency for Malaysia&apos;s AI-native builders to go all-in, make insane
              progress and launch globally.
            </p>
            <div className="mb-8">
              <CTAButton href="/book-demo" variant="white" size="sm" showArrow isExternal={false}>
                Apply for the next cohort
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
                    <a
                      href={link.href}
                      className="text-sm text-background/70 hover:text-background transition-colors duration-200"
                    >
                      {link.label}
                    </a>
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
      <div className="mt-10 overflow-hidden w-screen relative left-1/2 -translate-x-1/2 px-0">
        <div className="navbar-brand text-background/15 text-[clamp(4rem,18vw,18rem)] font-semibold tracking-[-0.06em] text-center leading-none whitespace-nowrap">
          Malaysian AI
        </div>
      </div>
    </footer>
  );
};

export default Footer;
