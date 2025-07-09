import Image from "next/image";
import Alert from "../Alert";
import type { MinecraftServerStatusResult } from "@/internals/apiTypes";
import styles from "./styles.module.scss";

import defaultServerIcon from "@/assets/defaultServerIcon.png";

interface MinecraftStatusProps {
  data: MinecraftServerStatusResult;
}

export default function MinecraftStatus({ data }: MinecraftStatusProps) {
  if (!data) {
    return <LoadingSkeleton />;
  }

  if ("message" in data) {
    return <Alert>{data.message}</Alert>;
  }

  const numPlayersOnline = data.players.online;
  const playerList = data.players.sample || [];
  const versionName = data.version.name;

  const computedPlayerPlural = numPlayersOnline === 1 ? "player" : "players";

  // Sort playerList safely by creating a new array
  const sortedPlayerList = [...playerList].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  let motdString: string | null = null;
  if (data.description) {
    if (typeof data.description === "string") {
      motdString = data.description;
    } else {
      motdString = data.description.text;
    }
  }

  return (
    <div className={styles.serverDisplayContainer}>
      <div className={styles.motdWrapper}>
        <Image
          src={data.favicon || defaultServerIcon}
          alt="server icon"
          width={64}
          height={64}
          className={styles.serverIcon}
        />

        {data.description && <p className={styles.motd}>{motdString}</p>}

        {!motdString && (
          <p className={`${styles.motd} textMuted`}>(empty motd)</p>
        )}
      </div>

      <p>
        {numPlayersOnline > 0 ? numPlayersOnline : "No"} {computedPlayerPlural}{" "}
        online
        {versionName ? ` • ${versionName}` : ""}
      </p>

      {numPlayersOnline === 0 && (
        <p className="textMuted">No one's online at the moment.</p>
      )}

      {numPlayersOnline > 0 && sortedPlayerList.length > 0 && (
        <div className={styles.playerGrid}>
          {sortedPlayerList.map((player) => (
            <div key={player.id || player.name} className={styles.playerItem}>
              {/** biome-ignore lint/performance/noImgElement: visage doesn't seem to like <Image /> */}
              <img
                src={`https://vzge.me/face/256/${player.id}`}
                alt={`${player.name}'s portrait`}
                width={45}
                height={45}
              />
              <p className={styles.playerNameText}>{player.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className={styles.serverDisplayContainer}>
      <div className={styles.motdWrapper}>
        <div className={`${styles.skeleton} ${styles.skeletonIcon}`} />
        <div className={styles.motd}>
          <div className={`${styles.skeleton} ${styles.skeletonText}`} />
          <div className={`${styles.skeleton} ${styles.skeletonTextShort}`} />
        </div>
      </div>

      <div className={`${styles.skeleton} ${styles.skeletonTextLine}`} />

      <div className={styles.playerGrid}>
        {Array.from({ length: 3 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: array doesn't change
          <div key={i} className={styles.playerItem}>
            <div className={`${styles.skeleton} ${styles.skeletonAvatar}`} />
            <div
              className={`${styles.skeleton} ${styles.skeletonPlayerName}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
