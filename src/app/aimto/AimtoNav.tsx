"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./page.module.css";

type AimtoNavProps = {
  registrationUrl: string;
};

type MenuId = "program" | "attend" | "about";

export default function AimtoNav({ registrationUrl }: AimtoNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuId | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setActiveMenu(null);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const closeFromOutside = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    const closeWithKeyboard = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      navRef.current
        ?.querySelector<HTMLButtonElement>('[aria-expanded="true"]')
        ?.focus();
      setActiveMenu(null);
    };

    document.addEventListener("pointerdown", closeFromOutside);
    document.addEventListener("keydown", closeWithKeyboard);

    return () => {
      document.removeEventListener("pointerdown", closeFromOutside);
      document.removeEventListener("keydown", closeWithKeyboard);
    };
  }, []);

  const toggleMenu = (menu: MenuId) => {
    setActiveMenu((currentMenu) => (currentMenu === menu ? null : menu));
  };

  return (
    <header className={styles.navWrap}>
      <nav
        ref={navRef}
        className={`${styles.nav} ${scrolled ? styles.navScrolled : ""}`}
        aria-label="AI Malaysia Takeover"
      >
        <a
          className={styles.brand}
          href="#top"
          aria-label="AI Malaysia Takeover home"
        >
          <img
            src="/aimto-assets/logo-white.png"
            alt="AI Malaysia Takeover 2026"
          />
        </a>
        <div className={styles.navLinks}>
          <div className={styles.navGroup}>
            <button
              className={styles.navMenuButton}
              type="button"
              aria-haspopup="true"
              aria-expanded={activeMenu === "program"}
              aria-controls="aimto-menu-program"
              onClick={() => toggleMenu("program")}
            >
              Program <span className={styles.navChevron} aria-hidden="true" />
            </button>
            <div
              className={`${styles.navDropdown} ${
                activeMenu === "program" ? styles.navDropdownOpen : ""
              }`}
              id="aimto-menu-program"
            >
              <a href="#experience" onClick={() => setActiveMenu(null)}>
                Event Programme
              </a>
              <a
                href="https://aimto.my/side-events.html"
                onClick={() => setActiveMenu(null)}
              >
                Side Events
              </a>
              <a
                href="https://aimto.my/#speakers"
                onClick={() => setActiveMenu(null)}
              >
                Speakers
              </a>
            </div>
          </div>
          <div className={styles.navGroup}>
            <button
              className={styles.navMenuButton}
              type="button"
              aria-haspopup="true"
              aria-expanded={activeMenu === "attend"}
              aria-controls="aimto-menu-attend"
              onClick={() => toggleMenu("attend")}
            >
              Attend <span className={styles.navChevron} aria-hidden="true" />
            </button>
            <div
              className={`${styles.navDropdown} ${
                activeMenu === "attend" ? styles.navDropdownOpen : ""
              }`}
              id="aimto-menu-attend"
            >
              <a href={registrationUrl} onClick={() => setActiveMenu(null)}>
                Tickets
              </a>
              <a href="#campus" onClick={() => setActiveMenu(null)}>
                Get here
              </a>
              <a href="#faq" onClick={() => setActiveMenu(null)}>
                FAQ
              </a>
            </div>
          </div>
          <div className={styles.navGroup}>
            <button
              className={styles.navMenuButton}
              type="button"
              aria-haspopup="true"
              aria-expanded={activeMenu === "about"}
              aria-controls="aimto-menu-about"
              onClick={() => toggleMenu("about")}
            >
              About <span className={styles.navChevron} aria-hidden="true" />
            </button>
            <div
              className={`${styles.navDropdown} ${
                activeMenu === "about" ? styles.navDropdownOpen : ""
              }`}
              id="aimto-menu-about"
            >
              <a href="#experience" onClick={() => setActiveMenu(null)}>
                Experience
              </a>
              <a href="#partners" onClick={() => setActiveMenu(null)}>
                Partners
              </a>
            </div>
          </div>
          <a className={styles.navContact} href="#contact">
            Contact Us
          </a>
        </div>
        <a className={styles.navCta} href={registrationUrl}>
          Secure your seats now <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}
