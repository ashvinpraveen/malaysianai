import { MainCTAButton } from "./MainCTAButton";

const footerLinks = {
  Program: [
    { label: "Overview", href: "/#program" },
    { label: "Curriculum", href: "/#curriculum" },
    { label: "Studio", href: "/#studio" },
  ],
  Community: [
    { label: "Mentors", href: "/#community" },
    { label: "Partners", href: "/#community" },
    { label: "Updates", href: "/blog" },
  ],
  Resources: [
    { label: "Apply", href: "/book-demo" },
    { label: "About", href: "/company" },
    { label: "Contact", href: "/#contact" },
  ],
  Legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Responsible AI", href: "/#community" },
  ],
};

const Footer = () => {
  return (
    <footer className="border-t border-background/15 bg-foreground relative z-10">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          <div className="col-span-2">
            <a href="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-9 h-9 rounded-full bg-background flex items-center justify-center">
                <div className="w-3.5 h-3.5 rounded-sm bg-foreground" />
              </div>
              <span className="text-xl font-bold text-background tracking-tight">
                Malaysian AI Residency
              </span>
            </a>
            <p className="body-small text-background/70 mb-6 max-w-xs">
              A cohort-based residency helping builders and researchers ship real
              AI products with partners across Malaysia.
            </p>
            <div className="mb-8">
              <MainCTAButton href="/book-demo" variant="white" size="sm" showArrow isExternal={false}>
                Apply now
              </MainCTAButton>
            </div>
            <div className="flex gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={`social-${index}`}
                  className="w-8 h-8 rounded-full border border-background/20 bg-background/10"
                />
              ))}
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

        <div className="mt-12 pt-8 border-t border-background/15 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="body-small text-background/60">
            © {new Date().getFullYear()} The Malaysian AI Residency. All rights reserved.
          </p>
          <div className="flex gap-2 items-center">
            <span className="w-2 h-2 rounded-full bg-background/70" />
            <span className="caption text-background/60 uppercase">Applications open</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
