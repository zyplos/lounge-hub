import React from 'react';
import styles from './styles.module.css';

function MinecraftStatusSkeleton(props) {
  return (
    <div className={styles.gridContainer} {...props}>
      <div className={styles.flexRow}>
        <div>
          <div className={`${styles.imagePlaceholder} ${styles.animatedBackground}`}></div>
        </div>
        <div className={styles.textPlaceholderContainer}>
          <div>
            <div className={`${styles.textLine1} ${styles.animatedBackground}`}></div>
            <div className={`${styles.textLine2} ${styles.animatedBackground}`}></div>
          </div>
        </div>
      </div>
      <div className={`${styles.fullWidthTextLine} ${styles.animatedBackground}`}></div>
      <div className={styles.playerGrid}>
        {/* Assuming 5 players for skeleton based on "repeat(5, 1fr)" */}
        {[...Array(5)].map((_, i) => (
          <div className={styles.playerItem} key={i}>
            <div className={`${styles.playerImagePlaceholder} ${styles.animatedBackground}`}></div>
            <div className={`${styles.playerNamePlaceholder} ${styles.animatedBackground}`}></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MinecraftStatusSkeleton;
