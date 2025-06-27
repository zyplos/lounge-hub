import { useState } from "react";
import HamburgerIcon from "../assets/hamburger.svg";
import Navbar from "../components/Navbar";
import styles from "./MainLayout.module.css";

function MainLayout({ noPadding, children, ...props }: { noPadding?: boolean, children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);

  function showNavbar() {
    setOpen(!isOpen);
    console.log("ouguh");
  }

  return (
    <div className={styles.root} id="App">
      <div
        id="nav-toggle"
        className={styles.navToggle}
        onClick={showNavbar}
      >
        {isOpen ? <span className={styles.closeIcon}>&times;</span> : <HamburgerIcon className={styles.hamburgerIcon} />}
      </div>
      <section className={isOpen ? styles.navSectionOpen : styles.navSection}>
        <Navbar />
      </section>
      <article className={isOpen ? styles.articleClosed : styles.articleOpen}>
        {children}
      </article>
    </div>
  );
}

export default MainLayout;
