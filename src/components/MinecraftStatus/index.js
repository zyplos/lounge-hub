import Image from "next/image";
import defaultServerIcon from "../../assets/defaultServerIcon.png";
import MinecraftStatusSkeleton from "../MinecraftStatusSkeleton";
import styles from "./MinecraftStatus.module.css";

function MinecraftStatus(props) {
  const data = props.data;

  if (!data) {
    return <MinecraftStatusSkeleton />;
  }

  if (!data || !data.motd) {
    return <div className={styles.alert}>This server is currently offline.</div>;
  }

  const getPlayerImage = (uuid) => {
    return `https://crafatar.com/avatars/${uuid}?size=64&default=MHF_Steve&overlay`;
  };

  const numPlayersOnline = data.players.online;
  const playerList = data.players.sample;
  const versionName = data.version.name;

  const computedPlural = () => {
    if (!data || !data.players) return "players";
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
    <div className={styles.statusGrid}>
      <div className={styles.statusRow}>
        <div className={styles.iconWrapper}>
          <Image src={data.favicon || defaultServerIcon} alt="server icon" width={64} height={64} />
        </div>
        <div className={styles.motd}>{data.motd.clean}</div>
      </div>
      <div className={styles.statusText}>
        {numPlayersOnline !== 0 ? numPlayersOnline : "No"} {computedPlural()} online
        {versionName ? " • " + versionName : ""}
      </div>
      {numPlayersOnline === 0 && <div className={styles.statusText}>No one's online at the moment.</div>}
      {numPlayersOnline > 0 && playerList && (
        <div className={styles.playerGrid}>
          {playerList.map((player, index) => {
            return (
              <div key={index} className={styles.playerCol}>
                <Image src={getPlayerImage(player.id)} alt="player icon" width={45} height={45} />
                <div className={styles.playerName}>{player.name}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MinecraftStatus; 