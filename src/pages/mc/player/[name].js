import React, { useState, useEffect } from 'react'; // Added useEffect
import { useRouter } from 'next/router';
import Image from 'next/image';
import useSWR from 'swr';

import CalendarIcon from '../../../assets/calendar-icon.svg';
import CommunityIcon from '../../../assets/community-icon.svg';
import DimensionIcon from '../../../assets/dimension-icon.svg';
import BaseIcon from '../../../assets/base-icon.svg';

import {
  CommunityIdMap,
  CommunityColorMap,
  DimensionColorMap,
  DimensionInternalNameMap,
  mapUrlBase,
  findChunkCenter,
  prettyPrintDate,
  prettyPrintDateAndTime,
} from '../../../internals/Utils'; // Adjusted path

import ErrorFullBox from '../../../components/ErrorFullBox/index';
import LoadingFullBox from '../../../components/LoadingFullBox/index';
import MainLayout from '../../../internals/MainLayout';
import Button from '../../../components/Button/index'; // Using new Button

import styles from '../../../styles/PlayerPage.module.css'; // Adjusted path

// Refactored ChunkCard (local component)
const ChunkCard = ({ x, z, y, dimension, claimed_on, isHome }) => {
  const dimensionColor = DimensionColorMap[dimension] || '#ccc'; // Fallback color

  return (
    <div className={styles.chunkCard}>
      <div className={styles.chunkCardIconContainer}>
        {isHome ? (
          <BaseIcon style={{ fill: dimensionColor }} className={styles.chunkCardDimensionIcon} />
        ) : (
          <DimensionIcon style={{ fill: dimensionColor }} className={styles.chunkCardDimensionIcon} />
        )}
      </div>
      <div className={styles.chunkCardInfoGrid}>
        <h3 className={`${styles.chunkCardNameHeading} text-heading`}>{isHome ? "Home" : `(${x}, ${z})`}</h3>
        {isHome ? (
          <p className={styles.chunkCardDetailText}>
            Set at {x}, {y}, {z}
          </p>
        ) : (
          <p className={styles.chunkCardDetailText}>Claimed {prettyPrintDateAndTime(claimed_on)}</p>
        )}
      </div>
    </div>
  );
};

function PlayerPage() { // Renamed component
  const router = useRouter();
  const playerName = router.query.name;

  const { data: playerData, error: playerError } = useSWR(playerName ? `/api/minecraft/player?name=${playerName}` : null);
  const { data: chunkData, error: chunkError } = useSWR(() => (playerData && playerData.data && playerData.data.length > 0) ? `/api/minecraft/chunkByUUID?uuid=${playerData.data[0].player_id}` : null);

  const [currentMapUrl, setMapUrl] = useState(mapUrlBase + "/#world:-7:58:214:30:0:0:0:0:perspective");

  // Effect to update map URL if player data changes (e.g. initial load with home coords)
  useEffect(() => {
    if (playerData?.data?.[0]?.home_x && playerData.data[0].home_dimension) {
      const p = playerData.data[0];
      updateMapFrameHome(p.home_x, p.home_y, p.home_z, DimensionInternalNameMap[p.home_dimension]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerData]); // Only re-run if playerData changes


  if (!playerName) {
    return <MainLayout><ErrorFullBox header="Error" text="No username provided." /></MainLayout>;
  }

  if (playerError) {
    return <MainLayout><ErrorFullBox header={playerError.status || "Error"} text="Error getting player data." /></MainLayout>;
  }
  if (chunkError) {
    // Don't block rendering if chunk data fails, player info might still be useful
    console.error("Error getting chunk data:", chunkError);
  }

  if (!playerData) {
    return <LoadingFullBox text="Grabbing player data..." />;
  }

  if (playerData.data.length === 0) {
    return <MainLayout><ErrorFullBox header="404" text="Player not found." /></MainLayout>;
  }

  // chunkData might still be loading if playerData just arrived
  // const isLoadingChunkData = playerData && !chunkData && !chunkError;


  function updateMapFrame(x, z, dimension) {
    const newCoords = findChunkCenter(x, z);
    setMapUrl(`${mapUrlBase}/#${DimensionInternalNameMap[dimension] || dimension}:${newCoords.x}:${newCoords.y}:${newCoords.z}:30:0:0:0:0:perspective`);
  }
  function updateMapFrameHome(x, y, z, dimension) {
    setMapUrl(`${mapUrlBase}/#${DimensionInternalNameMap[dimension] || dimension}:${x}:${y + 2}:${z}:5:0:1.4:0:0:free`);
  }

  const player = playerData.data[0];
  const joinDate = new Date(player.joined);
  const communityId = player.community_id || 99; // Default to 99 if null/undefined
  const communityName = CommunityIdMap[communityId];
  const communityColor = CommunityColorMap[communityId] || '#333'; // Fallback color

  return (
    <MainLayout noPadding>
      <div className={styles.playerPageGrid}>
        <div className={styles.sidebar}>
          <div className={styles.playerHeader} style={{ backgroundColor: communityColor }}>
            <div className={styles.playerHeaderContent}>
              <div className={styles.playerPortraitContainer}>
                <Image
                  src={`https://visage.surgeplay.com/full/304/${player.player_id}`}
                  alt={`${player.name}'s portrait`}
                  width="198px"
                  height="320px"
                  layout="fixed"
                  priority
                />
              </div>
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
                <div className={styles.communityWatermark}>
                  <Image src={`/static-assets/community/${communityId}.png`} alt="community watermark" width="45px" height="45px" />
                </div>
              </div>
            </div>
          </Box>
          <div className={styles.chunkListGrid}>
            {player.home_x && player.home_y && player.home_z && player.home_dimension && (
              <Button
                onClick={() => updateMapFrameHome(player.home_x, player.home_y, player.home_z, player.home_dimension)}
                className={styles.chunkCardButton}
              >
                <ChunkCard x={player.home_x} y={player.home_y} z={player.home_z} dimension={player.home_dimension} isHome />
              </Button>
            )}
            {!chunkData && !chunkError && <LoadingFullBox text="Loading chunk claims..." /> }
            {chunkData && chunkData.data.length === 0 && <p className={styles.noChunksText}>This player has not claimed any chunks yet.</p>}
            {chunkData && chunkData.data.map((chunk, index) => (
              <Button
                onClick={() => updateMapFrame(chunk.x, chunk.z, chunk.dimension)}
                key={index}
                className={styles.chunkCardButton}
              >
                <ChunkCard x={chunk.x} z={chunk.z} dimension={chunk.dimension} claimed_on={new Date(chunk.claimed_on)} />
              </Button>
            ))}
             {chunkError && <p className={styles.noChunksText}>Could not load chunk data.</p>}
          </div>
        </div>
        <div>
          <iframe
            className={styles.mapIframe}
            src={currentMapUrl}
            title={`${player.name}'s Base`}
          ></iframe>
        </div>
      </div>
    </MainLayout>
  );
}

export default PlayerPage;
