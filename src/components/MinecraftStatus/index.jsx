import React from 'react';
import Image from 'next/image'; // Still using Next.js Image
import MinecraftStatusSkeleton from '../MinecraftStatusSkeleton/index';
import Alert from '../Alert/index'; // New Alert component
import defaultServerIcon from '../../assets/defaultServerIcon.png'; // Corrected path assuming assets are relative to src
// import offlineServerIcon from '../../assets/offlineServerIcon.png'; // Not used in the provided code snippet

import styles from './styles.module.css';

function MinecraftStatus(props) {
  const { data } = props; // Only ip was not used from original props

  // console.log(data); // Keep for debugging if necessary

  if (!data) {
    return <MinecraftStatusSkeleton />;
  }

  if (!data.motd) { // Simplified check, original was !data || !data.motd
    return <Alert variant="info">This server is currently offline.</Alert>; // Using new Alert, assuming 'info' variant is default or suitable
  }

  const getPlayerImage = (uuid) => {
    return `https://crafatar.com/avatars/${uuid}?size=45&default=MHF_Steve&overlay`; // size 45 to match image width
  };

  const numPlayersOnline = data.players.online;
  const playerList = data.players.sample;
  const versionName = data.version.name;

  const computedPlural = () => {
    if (!data.players) return "players"; // Simplified from original
    return numPlayersOnline === 1 ? "player" : "players";
  };

  if (numPlayersOnline > 0 && playerList) {
    playerList.sort(function (a, b) {
      var nameA = a.name.toUpperCase();
      var nameB = b.name.toUpperCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  }

  return (
    <div className={styles.gridContainer}>
      <div className={styles.headerFlex}>
        <div className={styles.serverIconContainer}>
          <Image src={data.favicon || defaultServerIcon} alt="server icon" width="64px" height="64px" />
        </div>
        <div className={styles.motdContainer}>
          <div>{data.motd.clean}</div>
        </div>
      </div>
      <p className={styles.statusText}>
        {numPlayersOnline !== 0 ? numPlayersOnline : "No"} {computedPlural()} online
        {versionName ? ` • ${versionName}` : ""}
      </p>
      {numPlayersOnline === 0 && <p className={styles.noPlayersText}>No one's online at the moment.</p>}
      {numPlayersOnline > 0 && playerList && (
        <div className={styles.playerGrid}>
          {playerList.map((player) => ( // Index removed as key can be player.id if unique
            <div key={player.id || player.name} className={styles.playerItemFlex}>
              <Image src={getPlayerImage(player.id)} alt={`${player.name}'s avatar`} width="45px" height="45px" />
              <p className={styles.playerNameText}>{player.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MinecraftStatus;
