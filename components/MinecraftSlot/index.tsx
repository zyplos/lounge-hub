import React from "react";
import Image, { StaticImageData } from "next/image"; // Import StaticImageData
import styles from "./styles.module.css";

type SlotType = "normal" | "large" | "result" | "stonecutter";

interface MinecraftSlotProps extends React.HTMLAttributes<HTMLSpanElement> {
  name?: string;
  image?: string | StaticImageData; // Can be a URL string or StaticImageData from import
  amount?: number | null;
  type?: SlotType;
  children?: React.ReactNode; // Explicitly define children
  // className is part of HTMLAttributes
  "data-tooltip-name"?: string; // For the custom data attribute
}

const MinecraftSlot: React.FC<MinecraftSlotProps> = ({
  name,
  image,
  amount,
  type = "normal",
  className = "",
  children,
  ...props
}) => {
  const slotClasses = [
    styles.minecraftSlot,
    type === "large" || type === "result" ? styles.large : "",
    type === "stonecutter" ? styles.stonecutter : "",
    name ? styles.tooltip : "", // Add tooltip class if name is present
    className,
  ]
    .join(" ")
    .trim();

  // Prepare data attribute for tooltip, ensuring it's only added if `name` exists.
  const dataAttributes: { "data-tooltip-name"?: string } = {};
  if (name) {
    dataAttributes["data-tooltip-name"] = name;
  }

  return (
    <span
      className={slotClasses}
      {...dataAttributes} // Spread data attributes
      {...props} // Spread other HTML span attributes
    >
      {image && (
        <div className={styles.imageContainer}>
          <Image
            src={image}
            alt={name || "slot item"}
            width={32} // Use number for width
            height={32} // Use number for height
            layout="fixed"
          />
        </div>
      )}
      {children && !image && (
        <div className={styles.imageContainer}>{children}</div>
      )}
      {amount &&
        amount > 1 && ( // Ensure amount is not null/undefined before checking > 1
          <span className={styles.amountText}>{amount}</span>
        )}
    </span>
  );
};

export default MinecraftSlot;
