import React from 'react'; // Removed unused Box, Grid, Heading, Text from theme-ui
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Image from 'next/image';

import {
  mapUrlBase,
  DimensionInternalNameMap,
  DimensionColorMap,
  findChunkCenter,
  prettyPrintDate,
  prettyPrintDateAndTime
} from '../../../../../../internals/Utils'; // Adjusted path

import CalendarIcon from '../../../../../../assets/calendar-icon.svg'; // Adjusted path
import PlayerIcon from '../../../../../../assets/player-icon.png';   // Adjusted path
import ErrorFullBox from '../../../../../../components/ErrorFullBox/index';
import LoadingFullBox from '../../../../../../components/LoadingFullBox/index';
import MainLayout from '../../../../../../internals/MainLayout';

import styles from '../../../../../../styles/VisitorsLogPage.module.css'; // Adjusted path

// Refactored VisitorCard (previously ChunkCard in this file)
const VisitorCard = ({ enteredTime, playerUUID, name }) => {
  return (
    <div className={styles.visitorCard}>
      <div className={styles.visitorAvatarContainer}>
        <Image src={`https://crafatar.com/avatars/${playerUUID}?size=64&overlay`} alt={`${name}'s Head`} width="64px" height="64px" />
      </div>
      <div className={styles.visitorInfoGrid}>
        <h3 className={`${styles.visitorNameHeading} text-heading`}>{name}</h3>
        <p className={styles.visitorDetailText}>Visited {prettyPrintDateAndTime(enteredTime)}</p>
      </div>
    </div>
  );
};

function VisitorsLogPage() { // Renamed component
  const router = useRouter();
  // console.log("===========QUERY", router.query); // Keep for debugging

  const { uuid: dimensionUuid, x, z } = router.query; // Renamed uuid to dimensionUuid for clarity

  const { data: logData, error: logError } = useSWR(
    dimensionUuid && x && z ? `/api/minecraft/logEntryByCoords?x=${x}&z=${z}&dimension=${dimensionUuid}` : null
  );
  const { data: chunkOwnerData, error: chunkOwnerError } = useSWR( // Renamed from chunkData
    dimensionUuid && x && z ? `/api/minecraft/chunkByCoords?x=${x}&z=${z}&dimension=${dimensionUuid}` : null
  );

  if (!dimensionUuid || !x || !z) {
    return <MainLayout><ErrorFullBox header="Error" text="Invalid query parameters." /></MainLayout>;
  }

  if (logError) {
    return <MainLayout><ErrorFullBox header={logError.status || "Error"} text="Error getting log data." /></MainLayout>;
  }
  if (chunkOwnerError) {
    return <MainLayout><ErrorFullBox header={chunkOwnerError.status || "Error"} text="Error getting chunk owner data." /></MainLayout>;
  }

  if (!logData) {
    return <LoadingFullBox text="Grabbing log entries..." />;
  }
  if (!chunkOwnerData) {
    return <LoadingFullBox text="Loading chunk owner data..." />;
  }

  if (chunkOwnerData.data.length === 0) { // A chunk must have an owner to have visit logs in this context
    return <MainLayout><ErrorFullBox header="404" text="This chunk has no owner data or is unclaimed." /></MainLayout>;
  }

  // If chunkOwnerData is fine, but logData is empty, it means no visits yet.
  // This is handled by the map function returning nothing or a "no visits" message.

  const ownedChunk = chunkOwnerData.data[0];
  const mapChunkCenter = findChunkCenter(x, z);
  const dimensionColor = DimensionColorMap[ownedChunk.dimension] || '#333';

  return (
    <MainLayout noPadding>
      <div className={styles.pageGrid}>
        <div className={styles.sidebar}>
          <div className={styles.chunkHeader} style={{ backgroundColor: dimensionColor }}>
            <div className={styles.chunkHeaderContent}>
              <div className={styles.ownerPortraitContainer}>
                <Image
                  src={`https://visage.surgeplay.com/full/304/${ownedChunk.player_id}`}
                  alt={`${ownedChunk.name}'s portrait`}
                  width="198px"
                  height="320px"
                  layout="fixed"
                  priority
                />
              </div>
              <div className={styles.chunkInfoGrid}>
                <h1 className={`${styles.chunkNameHeading} text-h1`}>Chunk ({x}, {z})</h1>
                <p className={styles.chunkDetailText}>
                  <Image src={PlayerIcon} alt="Head Icon" width="20px" height="20px" />
                  <span>Owned by {ownedChunk.name}</span>
                </p>
                <p className={styles.chunkDetailText}>
                  <CalendarIcon className={styles.chunkDetailIcon} />
                  Claimed {prettyPrintDate(new Date(ownedChunk.claimed_on))}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.logListGrid}>
            {logData.data.length === 0 && <p className={styles.noDataText}>Seems no one has visited this chunk yet.</p>}
            {logData.data.map((logEntry, index) => (
              <VisitorCard key={index} enteredTime={new Date(logEntry.entered_time)} playerUUID={logEntry.player_id} name={logEntry.name} />
            ))}
          </div>
        </div>
        <div>
          <iframe
            className={styles.mapIframe}
            src={`${mapUrlBase}/#${DimensionInternalNameMap[dimensionUuid] || dimensionUuid}:${mapChunkCenter.x}:${mapChunkCenter.y}:${mapChunkCenter.z}:30:0:0:0:0:perspective`}
            title={"Chunk Map"}
          ></iframe>
        </div>
      </div>
    </MainLayout>
  );
}

export default VisitorsLogPage;
