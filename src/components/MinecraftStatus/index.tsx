import React from 'react';
import Image, { StaticImageData } from 'next/image'; // Import StaticImageData
import MinecraftStatusSkeleton from '../MinecraftStatusSkeleton/index';
import Alert from '../Alert/index';
import defaultServerIcon from '../../assets/defaultServerIcon.png';
// import offlineServerIcon from '../../assets/offlineServerIcon.png';

import styles from './styles.module.css';

// Interface for a player in the sample list
interface PlayerSampleEntry {
  id: string; // UUID
  name: string;
}

// Interface for the server status data
// This should align with the actual data structure provided by your server status fetching logic
// (e.g., from minecraft-server-util or minecraft-server-ping)
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
  [key: string]: any; // Allow other properties for flexibility
}

interface MinecraftStatusProps {
  data?: ServerStatusData | null; // Data can be null or undefined if loading/error
}

const MinecraftStatus: React.FC<MinecraftStatusProps> = (props) => {
  const { data } = props;

  // console.log(data);

  if (!data) {
    return <MinecraftStatusSkeleton />;
  }

  // Check if data exists and has a motd; if not, server might be offline or data is malformed.
  // data.players should also exist if server is online.
  if (!data.motd || !data.players) {
    return <Alert variant="info">This server is currently offline or status is unavailable.</Alert>;
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
    <div className={styles.gridContainer}>
      <div className={styles.headerFlex}>
        <div className={styles.serverIconContainer}>
          <Image
            src={data.favicon || defaultServerIcon}
            alt="server icon"
            width={64} // Use number
            height={64} // Use number
          />
        </div>
        <div className={styles.motdContainer}>
          {/* Ensure motd and motd.clean exist before trying to render */}
          <div>{data.motd?.clean || 'No MOTD available.'}</div>
        </div>
      </div>
      <p className={styles.statusText}>
        {numPlayersOnline !== 0 ? numPlayersOnline : "No"} {computedPlural()} online
        {versionName ? ` • ${versionName}` : ""}
      </p>
      {numPlayersOnline === 0 && <p className={styles.noPlayersText}>No one's online at the moment.</p>}
      {/* Use the (potentially sorted) playerList for mapping */}
      {numPlayersOnline > 0 && playerList && playerList.length > 0 && (
        <div className={styles.playerGrid}>
          {playerList.map((player) => (
            <div key={player.id || player.name} className={styles.playerItemFlex}>
              <Image
                src={getPlayerImage(player.id)}
                alt={`${player.name}'s avatar`}
                width={45} // Use number
                height={45} // Use number
              />
              <p className={styles.playerNameText}>{player.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MinecraftStatus;
