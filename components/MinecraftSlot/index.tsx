import Image, { type StaticImageData } from "next/image";
import styles from "./styles.module.css";
import clsx from "clsx";

type SlotType = "normal" | "large" | "result" | "stonecutter";

interface MinecraftSlotProps extends React.HTMLAttributes<HTMLSpanElement> {
  name?: string;
  image?: string | StaticImageData;
  amount?: number | null;
  type?: SlotType;
  children?: React.ReactNode;
}

export default function MinecraftSlot({
  name,
  image,
  amount,
  type = "normal",
  className = "",
  children,
  ...props
}: MinecraftSlotProps) {
  const dataAttributes: { "data-tooltip-name"?: string } = {};
  if (name) {
    dataAttributes["data-tooltip-name"] = name;
  }

  return (
    <span
      className={clsx(
        styles.minecraftSlot,
        {
          [styles.large]:
            type === "large" || type === "result" || type === "stonecutter",
          [styles.stonecutter]: type === "stonecutter",
          [styles.tooltip]: name,
        },
        className
      )}
      {...dataAttributes}
      {...props}
    >
      {image && (
        <Image
          src={image}
          alt={name || "slot item"}
          width={32}
          height={32}
          quality={100}
          className={styles.itemImage}
        />
      )}

      {children && !image && (
        <div className={styles.imageContainer}>{children}</div>
      )}

      {amount && amount > 1 && (
        <span className={styles.amountText}>{amount}</span>
      )}
    </span>
  );
}
