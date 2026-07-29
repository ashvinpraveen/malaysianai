"use client";

import { useEffect } from "react";

type AimtoMotionProps = {
  rootId: string;
};

export default function AimtoMotion({ rootId }: AimtoMotionProps) {
  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;

    const previousDocumentBackground =
      document.documentElement.style.backgroundColor;
    const previousBodyBackground = document.body.style.backgroundColor;
    const previousColorScheme = document.documentElement.style.colorScheme;

    document.documentElement.style.backgroundColor = "#070707";
    document.documentElement.style.colorScheme = "dark";
    document.body.style.backgroundColor = "#070707";

    const motionQuery = window.matchMedia(
      "(min-width: 769px) and (prefers-reduced-motion: no-preference)",
    );
    let observer: IntersectionObserver | null = null;

    const setUpReveals = () => {
      observer?.disconnect();
      observer = null;
      delete root.dataset.motion;

      if (!motionQuery.matches) return;

      const revealItems = Array.from(
        root.querySelectorAll<HTMLElement>("[data-reveal]"),
      );
      const firstViewBoundary = window.innerHeight * 0.92;

      for (const item of revealItems) {
        if (item.getBoundingClientRect().top <= firstViewBoundary) {
          item.dataset.revealed = "true";
        } else {
          delete item.dataset.revealed;
        }
      }

      root.dataset.motion = "ready";
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;

            (entry.target as HTMLElement).dataset.revealed = "true";
            observer?.unobserve(entry.target);
          }
        },
        {
          rootMargin: "0px 0px -10% 0px",
          threshold: 0.12,
        },
      );

      for (const item of revealItems) {
        if (item.dataset.revealed !== "true") observer.observe(item);
      }
    };

    setUpReveals();
    motionQuery.addEventListener("change", setUpReveals);

    return () => {
      observer?.disconnect();
      motionQuery.removeEventListener("change", setUpReveals);
      delete root.dataset.motion;
      document.documentElement.style.backgroundColor =
        previousDocumentBackground;
      document.documentElement.style.colorScheme = previousColorScheme;
      document.body.style.backgroundColor = previousBodyBackground;
    };
  }, [rootId]);

  return null;
}
