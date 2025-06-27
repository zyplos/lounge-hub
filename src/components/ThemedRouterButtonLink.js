import Link from "next/link";
import styles from "./styles.module.css";

function ThemedRouterButtonLink({ href, children, className = '', ...props }) {
  return (
    <Link href={href} passHref legacyBehavior>
      <a className={styles.button + ' ' + className} {...props}>
        {children}
      </a>
    </Link>
  );
}

export default ThemedRouterButtonLink;
