import React from "react";
import styles from "./styles.module.css";

interface SmallCardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  // Omit 'style' from HTMLAttributes to handle it explicitly for merging if necessary,
  // or to make it clear that this component controls gridTemplateColumns.
  // If external style prop needs to be merged, it can be added back: style?: React.CSSProperties;
  width?: string; // Represents the minmax width for grid items
  children: React.ReactNode;
  // className is part of HTMLAttributes
}

const SmallCardGrid: React.FC<SmallCardGridProps> = ({
  width = "260px",
  children,
  className = "",
  style, // Capture external style prop if provided
  ...props
}) => {
  // Internal style for grid behavior
  const internalGridStyle: React.CSSProperties = {
    gridTemplateColumns: `repeat(auto-fill, minmax(${width}, 1fr))`,
  };

  // Merge internal style with any passed-in style prop
  const combinedStyle = { ...internalGridStyle, ...style };

  const combinedClassName = `${styles.smallCardGrid} ${className}`.trim();

  return (
    <div className={combinedClassName} style={combinedStyle} {...props}>
      {children}
    </div>
  );
};

export default SmallCardGrid;
