import React, { useState, useEffect } from "react"; // Added useEffect
import Navbar from "../components/Navbar/index";
import HamburgerIcon from "../assets/hamburger.svg";
import styles from "../styles/MainLayout.module.css";

// Local CloseIcon component
const CloseIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="currentColor"
    {...props}
  >
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

function MainLayout({
  noPadding,
  children,
}: {
  noPadding?: boolean;
  children: React.ReactNode;
}) {
  const [isOpen, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640); // 640px = 40em (first breakpoint)
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  function showNavbar() {
    setOpen(!isOpen);
  }

  // Base classes
  let navSectionComputedClass = styles.navbarSectionBase;
  let articleContentComputedClass = styles.articleContent;

  // Add noPadding class if applicable
  if (noPadding) {
    articleContentComputedClass = `${articleContentComputedClass} ${styles.articleContentNoPadding}`;
  }

  // Apply mobile-specific visibility classes based on isOpen
  if (isMobile) {
    if (isOpen) {
      navSectionComputedClass = `${navSectionComputedClass} ${styles.navbarSectionOpenMobile}`;
      articleContentComputedClass = `${articleContentComputedClass} ${styles.articleContentHiddenMobile}`;
    } else {
      // .navbarSectionBase is already display:none on mobile by default (via media query)
      // .articleContent is display:block by default
    }
  }
  // On larger screens, .navbarSectionBase is display:flex and .articleContent is display:block via CSS media queries,
  // so no specific class changes needed here for isOpen state.

  return (
    <div className={styles.appContainer} id="App">
      <div
        id="nav-toggle"
        className={styles.navToggle}
        onClick={showNavbar}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === "Enter" && showNavbar()}
        aria-expanded={isOpen}
        aria-controls="navbar-section"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      >
        {isOpen ? (
          <CloseIcon className={styles.closeIcon} />
        ) : (
          <HamburgerIcon className={styles.hamburgerIcon} />
        )}
      </div>

      {/* The navbar section's visibility on mobile is controlled by navbarSectionOpenMobile or lack thereof.
          On desktop, navbarSectionBase ensures it's visible.
          aria-hidden should reflect true visibility.
      */}
      <section
        className={navSectionComputedClass}
        id="navbar-section"
        aria-hidden={isMobile && !isOpen}
      >
        <Navbar />
      </section>

      {/* The article content's visibility on mobile is controlled by articleContentHiddenMobile.
          On desktop, it's always visible.
      */}
      <article
        className={articleContentComputedClass}
        aria-hidden={isMobile && isOpen}
      >
        {children}
      </article>
    </div>
  );
}

export default MainLayout;
