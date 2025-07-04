import useSWR from "swr";
import { useRouter } from "next/router";
import Image from "next/image";
import BlueMapLayout from "@/internals/BlueMapLayout";
import MainLayout from "@/internals/MainLayout";
import Spinner from "@/components/Spinner";
import FlexRowCard from "@/components/FlexRowCard";
import { CardHeading } from "@/components/Card";
import { Fullbox, FullboxHeading } from "@/components/Fullbox";
import PlayerHeader, {
  PlayerDetail,
  PlayerHeading,
} from "@/components/PlayerHeader";
import {
  mapUrlBase,
  DimensionInternalNameMap,
  DimensionColorMap,
  findChunkCenter,
  prettyPrintDate,
  prettyPrintDateAndTime,
} from "@/internals/Utils";

import CalendarIcon from "@/assets/calendar-icon.svg";
import PlayerIcon from "@/assets/player-icon.png";

import styles from "@/styles/ChunkPages.module.scss";

export default function VisitorsLogPage() {
  const router = useRouter();
  // console.log("===========QUERY", router.query);

  const { uuid: dimensionUuid, x, z } = router.query;

  const { data: logData, error: logError } = useSWR(
    dimensionUuid && x && z
      ? `/api/minecraft/logEntryByCoords?x=${x}&z=${z}&dimension=${dimensionUuid}`
      : null
  );

  const { data: chunkOwnerData, error: chunkOwnerError } = useSWR(
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
          <FullboxHeading>{logError.status || "oops"}</FullboxHeading>
          <p>Couldn't get the visitor's log.</p>
        </Fullbox>
      </MainLayout>
    );
  }

  if (chunkOwnerError) {
    return (
      <MainLayout>
        <Fullbox>
          <FullboxHeading>{chunkOwnerError.status || "Error"}</FullboxHeading>
          <p>Couldn't get this chunk's data.</p>
        </Fullbox>
      </MainLayout>
    );
  }

  if (!logData) {
    return (
      <Fullbox>
        <Spinner />
        <p>Grabbing log entries...</p>
      </Fullbox>
    );
  }

  if (!chunkOwnerData) {
    return (
      <Fullbox>
        <Spinner />
        <p>Grabbing this chunk's owner data...</p>
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
  const mapChunkCenter = findChunkCenter(
    Number.parseInt(x),
    Number.parseInt(z)
  );
  const dimensionColor = DimensionColorMap[ownedChunk.dimension] || "#333";

  return (
    <BlueMapLayout
      mapUrl={`${mapUrlBase}/#${DimensionInternalNameMap[dimensionUuid[0] ?? dimensionUuid] || dimensionUuid}:${mapChunkCenter.x}:${mapChunkCenter.y}:${mapChunkCenter.z}:30:0:0:0:0:perspective`}
      title={"Chunk Map"}
    >
      <PlayerHeader
        playerUuid={ownedChunk.player_id}
        playerName={ownedChunk.name}
        style={{ backgroundColor: dimensionColor }}
      >
        <PlayerHeading>
          Chunk ({x}, {z})
        </PlayerHeading>

        <PlayerDetail>
          <Image src={PlayerIcon} alt="Head Icon" width="20" height="20" />
          <span>Owned by {ownedChunk.name}</span>
        </PlayerDetail>

        <PlayerDetail>
          <CalendarIcon className={styles.chunkDetailIcon} />
          Claimed {prettyPrintDate(new Date(ownedChunk.claimed_on))}
        </PlayerDetail>
      </PlayerHeader>

      <div className={styles.listGrid}>
        {logData.data.length === 0 && (
          <p className={styles.noRecordsText}>
            Seems no one has visited this chunk yet.
          </p>
        )}

        {logData.data.map((logEntry, index) => (
          <FlexRowCard
            key=""
            leftContent={
              <Image
                src={`https://crafatar.com/avatars/${logEntry.player_id}?size=64&overlay`}
                alt={`${logEntry.name}'s Head`}
                width="64"
                height="64"
              />
            }
          >
            <CardHeading>{logEntry.name}</CardHeading>
            <p className={styles.visitorDetailText}>
              Visited {prettyPrintDateAndTime(new Date(logEntry.entered_time))}
            </p>
          </FlexRowCard>
        ))}
      </div>
    </BlueMapLayout>
  );
}
