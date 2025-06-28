import React from "react";
import FullBox from "../FullBox"; // Will resolve to ../FullBox/index.tsx
import styles from "./styles.module.css";

// Assuming FullBoxProps are defined elsewhere or it accepts standard div attributes.
// For now, let's assume it can take basic HTMLDivElement attributes if not specifically defined.
// If FullBox has its own specific props, those should be included or extended.
interface ErrorFullBoxProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  header: React.ReactNode; // Allow more than just string for header
  text: React.ReactNode; // Allow more than just string for text
  // Any specific props for FullBox that ErrorFullBox might control can be added here.
  // For example, if ErrorFullBox always sets `useDims` and `usePadding` on FullBox,
  // those might not need to be in ErrorFullBoxProps unless you want to override them.
}

const ErrorFullBox: React.FC<ErrorFullBoxProps> = ({
  header,
  text,
  ...props
}) => {
  return (
    // Assuming useDims and usePadding are props of FullBox
    // If they are always true when using ErrorFullBox, they don't need to be in ErrorFullBoxProps
    <FullBox useDims usePadding {...props}>
      <p className={`text-fullbox ${styles.headerText}`}>{header}</p>
      <p className={styles.bodyText}>{text}</p>
    </FullBox>
  );
};

export default ErrorFullBox;
