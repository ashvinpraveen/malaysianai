import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Menu, X } from "lucide-react";
import { MainCTAButton } from "./MainCTAButton";

const navItems = [
  { label: "Program", href: "/#program" },
  { label: "Curriculum", href: "/#curriculum" },
  { label: "Community", href: "/#community" },
  { label: "Residents", href: "/#residents" },
  { label: "Updates", href: "/blog" },
  { label: "Apply", href: "/book-demo" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const textColor = isMenuOpen ? "text-foreground" : "text-foreground";

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[60] bg-background border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2.5 group z-[60]">
              <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center">
                <div className="w-3 h-3 rounded-sm bg-background" />
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">
                Malaysian AI Residency
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/70 hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="hidden lg:block">
              <MainCTAButton href="/book-demo" variant="secondary" isExternal={false}>
                Apply now
              </MainCTAButton>
            </div>

            <div className="flex lg:hidden items-center gap-4 z-[60]">
              <MainCTAButton href="/book-demo" variant="secondary" size="sm" isExternal={false}>
                Apply
              </MainCTAButton>

              <button
                className={`p-2 transition-colors duration-300 ${textColor}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-background z-50 pt-24 px-6 transition-all duration-500 ease-in-out ${
          isMenuOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible"
        }`}
      >
        <div className="container mx-auto h-full flex flex-col justify-between pb-12">
          <div className="flex flex-col gap-6 mt-8">
            {navItems.map((item, index) => (
              <div
                key={item.label}
                className={`border-b border-border pb-4 transform transition-all duration-500 delay-[${
                  index * 100
                }ms] ${isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              >
                <Link
                  to={item.href}
                  className="flex items-center justify-between group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-2xl md:text-3xl font-light uppercase tracking-[0.2em] text-foreground group-hover:text-primary transition-colors">
                    {item.label}
                  </span>
                  <ChevronRight className="w-6 h-6 text-foreground/40 group-hover:text-primary transition-colors" />
                </Link>
              </div>
            ))}
          </div>

          <div
            className={`transform transition-all duration-700 delay-300 ${
              isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-8 border-t border-border">
              <div className="flex flex-col gap-2">
                <p className="label-default text-foreground/60 uppercase">Contact</p>
                <span className="body-default text-foreground">hello@malaysianai.org</span>
              </div>

              <div className="flex gap-4">
                <Link to="/#curriculum" className="text-foreground/70 hover:text-foreground font-light">
                  View curriculum
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
