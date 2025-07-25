import { useState } from "react";
import clsx from "clsx";
import Navbar from "@/components/Navbar/index";

import styles from "./styles.module.scss";

interface MainLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
  children: React.ReactNode;
}

export default function MainLayout({
  noPadding,
  children,
  className,
  ...props
}: MainLayoutProps) {
  const [isOpen, setOpen] = useState(false);

  function showNavbar() {
    setOpen(!isOpen);
  }

  return (
    <div className={clsx(styles.mainLayoutWrapper, className)} {...props}>
      <button
        type="button"
        className={styles.navToggle}
        //
        onClick={showNavbar}
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && showNavbar()}
        //
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      >
        {isOpen ? <CloseIcon /> : <HamburgerIcon />}
      </button>

      <section
        className={clsx(styles.navbarWrapper, {
          [styles.hide]: !isOpen,
          [styles.show]: isOpen,
        })}
      >
        <Navbar />
      </section>

      <main
        className={clsx(styles.mainWrapper, {
          [styles.noPadding]: noPadding,
          [styles.hide]: isOpen,
        })}
      >
        {!noPadding && <div className={styles.coolRoundedThing} />}
        {children}
      </main>
    </div>
  );
}

//
function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="currentColor"
      className={styles.closeIcon}
    >
      <title>Close</title>
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="currentColor"
      className={styles.hamburgerIcon}
    >
      <title>Open Navbar</title>
      <rect width="24" height="4.56" />
      <rect y="9.72" width="24" height="4.56" />
      <rect y="19.44" width="24" height="4.56" />
    </svg>
  );
}
