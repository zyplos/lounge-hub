import React from 'react';
import Image from 'next/image';
import styles from './styles.module.css';

function MinecraftSlot({ name, image, amount, type = "normal", className = '', children, ...props }) {
  // `type` can be "normal", "large" (for 52px), or "stonecutter"
  // "result" type from MinecraftResultSlot will also use "large"

  const slotClasses = [
    styles.minecraftSlot,
    type === 'large' || type === 'result' ? styles.large : '',
    type === 'stonecutter' ? styles.stonecutter : '',
    name ? styles.tooltip : '', // Add tooltip class if name is present
    className
  ].join(' ').trim();

  // Pass the name to the data attribute for the CSS tooltip
  const dataTooltipName = name ? { 'data-tooltip-name': name } : {};

  return (
    <span
      className={slotClasses}
      {...dataTooltipName}
      {...props}
    >
      {image && ( // If there's an image prop, display it
        <div className={styles.imageContainer}>
          <Image src={image} alt={name || 'slot item'} width="32px" height="32px" layout="fixed" />
        </div>
      )}
      {children && !image && ( // If there are children and no image, render children (e.g. for custom content in slot)
         <div className={styles.imageContainer}> {/* Use imageContainer for positioning children too */}
            {children}
         </div>
      )}
      {amount > 1 && (
        <span className={styles.amountText}>
          {amount}
        </span>
      )}
    </span>
  );
}

export default MinecraftSlot;
