import { CTAButton } from "./CTAButton";

const footerLinks = {
  Program: [
    { label: "Overview", href: "/#program" },
    { label: "Community partners", href: "/#community-partners" },
    { label: "Residents", href: "/#residents" },
  ],
  Resources: [
    { label: "Apply", href: "/book-demo" },
    { label: "Community directory", href: "/community" },
    { label: "Residents directory", href: "/residents" },
    { label: "About", href: "/company" },
    { label: "Contact", href: "/#contact" },
  ],
  Legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
};

const Footer = () => {
  return (
    <footer className="border-t border-background/15 bg-foreground relative z-10">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
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

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-bold text-background mb-6 uppercase tracking-[0.3em]">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="body-small text-background/70 hover:text-background transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-background/15 flex justify-end">
          <p className="body-small text-background/60 text-right">
            © {new Date().getFullYear()} Malaysian AI. All rights reserved.
          </p>
        </div>
        <div className="mt-10">
          <div className="text-background/10 text-[clamp(3rem,20vw,24rem)] font-black tracking-tighter text-center leading-[0.8]">
            Malaysian AI
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
