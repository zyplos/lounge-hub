import React from "react";
import styles from "./styles.module.css";

interface SpinnerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  // Omit 'title' from HTMLAttributes as we handle it explicitly.
  // If other div props like id, style, custom data-* attributes are needed, they can be passed.
  title?: string;
  size?: string | number; // Kept for compatibility, though not used by this spinner's styles
}

const Spinner: React.FC<SpinnerProps> = ({
  title,
  size, // size is destructured but not used
  className, // Capture className if passed
  ...props
}) => {
  const combinedClassName = `${styles.spinner} ${className || ""}`.trim();
  return (
    <div
      className={combinedClassName}
      title={title} // Explicitly set title attribute
      {...props} // Spread other passed HTMLDivElement attributes
    ></div>
  );
};

export default Spinner;
