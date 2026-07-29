"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

type AimtoNavProps = {
  registrationUrl: string;
};

export default function AimtoNav({ registrationUrl }: AimtoNavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={styles.navWrap}>
      <nav
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
          <details className={styles.navGroup}>
            <summary>
              Program <span aria-hidden="true">⌄</span>
            </summary>
            <div className={styles.navDropdown}>
              <a href="#programme">Event Programme</a>
              <a href="https://aimto.my/side-events.html">Side Events</a>
              <a href="https://aimto.my/#speakers">Speakers</a>
            </div>
          </details>
          <details className={styles.navGroup}>
            <summary>
              Attend <span aria-hidden="true">⌄</span>
            </summary>
            <div className={styles.navDropdown}>
              <a href={registrationUrl}>Tickets</a>
              <a href="#campus">Get here</a>
              <a href="#faq">FAQ</a>
            </div>
          </details>
          <details className={styles.navGroup}>
            <summary>
              About <span aria-hidden="true">⌄</span>
            </summary>
            <div className={styles.navDropdown}>
              <a href="#experience">Experience</a>
              <a href="#partners">Partners</a>
            </div>
          </details>
          <a className={styles.navContact} href="#contact">
            Contact Us
          </a>
        </div>
        <a className={styles.navCta} href={registrationUrl}>
          Get tickets <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}
