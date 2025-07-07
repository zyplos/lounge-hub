import Image, { type StaticImageData } from "next/image";
import styles from "./styles.module.scss";

interface PlayerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  playerUuid: string;
  playerName: string;
  watermarkUrl?: string | StaticImageData;
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
        src={`https://vzge.me/full/384/${playerUuid}`}
        alt={`${playerName}'s portrait`}
        width="198"
        height="320"
        priority
        quality={100}
        className={styles.playerPortrait}
      />

      <div className={styles.playerInfoGrid}>{children}</div>

      {watermarkUrl && (
        <Image
          src={watermarkUrl}
          alt=""
          width="45"
          height="45"
          className={styles.communityWatermark}
        />
      )}
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

//

interface PlayerHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export function PlayerHeading({
  className,
  children,
  ...props
}: PlayerHeadingProps) {
  return (
    <h1 className={`${styles.playerNameHeading} ${className || ""}`} {...props}>
      {children}
    </h1>
  );
}
