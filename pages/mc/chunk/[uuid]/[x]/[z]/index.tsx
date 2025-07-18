import useSWR from "swr";
import { useRouter } from "next/router";
import Head from "next/head";
import BlueMapLayout from "@/internals/BlueMapLayout";
import MainLayout from "@/internals/MainLayout";
import Spinner from "@/components/Spinner";
import FlexRowCard from "@/components/FlexRowCard";
import { CardHeading } from "@/components/Card";
import { Fullbox, FullboxHeading } from "@/components/Fullbox";
import { CalendarIcon, PlayerIcon } from "@/components/Icon";
import { PageButton } from "@/components/Button";
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
  getPlayerFaceUrl,
} from "@/internals/clientUtils";
import type {
  ChunkWithPlayerBase,
  LogEntryWithPlayerBase,
} from "@/internals/apiTypes";
import { getApiErrorMessage } from "@/internals/fetcher";

import styles from "@/styles/ChunkPages.module.scss";

export default function VisitorsLogPage() {
  const router = useRouter();
  const { uuid: dimensionUuid, x, z } = router.query;
  const queryHydrated = dimensionUuid && x && z;

  const { data: chunkOwnerData, error: chunkOwnerError } =
    useSWR<ChunkWithPlayerBase>(
      queryHydrated
        ? `/api/minecraft/chunks/${dimensionUuid}?x=${x}&z=${z}`
        : null
    );

  const { data: logData, error: logError } = useSWR<LogEntryWithPlayerBase[]>(
    queryHydrated && chunkOwnerData
      ? `/api/minecraft/logs/${dimensionUuid}?x=${x}&z=${z}`
      : null
  );

  if (!dimensionUuid || !x || !z) {
    return (
      <MainLayout>
        <DefaultHeadTitle />

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
        <DefaultHeadTitle />

        <Fullbox>
          <FullboxHeading>oops</FullboxHeading>
          <p>Invalid url parameters.</p>
        </Fullbox>
      </MainLayout>
    );
  }

  if (chunkOwnerError) {
    return (
      <MainLayout>
        <DefaultHeadTitle />

        <Fullbox>
          <FullboxHeading>{chunkOwnerError.status}</FullboxHeading>
          <p>{getApiErrorMessage(chunkOwnerError.response)}</p>
          <PageButton href="/">Home Page</PageButton>
        </Fullbox>
      </MainLayout>
    );
  }

  if (!chunkOwnerData) {
    return (
      <Fullbox>
        <DefaultHeadTitle />

        <Spinner />
        <p>Grabbing this chunk's owner data...</p>
      </Fullbox>
    );
  }

  const mapChunkCenter = findChunkCenter(
    Number.parseInt(x),
    Number.parseInt(z)
  );

  const mapUrl = `${mapUrlBase}/#${DimensionInternalNameMap[dimensionUuid] || dimensionUuid}:${mapChunkCenter.x}:${mapChunkCenter.y}:${mapChunkCenter.z}:30:0:0:0:0:perspective`;

  const dimensionColor = DimensionColorMap[chunkOwnerData.dimension] || "#333";

  return (
    <BlueMapLayout mapUrl={mapUrl} title={"Chunk Map"}>
      <Head>
        <title>
          Chunk ({x}, {z}) • visitor's log • the lounge hub
        </title>
      </Head>
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
        {logError && <p>{getApiErrorMessage(logError.response)}</p>}

        {!logData && !logError && (
          <Fullbox>
            <Spinner />
            <p>Loading visitor's log...</p>
          </Fullbox>
        )}

        {logData?.length === 0 && (
          <p>Seems no one has visited this chunk yet.</p>
        )}

        {logData?.map((logEntry) => (
          <FlexRowCard
            key={logEntry.id}
            leftContent={
              // biome-ignore lint/performance/noImgElement: visage doesn't seem to like <Image />
              <img
                src={getPlayerFaceUrl(logEntry.player_id, 64)}
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

function DefaultHeadTitle() {
  return (
    <Head>
      <title>visitor's log • the lounge hub</title>
    </Head>
  );
}
