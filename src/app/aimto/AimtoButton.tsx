import type { AnchorHTMLAttributes, ReactNode } from "react";
import styles from "./page.module.css";

type AimtoButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

export default function AimtoButton({
  children,
  className = "",
  ...props
}: AimtoButtonProps) {
  return (
    <a className={`${styles.ctaButton} ${className}`.trim()} {...props}>
      {children}
    </a>
  );
}
