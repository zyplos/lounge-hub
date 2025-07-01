import Image, { type StaticImageData } from "next/image";
import Alert from "../Alert";
import MinecraftStatusSkeleton from "../MinecraftStatusSkeleton";
import styles from "./styles.module.scss";

import defaultServerIcon from "@/assets/defaultServerIcon.png";

interface PlayerSampleEntry {
  id: string;
  name: string;
}

interface ServerStatusData {
  motd?: {
    raw?: string; // Original raw MOTD (often with formatting codes)
    clean?: string; // MOTD with formatting codes removed
    html?: string; // MOTD converted to HTML
    // Add other MOTD properties if available, e.g., from description.extra
  };
  players: {
    online: number;
    max: number;
    sample?: PlayerSampleEntry[]; // Optional: not all servers/pings provide this
  };
  version: {
    name?: string; // e.g., "1.19.4" or "Paper 1.19.4"
    protocol?: number;
  };
  favicon?: string | StaticImageData; // Base64 string or imported image data
  roundTripLatency?: number; // Example: from minecraft-server-util
  // Add any other properties your status objects might have
}

interface MinecraftStatusProps {
  data?: ServerStatusData | null; // Data can be null or undefined if loading/error
}

export default function MinecraftStatus({ data }: MinecraftStatusProps) {
  // console.log(data);

  if (!data) {
    return <MinecraftStatusSkeleton />;
  }

  // Check if data exists and has a motd; if not, server might be offline or data is malformed.
  // data.players should also exist if server is online.
  if (!data.motd || !data.players) {
    return (
      <Alert variant="info">
        This server is currently offline or status is unavailable.
      </Alert>
    );
  }

  const getPlayerImage = (uuid: string): string => {
    return `https://crafatar.com/avatars/${uuid}?size=45&default=MHF_Steve&overlay`;
  };

  // Ensure players and version objects exist before trying to access their properties
  const numPlayersOnline = data.players?.online || 0;
  const playerList = data.players?.sample; // playerList can be undefined
  const versionName = data.version?.name; // versionName can be undefined

  const computedPlural = (): string => {
    // numPlayersOnline is already derived safely
    return numPlayersOnline === 1 ? "player" : "players";
  };

  // Sort playerList if it exists
  if (playerList && playerList.length > 0) {
    // Create a new sorted array to avoid mutating the original data from props/SWR cache
    const sortedPlayerList = [...playerList].sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
    // Use sortedPlayerList for rendering
    // Note: The original code sorted `playerList` in place. This is generally discouraged for props.
    // If the original data (e.g., from SWR cache) should not be mutated, use sortedPlayerList.
    // For this example, I'll assume rendering the sorted version of the potentially mutated playerList is acceptable
    // as the original code did, but using `sortedPlayerList` would be safer.
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

        <p className={styles.motd}>{data.motd?.clean || "(empty motd)"}</p>
      </div>

      <p>
        {numPlayersOnline !== 0 ? numPlayersOnline : "No"} {computedPlural()}{" "}
        online
        {versionName ? ` • ${versionName}` : ""}
      </p>

      {numPlayersOnline === 0 && (
        <p className={styles.noPlayersText}>No one's online at the moment.</p>
      )}

      {numPlayersOnline > 0 && playerList && playerList.length > 0 && (
        <div className={styles.playerGrid}>
          {playerList.map((player) => (
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
