import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import useSWR from "swr";
import MainLayout from "@/internals/MainLayout";
import BlueMapLayout from "@/internals/BlueMapLayout";
import Spinner from "@/components/Spinner";
import { Card, CardHeading } from "@/components/Card";
import { Fullbox, FullboxHeading } from "@/components/Fullbox";
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

import styles from "@/styles/PlayerPage.module.scss";

import CalendarIcon from "@/assets/calendar-icon.svg";
import CommunityIcon from "@/assets/community-icon.svg";
import DimensionIcon from "@/assets/dimension-icon.svg";
import BaseIcon from "@/assets/base-icon.svg";

export default function PlayerPage() {
  const router = useRouter();
  const playerName = router.query.name;

  const { data: playerData, error: playerError } = useSWR(
    playerName ? `/api/minecraft/player?name=${playerName}` : null
  );

  const { data: chunkData, error: chunkError } = useSWR(() =>
    playerData?.data && playerData.data.length > 0
      ? `/api/minecraft/chunkByUUID?uuid=${playerData.data[0].player_id}`
      : null
  );

  const [currentMapUrl, setMapUrl] = useState(
    `${mapUrlBase}/#world:-7:58:214:30:0:0:0:0:perspective`
  );

  if (chunkError) {
    // Don't block rendering if chunk data fails, player info might still be useful
    console.error("Error getting chunk data:", chunkError);
  }

  // Effect to update map URL if player data changes (e.g. initial load with home coords)
  // biome-ignore lint/correctness/useExhaustiveDependencies: adding updateMapFrameHome to props makes loop
  useEffect(() => {
    if (playerData?.data?.[0]?.home_x && playerData.data[0].home_dimension) {
      const p = playerData.data[0];
      updateMapFrameHome(
        p.home_x,
        p.home_y,
        p.home_z,
        DimensionInternalNameMap[p.home_dimension]
      );
    }
  }, [playerData]);

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

  if (!playerData) {
    return (
      <MainLayout>
        <Fullbox>
          <Spinner />
          <p>Grabbing player data...</p>
        </Fullbox>
      </MainLayout>
    );
  }

  if (playerData.data.length === 0) {
    return (
      <MainLayout>
        <Fullbox>
          <FullboxHeading>not found</FullboxHeading>
          <p>That player's data couldn't be found.</p>
        </Fullbox>
      </MainLayout>
    );
  }

  function updateMapFrame(x, z, dimension) {
    const newCoords = findChunkCenter(x, z);
    setMapUrl(
      `${mapUrlBase}/#${DimensionInternalNameMap[dimension] || dimension}:${newCoords.x}:${newCoords.y}:${newCoords.z}:30:0:0:0:0:perspective`
    );
  }

  function updateMapFrameHome(x, y, z, dimension) {
    setMapUrl(
      `${mapUrlBase}/#${DimensionInternalNameMap[dimension] || dimension}:${x}:${y + 2}:${z}:5:0:1.4:0:0:free`
    );
  }

  // ===== player data loaded here

  const player = playerData.data[0];
  const joinDate = new Date(player.joined);
  const communityId = player.community_id || 99;
  const communityName = CommunityIdMap[communityId];
  const communityColor = CommunityColorMap[communityId] || "#333";

  return (
    <BlueMapLayout
      mapUrl={currentMapUrl}
      title={`Map of ${player.name}'s land claims`}
    >
      <div
        className={styles.playerHeader}
        style={{ backgroundColor: communityColor }}
      >
        <Image
          src={`https://visage.surgeplay.com/full/304/${player.player_id}`}
          alt={`${player.name}'s portrait`}
          width="198"
          height="320"
          priority
          quality={100}
          className={styles.playerPortrait}
        />

        <div className={styles.playerInfoGrid}>
          <h1 className={`${styles.playerNameHeading} text-h1`}>
            {player.name}
          </h1>

          <p className={styles.playerDetailText}>
            <CommunityIcon className={styles.playerDetailIcon} />
            {communityName}
          </p>

          <p className={styles.playerDetailText}>
            <CalendarIcon className={styles.playerDetailIcon} />
            Joined on {prettyPrintDate(joinDate)}
          </p>

          <Image
            src={`/static-assets/community/${communityId}.png`}
            alt=""
            width="45"
            height="45"
            className={styles.communityWatermark}
          />
        </div>
      </div>

      <div className={styles.chunkListGrid}>
        {player.home_x &&
          player.home_y &&
          player.home_z &&
          player.home_dimension && (
            <button
              type="button"
              onClick={() =>
                updateMapFrameHome(
                  player.home_x,
                  player.home_y,
                  player.home_z,
                  player.home_dimension
                )
              }
              className={styles.chunkCardButton}
            >
              <ChunkCard
                x={player.home_x}
                y={player.home_y}
                z={player.home_z}
                dimension={player.home_dimension}
                isHome
              />
            </button>
          )}

        {!chunkData && !chunkError && (
          <Fullbox>
            <Spinner />
            <p>Loading chunk claims...</p>
          </Fullbox>
        )}

        {chunkData && chunkData.data.length === 0 && (
          <p className={styles.noChunksText}>
            This player has not claimed any chunks yet.
          </p>
        )}

        {chunkData?.data.map((chunk, index) => (
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

        {chunkError && (
          <p className={styles.noChunksText}>
            Sorry, couldn't load this player's land claims.
          </p>
        )}
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

  return (
    <Card className={styles.chunkCardWrapper}>
      {isHome ? (
        <BaseIcon
          style={{ fill: dimensionColor }}
          className={styles.chunkCardDimensionIcon}
        />
      ) : (
        <DimensionIcon
          style={{ fill: dimensionColor }}
          className={styles.chunkCardDimensionIcon}
        />
      )}

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
    </Card>
  );
}
