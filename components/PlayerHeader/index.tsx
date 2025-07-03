import Image, { type StaticImageData } from "next/image";
import styles from "./styles.module.scss";

interface PlayerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  playerUuid: string;
  playerName: string;
  watermarkUrl: string | StaticImageData;
}

export default function PlayerHeader({
  playerUuid,
  playerName,
  watermarkUrl,
  style,
  className,
  children,
  ...props
}: PlayerHeaderProps) {
  return (
    <div
      className={`${styles.playerHeader} ${className || ""}`}
      style={style}
      {...props}
    >
      <Image
        src={`https://visage.surgeplay.com/full/304/${playerUuid}`}
        alt={`${playerName}'s portrait`}
        width="198"
        height="320"
        priority
        quality={100}
        className={styles.playerPortrait}
      />

      <div className={styles.playerInfoGrid}>
        <h1 className={styles.playerNameHeading}>{playerName}</h1>

        {children}
      </div>

      <Image
        src={watermarkUrl}
        alt=""
        width="45"
        height="45"
        className={styles.communityWatermark}
      />
    </div>
  );
}

//

interface PlayerDetailProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export function PlayerDetail({
  className,
  children,
  ...props
}: PlayerDetailProps) {
  return (
    <p className={`${styles.playerDetailText} ${className || ""}`} {...props}>
      {children}
    </p>
  );
}
