import type { ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";
import styles from "./styles.module.scss";

interface LinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  tooltip: string;
}

function NewTabIcon() {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: decorative
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentColor"
    >
      <path d="M210-112q-40.43 0-69.21-28.79Q112-169.57 112-210v-540q0-40.42 28.79-69.21Q169.57-848 210-848h289v98H210v540h540v-289h98v289q0 40.43-28.79 69.21Q790.42-112 750-112H210Zm174-203-69-69 366-366h-86v-98h253v253h-98v-86L384-315Z" />
    </svg>
  );
}

export function NewTabLink({ href, children, className, tooltip }: LinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={clsx(styles.linkWrapper, className)}
    >
      <span className={styles.tooltip}>
        {tooltip}
        <NewTabIcon />
      </span>
      {children}
    </a>
  );
}

export function PageLink({ href, children, className, tooltip }: LinkProps) {
  return (
    <Link href={href} className={clsx(styles.linkWrapper, className)}>
      <span className={styles.tooltip}>
        {tooltip}
        <NewTabIcon />
      </span>
      {children}
    </Link>
  );
}
