import React from "react"; // Removed unused Box, Grid, Heading, Text from theme-ui
import useSWR from "swr";
import { useRouter } from "next/router";
import Image from "next/image";

import {
  mapUrlBase,
  DimensionInternalNameMap,
  DimensionColorMap,
  findChunkCenter,
  prettyPrintDate,
  prettyPrintDateAndTime,
} from "../../../../../../internals/Utils"; // Adjusted path

import CalendarIcon from "../../../../../../assets/calendar-icon.svg"; // Adjusted path
import PlayerIcon from "../../../../../../assets/player-icon.png"; // Adjusted path
import { Fullbox, FullboxHeading } from "@/components/Fullbox";
import MainLayout from "../../../../../../internals/MainLayout";

import styles from "../../../../../../styles/VisitorsLogPage.module.css"; // Adjusted path

// Refactored VisitorCard (previously ChunkCard in this file)
const VisitorCard = ({ enteredTime, playerUUID, name }) => {
  return (
    <div className={styles.visitorCard}>
      <div className={styles.visitorAvatarContainer}>
        <Image
          src={`https://crafatar.com/avatars/${playerUUID}?size=64&overlay`}
          alt={`${name}'s Head`}
          width="64"
          height="64"
        />
      </div>
      <div className={styles.visitorInfoGrid}>
        <h3 className={`${styles.visitorNameHeading} text-heading`}>{name}</h3>
        <p className={styles.visitorDetailText}>
          Visited {prettyPrintDateAndTime(enteredTime)}
        </p>
      </div>
    </div>
  );
};

function VisitorsLogPage() {
  // Renamed component
  const router = useRouter();
  // console.log("===========QUERY", router.query); // Keep for debugging

  const { uuid: dimensionUuid, x, z } = router.query; // Renamed uuid to dimensionUuid for clarity

  const { data: logData, error: logError } = useSWR(
    dimensionUuid && x && z
      ? `/api/minecraft/logEntryByCoords?x=${x}&z=${z}&dimension=${dimensionUuid}`
      : null
  );
  const { data: chunkOwnerData, error: chunkOwnerError } = useSWR(
    // Renamed from chunkData
    dimensionUuid && x && z
      ? `/api/minecraft/chunkByCoords?x=${x}&z=${z}&dimension=${dimensionUuid}`
      : null
  );

  if (!dimensionUuid || !x || !z) {
    return (
      <MainLayout>
        <Fullbox>
          <FullboxHeading>Error</FullboxHeading>
          <p>Invalid query parameters.</p>
        </Fullbox>
      </MainLayout>
    );
  }

  // TODO temp
  if (typeof z !== "string" || typeof x !== "string") {
    return (
      <MainLayout>
        <Fullbox>
          <FullboxHeading>Error</FullboxHeading>
          <p>Invalid query parameters.</p>
        </Fullbox>
      </MainLayout>
    );
  }

  if (logError) {
    return (
      <MainLayout>
        <Fullbox>
          <FullboxHeading>{logError.status || "Error"}</FullboxHeading>
          <p>Error getting log data.</p>
        </Fullbox>
      </MainLayout>
    );
  }
  if (chunkOwnerError) {
    return (
      <MainLayout>
        <Fullbox>
          <FullboxHeading>{chunkOwnerError.status || "Error"}</FullboxHeading>
          <p>Error getting log data.</p>
        </Fullbox>
      </MainLayout>
    );
  }

  if (!logData) {
    return (
      <Fullbox>
        <p>Grabbing log entries...</p>
      </Fullbox>
    );
  }
  if (!chunkOwnerData) {
    return (
      <Fullbox>
        <p>Loading chunk owner data...</p>
      </Fullbox>
    );
  }

  if (chunkOwnerData.data.length === 0) {
    // A chunk must have an owner to have visit logs in this context
    return (
      <MainLayout>
        <Fullbox>
          <FullboxHeading>not found</FullboxHeading>
          <p>This chunk is unclaimed and isn't owned by anyone.</p>
        </Fullbox>
      </MainLayout>
    );
  }

  // If chunkOwnerData is fine, but logData is empty, it means no visits yet.
  // This is handled by the map function returning nothing or a "no visits" message.

  const ownedChunk = chunkOwnerData.data[0];
  const mapChunkCenter = findChunkCenter(parseInt(x), parseInt(z));
  const dimensionColor = DimensionColorMap[ownedChunk.dimension] || "#333";

  return (
    <MainLayout noPadding>
      <div className={styles.pageGrid}>
        <div className={styles.sidebar}>
          <div
            className={styles.chunkHeader}
            style={{ backgroundColor: dimensionColor }}
          >
            <div className={styles.chunkHeaderContent}>
              <div className={styles.ownerPortraitContainer}>
                <Image
                  src={`https://visage.surgeplay.com/full/304/${ownedChunk.player_id}`}
                  alt={`${ownedChunk.name}'s portrait`}
                  width="198"
                  height="320"
                  layout="fixed"
                  priority
                />
              </div>
              <div className={styles.chunkInfoGrid}>
                <h1 className={`${styles.chunkNameHeading} text-h1`}>
                  Chunk ({x}, {z})
                </h1>
                <p className={styles.chunkDetailText}>
                  <Image
                    src={PlayerIcon}
                    alt="Head Icon"
                    width="20"
                    height="20"
                  />
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
            {logData.data.length === 0 && (
              <p className={styles.noDataText}>
                Seems no one has visited this chunk yet.
              </p>
            )}
            {logData.data.map((logEntry, index) => (
              <VisitorCard
                key={index}
                enteredTime={new Date(logEntry.entered_time)}
                playerUUID={logEntry.player_id}
                name={logEntry.name}
              />
            ))}
          </div>
        </div>
        <div>
          {/* <iframe
            className={styles.mapIframe}
            src={`${mapUrlBase}/#${DimensionInternalNameMap[dimensionUuid[0] ?? dimensionUuid] || dimensionUuid}:${mapChunkCenter.x}:${mapChunkCenter.y}:${mapChunkCenter.z}:30:0:0:0:0:perspective`}
            title={"Chunk Map"}
          ></iframe> */}
        </div>
      </div>
    </MainLayout>
  );
}

export default VisitorsLogPage;
