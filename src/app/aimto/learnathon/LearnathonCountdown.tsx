"use client";

import { useEffect, useState } from "react";
import AimtoButton from "./AimtoButton";
import styles from "./page.module.css";

const eventStart = new Date("2026-08-12T10:00:00+08:00").getTime();

function getRemaining() {
  const difference = Math.max(0, eventStart - Date.now());

  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60),
  };
}

export default function LearnathonCountdown() {
  const [remaining, setRemaining] = useState<ReturnType<
    typeof getRemaining
  > | null>(null);

  useEffect(() => {
    setRemaining(getRemaining());
    const timer = window.setInterval(() => setRemaining(getRemaining()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const units = [
    ["Days", remaining?.days],
    ["Hours", remaining?.hours],
    ["Minutes", remaining?.minutes],
    ["Seconds", remaining?.seconds],
  ] as const;

  return (
    <section
      className={styles.countdown}
      aria-label="Countdown to the Learn-a-thon"
    >
      <div>
        <span className={styles.sectionLabel}>
          THE LEARN-A-THON BEGINS IN_
        </span>
        <div className={styles.countdownUnits}>
          {units.map(([label, value]) => (
            <div key={label}>
              <strong>
                {value === undefined ? "--" : String(value).padStart(2, "0")}
              </strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
      <AimtoButton href="https://event.aimto.my/concierge-menu/registration">
        Secure your seats now <span aria-hidden="true">↗</span>
      </AimtoButton>
    </section>
  );
}
