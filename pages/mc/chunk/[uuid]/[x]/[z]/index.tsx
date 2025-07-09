import useSWR from "swr";
import { useRouter } from "next/router";
import BlueMapLayout from "@/internals/BlueMapLayout";
import MainLayout from "@/internals/MainLayout";
import Spinner from "@/components/Spinner";
import FlexRowCard from "@/components/FlexRowCard";
import { CardHeading } from "@/components/Card";
import { Fullbox, FullboxHeading } from "@/components/Fullbox";
import { CalendarIcon, PlayerIcon } from "@/components/Icon";
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
} from "@/internals/clientUtils";
import type {
  ChunkWithPlayerBase,
  LogEntryWithPlayerBase,
} from "@/internals/apiTypes";

import styles from "@/styles/ChunkPages.module.scss";

export default function VisitorsLogPage() {
  const router = useRouter();
  const { uuid: dimensionUuid, x, z } = router.query;
  const queryHydrated = dimensionUuid && x && z;

  const { data: logData, error: logError } = useSWR<LogEntryWithPlayerBase[]>(
    queryHydrated ? `/api/minecraft/logs/${dimensionUuid}?x=${x}&z=${z}` : null
  );

  const { data: chunkOwnerData, error: chunkOwnerError } =
    useSWR<ChunkWithPlayerBase>(
      queryHydrated
        ? `/api/minecraft/chunks/${dimensionUuid}?x=${x}&z=${z}`
        : null
    );

  if (!dimensionUuid || !x || !z) {
    return (
      <MainLayout>
        <Fullbox>
          <FullboxHeading>oops</FullboxHeading>
          <p>Invalid url. Can't pull up the visitor's log.</p>
        </Fullbox>
      </MainLayout>
    );
  }

  if (
    typeof z !== "string" ||
    typeof x !== "string" ||
    typeof dimensionUuid !== "string"
  ) {
    return (
      <MainLayout>
        <Fullbox>
          <FullboxHeading>oops</FullboxHeading>
          <p>Invalid url parameters.</p>
        </Fullbox>
      </MainLayout>
    );
  }

  if (logError) {
    return (
      <MainLayout>
        <Fullbox>
          <FullboxHeading>oops</FullboxHeading>
          <p>Couldn't get the visitor's log due to an unexpected error.</p>
        </Fullbox>
      </MainLayout>
    );
  }

  if (chunkOwnerError) {
    return (
      <MainLayout>
        <Fullbox>
          <FullboxHeading>oops</FullboxHeading>
          <p>Couldn't get this chunk's data due to an unexpected error.</p>
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

  // TODO use chunkError once its type safe
  // if (chunkOwnerData.data.length === 0) {
  //   // A chunk must have an owner to have visit logs in this context
  //   return (
  //     <MainLayout>
  //       <Fullbox>
  //         <FullboxHeading>not found</FullboxHeading>
  //         <p>This chunk is unclaimed and isn't owned by anyone.</p>
  //       </Fullbox>
  //     </MainLayout>
  //   );
  // }

  const mapChunkCenter = findChunkCenter(
    Number.parseInt(x),
    Number.parseInt(z)
  );

  const mapUrl = `${mapUrlBase}/#${DimensionInternalNameMap[dimensionUuid] || dimensionUuid}:${mapChunkCenter.x}:${mapChunkCenter.y}:${mapChunkCenter.z}:30:0:0:0:0:perspective`;

  const dimensionColor = DimensionColorMap[chunkOwnerData.dimension] || "#333";

  return (
    <BlueMapLayout mapUrl={mapUrl} title={"Chunk Map"}>
      <PlayerHeader
        playerUuid={chunkOwnerData.player_id}
        playerName={chunkOwnerData.name}
        style={{ backgroundColor: dimensionColor }}
      >
        <PlayerHeading>
          Chunk ({x}, {z})
        </PlayerHeading>

        <PlayerDetail>
          <PlayerIcon className={styles.chunkDetailIcon} />
          <span>Owned by {chunkOwnerData.name}</span>
        </PlayerDetail>

        <PlayerDetail>
          <CalendarIcon className={styles.chunkDetailIcon} />
          Claimed {prettyPrintDate(new Date(chunkOwnerData.claimed_on))}
        </PlayerDetail>
      </PlayerHeader>

      <div className={styles.listGrid}>
        {logData.length === 0 && (
          <p className={styles.noRecordsText}>
            Seems no one has visited this chunk yet.
          </p>
        )}

        {logData.map((logEntry) => (
          <FlexRowCard
            key={logEntry.id}
            leftContent={
              // biome-ignore lint/performance/noImgElement: visage doesn't seem to like <Image />
              <img
                src={`https://vzge.me/face/64/${logEntry.player_id}`}
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
