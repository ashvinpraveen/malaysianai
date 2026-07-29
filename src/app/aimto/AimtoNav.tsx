"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import AimtoButton from "./AimtoButton";
import styles from "./page.module.css";

type AimtoNavProps = {
  registrationUrl: string;
};

type MenuId = "program" | "attend" | "about";

export default function AimtoNav({ registrationUrl }: AimtoNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuId | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setActiveMenu(null);
      setMobileOpen(false);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const closeFromOutside = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setActiveMenu(null);
        setMobileOpen(false);
      }
    };

    const closeWithKeyboard = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      if (mobileOpen) {
        mobileToggleRef.current?.focus();
      } else {
        navRef.current
          ?.querySelector<HTMLButtonElement>('[aria-expanded="true"]')
          ?.focus();
      }
      setActiveMenu(null);
      setMobileOpen(false);
    };

    document.addEventListener("pointerdown", closeFromOutside);
    document.addEventListener("keydown", closeWithKeyboard);

    return () => {
      document.removeEventListener("pointerdown", closeFromOutside);
      document.removeEventListener("keydown", closeWithKeyboard);
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  const toggleMenu = (menu: MenuId) => {
    setActiveMenu((currentMenu) => (currentMenu === menu ? null : menu));
  };

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header className={styles.navWrap}>
      <nav
        ref={navRef}
        className={`${styles.nav} ${scrolled ? styles.navScrolled : ""} ${
          mobileOpen ? styles.navMobileOpen : ""
        }`}
        aria-label="AI Malaysia Takeover"
      >
        <a
          className={styles.brand}
          href="#top"
          aria-label="AI Malaysia Takeover home"
        >
          <Image
            src="/aimto-assets/logo-white.png"
            alt="AI Malaysia Takeover 2026"
            width={600}
            height={113}
            sizes="188px"
            priority
          />
        </a>
        <div className={styles.navLinks}>
          <div
            className={styles.navGroup}
            onPointerEnter={() => setActiveMenu("program")}
            onPointerLeave={() => setActiveMenu(null)}
          >
            <button
              className={styles.navMenuButton}
              type="button"
              aria-haspopup="true"
              aria-expanded={activeMenu === "program"}
              aria-controls="aimto-menu-program"
              onClick={() => toggleMenu("program")}
              onFocus={() => setActiveMenu("program")}
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
          <div
            className={styles.navGroup}
            onPointerEnter={() => setActiveMenu("attend")}
            onPointerLeave={() => setActiveMenu(null)}
          >
            <button
              className={styles.navMenuButton}
              type="button"
              aria-haspopup="true"
              aria-expanded={activeMenu === "attend"}
              aria-controls="aimto-menu-attend"
              onClick={() => toggleMenu("attend")}
              onFocus={() => setActiveMenu("attend")}
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
          <div
            className={styles.navGroup}
            onPointerEnter={() => setActiveMenu("about")}
            onPointerLeave={() => setActiveMenu(null)}
          >
            <button
              className={styles.navMenuButton}
              type="button"
              aria-haspopup="true"
              aria-expanded={activeMenu === "about"}
              aria-controls="aimto-menu-about"
              onClick={() => toggleMenu("about")}
              onFocus={() => setActiveMenu("about")}
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
        <AimtoButton className={styles.navCta} href={registrationUrl}>
          Secure your seats now <span aria-hidden="true">↗</span>
        </AimtoButton>
        <div className={styles.mobileNavActions}>
          <AimtoButton
            className={styles.mobileJoinCta}
            href={registrationUrl}
          >
            Join <span aria-hidden="true">↗</span>
          </AimtoButton>
          <button
            ref={mobileToggleRef}
            className={styles.mobileMenuToggle}
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="aimto-mobile-menu"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => {
              setActiveMenu(null);
              setMobileOpen((isOpen) => !isOpen);
            }}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <div
          className={`${styles.mobileMenu} ${
            mobileOpen ? styles.mobileMenuOpen : ""
          }`}
          id="aimto-mobile-menu"
        >
          <div className={styles.mobileMenuGroup}>
            <span>Program_</span>
            <a href="#experience" onClick={closeMobileMenu}>
              Event Programme
            </a>
            <a href="https://aimto.my/side-events.html" onClick={closeMobileMenu}>
              Side Events
            </a>
            <a href="https://aimto.my/#speakers" onClick={closeMobileMenu}>
              Speakers
            </a>
          </div>
          <div className={styles.mobileMenuGroup}>
            <span>Attend_</span>
            <a href={registrationUrl} onClick={closeMobileMenu}>
              Tickets
            </a>
            <a href="#campus" onClick={closeMobileMenu}>
              Get here
            </a>
            <a href="#faq" onClick={closeMobileMenu}>
              FAQ
            </a>
          </div>
          <div className={styles.mobileMenuGroup}>
            <span>About_</span>
            <a href="#experience" onClick={closeMobileMenu}>
              Experience
            </a>
            <a href="#partners" onClick={closeMobileMenu}>
              Partners
            </a>
            <a href="#contact" onClick={closeMobileMenu}>
              Contact Us
            </a>
          </div>
          <AimtoButton
            className={styles.mobileMenuCta}
            href={registrationUrl}
            onClick={closeMobileMenu}
          >
            Secure your seats now <span aria-hidden="true">↗</span>
          </AimtoButton>
        </div>
      </nav>
    </header>
  );
}
