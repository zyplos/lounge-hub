import Image from "next/image";
import styles from "./MinecraftSlot.module.css";

function MinecraftSlot({ name, image, amount, type = "normal", ...props }) {
  const squareDimensions = type === "normal" ? 32 : 52;
  const slotClass = [
    styles.minecraftSlot,
    styles[type],
    name ? styles.hasTooltip : '',
  ].join(' ');

  return (
    <span
      className={slotClass}
      style={{ width: squareDimensions, height: squareDimensions }}
      {...props}
    >
      {name && image && (
        <div className={styles.imageWrapper}>
          <Image src={image} alt={name} width={32} height={32} />
        </div>
      )}
      {amount > 1 && (
        <span className={styles.amount}>{amount}</span>
      )}
      {name && <span className={styles.tooltip}>{name}</span>}
    </span>
  );
}

export default MinecraftSlot; 