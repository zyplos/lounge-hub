import React from "react";
import useSWR from "swr";
import { mapUrlBase, DimensionInternalNameMap, DimensionColorMap, findChunkCenter, prettyPrintDate, prettyPrintDateAndTime } from "../../../../../../internals/Utils";
import { useRouter } from "next/router";
import Image from "next/image";
import CalendarIcon from "../../../../../../assets/calendar-icon.svg";
import PlayerIcon from "../../../../../../assets/player-icon.png";
import ErrorFullBox from "../../../../../../components/ErrorFullBox";
import LoadingFullBox from "../../../../../../components/LoadingFullBox";
import MainLayout from "../../../../../../internals/MainLayout";
import styles from "./styles.module.css";

const ChunkCard = ({ enteredTime, playerUUID, name }) => {
  return (
    <div className={styles.chunkCard}>
      <div className={styles.chunkCardAvatar}>
        <Image src={`https://crafatar.com/avatars/${playerUUID}?size=64&overlay`} alt={`${name}'s Head`} width={64} height={64} />
      </div>
      <div className={styles.chunkCardInfo}>
        <div className={styles.chunkCardName}>{name}</div>
        <div className={styles.chunkCardVisited}>Visited {prettyPrintDateAndTime(enteredTime)}</div>
      </div>
    </div>
  );
};

function VisitorsLog() {
  const router = useRouter();
  const { uuid, x, z } = router.query;
  const { data: logData, error: logError } = useSWR(`/api/minecraft/logEntryByCoords?x=${x}&z=${z}&dimension=${uuid}`);
  const { data: chunkData, error: chunkError } = useSWR(`/api/minecraft/chunkByCoords?x=${x}&z=${z}&dimension=${uuid}`);

  if (!uuid || !x || !z) {
    return (
      <MainLayout>
        <ErrorFullBox message="Invalid query" />
      </MainLayout>
    );
  }
  if (logError) {
    return (
      <MainLayout>
        <ErrorFullBox header={logError.status} text="Error getting log data." />
      </MainLayout>
    );
  }
  if (chunkError) {
    return (
      <MainLayout>
        <ErrorFullBox header={chunkData.status} text="Error getting chunk data." />
      </MainLayout>
    );
  }
  if (!logData) {
    return <LoadingFullBox text="Grabbing log entries..." />;
  }
  if (!chunkData) {
    return <LoadingFullBox text="Loading chunk data..." />;
  }
  if (chunkData.data.length === 0 || logData.data.length === 0) {
    return (
      <MainLayout>
        <ErrorFullBox header="404" text="This chunk has no data." />
      </MainLayout>
    );
  }
  const newCoords = findChunkCenter(x, z);
  const ownedChunk = chunkData.data[0];
  return (
    <MainLayout noPadding>
      <div className={styles.layout}>
        <div className={styles.leftPanel} style={{ background: DimensionColorMap[ownedChunk.dimension] }}>
          <div className={styles.ownerHeader}>
            <div className={styles.ownerAvatar}>
              <Image
                src={`https://visage.surgeplay.com/full/304/${ownedChunk.player_id}`}
                alt={`${ownedChunk.name}'s portrait`}
                width={198}
                height={320}
                priority
              />
            </div>
            <div className={styles.ownerInfo}>
              <div className={styles.chunkTitle}>Chunk ({x}, {z})</div>
              <div className={styles.ownerName}><Image src={PlayerIcon} alt="Head Icon" width={20} height={20} /> <span>Owned by {ownedChunk.name}</span></div>
              <div className={styles.ownerClaimed}><CalendarIcon className={styles.calendarIcon} /> Claimed {prettyPrintDate(new Date(ownedChunk.claimed_on))}</div>
            </div>
          </div>
          <div className={styles.visitorLog}>
            {logData.data.length === 0 && <div>Seems no one has visited this chunk yet.</div>}
            {logData.data.map((logEntry, index) => {
              return <ChunkCard key={index} enteredTime={new Date(logEntry.entered_time)} playerUUID={logEntry.player_id} name={logEntry.name} />;
            })}
          </div>
        </div>
        <div className={styles.rightPanel}>
          <iframe
            className={styles.mapIframe}
            src={`${mapUrlBase}/#${DimensionInternalNameMap[uuid]}:${newCoords.x}:${newCoords.y}:${newCoords.z}:30:0:0:0:0:perspective`}
            title={"chunk"}
            frameBorder={0}
          ></iframe>
        </div>
      </div>
    </MainLayout>
  );
}

export default VisitorsLog;
