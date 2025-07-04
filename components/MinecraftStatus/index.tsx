import Image, { type StaticImageData } from "next/image";
import Alert from "../Alert";
import styles from "./styles.module.scss";

import defaultServerIcon from "@/assets/defaultServerIcon.png";

interface PlayerSampleEntry {
  id: string;
  name: string;
}

interface ServerStatusData {
  motd?: {
    raw?: string;
    clean?: string;
    html?: string;
  };
  players: {
    online: number;
    max: number;
    sample?: PlayerSampleEntry[];
  };
  version: {
    name?: string;
    protocol?: number;
  };
  favicon?: string | StaticImageData;
  roundTripLatency?: number;
}

interface MinecraftStatusProps {
  data?: ServerStatusData | null;
}

export default function MinecraftStatus({ data }: MinecraftStatusProps) {
  if (!data) {
    return <LoadingSkeleton />;
  }

  if (!data.motd || !data.players) {
    return (
      <Alert>
        This server is currently offline or its status is unavailable.
      </Alert>
    );
  }

  const getPlayerImage = (uuid: string): string => {
    return `https://crafatar.com/avatars/${uuid}?size=45&default=MHF_Steve&overlay`;
  };

  const numPlayersOnline = data.players?.online || 0;
  const playerList = data.players?.sample || [];
  const versionName = data.version?.name;

  const computedPlural = (): string => {
    return numPlayersOnline === 1 ? "player" : "players";
  };

  // Sort playerList safely by creating a new array
  const sortedPlayerList = [...playerList].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

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
        <p className={styles.motd}>{data.motd?.clean || "(empty motd)"}</p>
      </div>

      <p>
        {numPlayersOnline > 0 ? numPlayersOnline : "No"} {computedPlural()}{" "}
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
              <Image
                src={getPlayerImage(player.id)}
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
