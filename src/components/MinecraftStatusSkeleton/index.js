import styles from "./MinecraftStatusSkeleton.module.css";

function MinecraftStatusSkeleton(props) {
  return (
    <div className={styles.statusGrid}>
      <div className={styles.statusRow}>
        <div className={styles.iconSkeleton}></div>
        <div className={styles.textSkeletonCol}>
          <div className={styles.textSkeleton} style={{ width: 180 }}></div>
          <div className={styles.textSkeleton} style={{ width: 260 }}></div>
        </div>
      </div>
      <div className={styles.textSkeleton} style={{ width: 260 }}></div>
      <div className={styles.playerGrid}>
        <div className={styles.playerCol}>
          <div className={styles.playerIconSkeleton}></div>
          <div className={styles.textSkeleton} style={{ width: 80 }}></div>
        </div>
      </div>
    </div>
  );
}

export default MinecraftStatusSkeleton; 