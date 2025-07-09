import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import MainLayout from "@/internals/MainLayout";
import BlueMapLayout from "@/internals/BlueMapLayout";
import Spinner from "@/components/Spinner";
import { CardHeading } from "@/components/Card";
import { Fullbox, FullboxHeading } from "@/components/Fullbox";
import PlayerHeader, {
  PlayerDetail,
  PlayerHeading,
} from "@/components/PlayerHeader";
import { CalendarIcon, CommunityIcon } from "@/components/Icon";
import FlexRowCard from "@/components/FlexRowCard";
import {
  CommunityIdMap,
  CommunityColorMap,
  DimensionColorMap,
  DimensionInternalNameMap,
  mapUrlBase,
  findChunkCenter,
  prettyPrintDate,
  prettyPrintDateAndTime,
} from "@/internals/Utils";

import styles from "@/styles/ChunkPages.module.scss";
import type { Chunk, Player } from "@/internals/apiTypes";

export default function PlayerPage() {
  const router = useRouter();
  const playerName = router.query.name;
  const [currentMapUrl, setMapUrl] = useState(
    `${mapUrlBase}/#world:-7:58:214:30:0:0:0:0:perspective`
  );

  const { data: player, error: playerError } = useSWR<Player>(
    playerName ? `/api/minecraft/players/${playerName}` : null
  );

  const { data: chunkData, error: chunkError } = useSWR<Chunk[]>(() =>
    player ? `/api/minecraft/players/${player.player_id}/claims` : null
  );

  if (chunkError) {
    console.log("Error getting chunk data:", chunkError);
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: adding updateMapFrameHome to props makes loop
  useEffect(() => {
    if (!player) return;

    const { home_x, home_y, home_z, home_dimension } = player;

    if (home_x && home_y && home_z && home_dimension) {
      updateMapFrameHome(
        home_x,
        home_y,
        home_z,
        DimensionInternalNameMap[home_dimension]
      );
    }
  }, [player]);

  // it doesnt seem this will happen since index.tsx catches the route without a player name
  // if (!playerName) {
  //   return (
  //     <MainLayout>
  //       <Fullbox>
  //         <FullboxHeading>Error</FullboxHeading>
  //         <p>No username provided.</p>
  //       </Fullbox>
  //     </MainLayout>
  //   );
  // }

  if (playerError) {
    return (
      <MainLayout>
        <Fullbox>
          <FullboxHeading>{playerError.status || "Error"}</FullboxHeading>
          <p>Error getting player data.</p>
        </Fullbox>
      </MainLayout>
    );
  }

  if (!player) {
    return (
      <MainLayout>
        <Fullbox>
          <Spinner />
          <p>Grabbing player data...</p>
        </Fullbox>
      </MainLayout>
    );
  }

  // TODO check for not found player in playerError now
  // if (playerData.data.length === 0) {
  //   return (
  //     <MainLayout>
  //       <Fullbox>
  //         <FullboxHeading>not found</FullboxHeading>
  //         <p>That player's data couldn't be found.</p>
  //       </Fullbox>
  //     </MainLayout>
  //   );
  // }

  function updateMapFrame(x: number, z: number, dimension: string) {
    const newCoords = findChunkCenter(x, z);
    setMapUrl(
      `${mapUrlBase}/#${DimensionInternalNameMap[dimension] || dimension}:${newCoords.x}:${newCoords.y}:${newCoords.z}:30:0:0:0:0:perspective`
    );
  }

  function updateMapFrameHome(
    x: number,
    y: number,
    z: number,
    dimension: string
  ) {
    setMapUrl(
      `${mapUrlBase}/#${DimensionInternalNameMap[dimension] || dimension}:${x}:${y + 2}:${z}:5:0:1.4:0:0:free`
    );
  }

  // ===== player data loaded here

  const joinDate = new Date(player.joined);
  const { home_x, home_y, home_z, home_dimension } = player;
  const hasHome = home_x && home_y && home_z && home_dimension;

  const communityId = player.community_id || 99;
  const communityName = CommunityIdMap[communityId] || CommunityIdMap[99];
  const communityColor = CommunityColorMap[communityId] || "#333";

  return (
    <BlueMapLayout
      mapUrl={currentMapUrl}
      title={`Map of ${player.name}'s land claims`}
    >
      <PlayerHeader
        playerUuid={player.player_id}
        playerName={player.name}
        watermarkUrl={`/static-assets/community/${communityId}.png`}
        style={{ backgroundColor: communityColor as string }}
      >
        <PlayerHeading>{player.name}</PlayerHeading>

        <PlayerDetail>
          <CommunityIcon />
          {communityName}
        </PlayerDetail>

        <PlayerDetail>
          <CalendarIcon />
          Joined on {prettyPrintDate(joinDate)}
        </PlayerDetail>
      </PlayerHeader>

      <div className={styles.listGrid}>
        {hasHome && (
          <button
            type="button"
            onClick={() =>
              updateMapFrameHome(home_x, home_y, home_z, home_dimension)
            }
            className={styles.chunkCardButton}
          >
            <ChunkCard
              x={home_x}
              y={home_y}
              z={home_z}
              dimension={home_dimension}
              isHome
            />
          </button>
        )}

        {chunkError && (
          <p className={styles.noChunksText}>
            Sorry, couldn't load this player's land claims.
          </p>
        )}

        {!chunkData && !chunkError && (
          <Fullbox>
            <Spinner />
            <p>Loading chunk claims...</p>
          </Fullbox>
        )}

        {chunkData?.length === 0 && (
          <p className={styles.noRecordsText}>
            This player has not claimed any chunks yet.
          </p>
        )}

        {chunkData?.map((chunk) => (
          <button
            type="button"
            onClick={() => updateMapFrame(chunk.x, chunk.z, chunk.dimension)}
            key={`${chunk.x},${chunk.z},${chunk.dimension}`}
            className={styles.chunkCardButton}
          >
            <ChunkCard
              isHome={false}
              x={chunk.x}
              z={chunk.z}
              y={1}
              dimension={chunk.dimension}
              claimed_on={new Date(chunk.claimed_on)}
            />
          </button>
        ))}
      </div>
    </BlueMapLayout>
  );
}

//

interface ChunkCardProps {
  x: number;
  y: number;
  z: number;
  dimension: string;
  claimed_on?: Date;
  isHome?: boolean;
}

function ChunkCard({ x, z, y, dimension, claimed_on, isHome }: ChunkCardProps) {
  const dimensionColor = DimensionColorMap[dimension] || "#ccc";

  const cardIcon = isHome ? (
    <BaseIcon
      style={{ fill: dimensionColor }}
      className={styles.chunkCardDimensionIcon}
    />
  ) : (
    <DimensionIcon
      style={{ fill: dimensionColor }}
      className={styles.chunkCardDimensionIcon}
    />
  );

  return (
    <FlexRowCard className={styles.chunkCard} leftContent={cardIcon}>
      <div className={styles.chunkCardInfoGrid}>
        <CardHeading>{isHome ? "Home" : `(${x}, ${z})`}</CardHeading>

        {isHome && (
          <p className={styles.chunkCardDetailText}>
            Set at {x}, {y}, {z}
          </p>
        )}

        {claimed_on && (
          <p className={styles.chunkCardDetailText}>
            Claimed {prettyPrintDateAndTime(claimed_on)}
          </p>
        )}
      </div>
    </FlexRowCard>
  );
}

function BaseIcon({ ...props }: React.SVGAttributes<SVGElement>) {
  return (
    /** biome-ignore lint/a11y/noSvgWithoutTitle: decorative */
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" {...props}>
      <rect width="64" height="64" rx="9.11" />
      <polygon
        points="53 53 11 53 11 28.72 32 11 53 28.72 53 53"
        className={styles.chunkCardIconPaths}
      />
    </svg>
  );
}

function DimensionIcon({ ...props }: React.SVGAttributes<SVGElement>) {
  return (
    /** biome-ignore lint/a11y/noSvgWithoutTitle: decorative */
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" {...props}>
      <rect width="64" height="64" rx="9.11" />
      <g className={styles.chunkCardIconPaths}>
        <path d="M13.86,25.12,29,33.75V51L13.86,42.34V25.12m-3-5.21V44.09L32,56.19V32L10.84,19.91Z" />
        <path d="M50.14,25.12V42.34L35,51V33.75l15.12-8.63m3-5.21L32,32V56.19l21.16-12.1V19.91Z" />
        <polygon points="32 7.82 10.84 19.91 10.84 26.71 32 38.8 53.16 26.71 53.16 19.91 32 7.82" />
        <polygon points="32.76 55.43 32 56.19 31.24 55.43 30.11 36.53 33.89 36.53 32.76 55.43" />
      </g>
    </svg>
  );
}
