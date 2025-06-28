import React from "react";
import styles from "./styles.module.css";

// Props for SVG elements can be extensive. React.SVGProps covers standard ones.
interface MinecraftResultArrowProps extends React.SVGProps<SVGSVGElement> {
  // No custom props defined, but could be added here if needed
  // For example: title?: string; to add a <title> element for accessibility
}

const MinecraftResultArrow: React.FC<MinecraftResultArrowProps> = (props) => {
  // Combine with default className from styles, allowing override or addition via props.className
  const combinedClassName =
    `${styles.arrowSvg} ${props.className || ""}`.trim();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 90.93 62"
      {...props} // Spread all props, including any passed className, id, etc.
      className={combinedClassName} // Ensure our specific className logic is applied
    >
      <polygon points="86.8 28.93 86.8 24.8 82.67 24.8 82.67 20.67 78.53 20.67 78.53 16.53 74.4 16.53 74.4 12.4 70.27 12.4 70.27 8.27 66.13 8.27 66.13 4.13 62 4.13 62 0 57.87 0 57.87 24.8 0 24.8 0 37.2 57.87 37.2 57.87 62 62 62 62 57.87 66.13 57.87 66.13 53.73 70.27 53.73 70.27 49.6 74.4 49.6 74.4 45.47 78.53 45.47 78.53 41.33 82.67 41.33 82.67 37.2 86.8 37.2 86.8 33.07 90.93 33.07 90.93 28.93 86.8 28.93" />
    </svg>
  );
};

export default MinecraftResultArrow;
