import { useRouter } from "next/router";
import Image from "next/image";
import useSWR from "swr";
import CalendarIcon from "../../../assets/calendar-icon.svg";
import CommunityIcon from "../../../assets/community-icon.svg";
import DimensionIcon from "../../../assets/dimension-icon.svg";
import BaseIcon from "../../../assets/base-icon.svg";
import { useEffect, useState } from "react";
import {
  CommunityIdMap,
  CommunityColorMap,
  DimensionColorMap,
  DimensionInternalNameMap,
  mapUrlBase,
  findChunkCenter,
  prettyPrintDate,
  prettyPrintDateAndTime,
} from "../../../internals/Utils";
import ErrorFullBox from "../../../components/ErrorFullBox";
import LoadingFullBox from "../../../components/LoadingFullBox";
import MainLayout from "../../../internals/MainLayout";

const ChunkCard = ({ x, z, y, dimension, claimed_on, isHome }) => {
  return (
    <div
      className="cardBg p-3 border-radius-7 flex align-items-center color-text"
    >
      <div
        className="mr-3"
      >
        {isHome ? (
          <BaseIcon fill={DimensionColorMap[dimension]} className="width-64 height-64" />
        ) : (
          <DimensionIcon fill={DimensionColorMap[dimension]} className="width-64 height-64" />
        )}
      </div>
      <div className="grid">
        <h3 className="text-heading font-size-3">{isHome ? "Home" : `(${x}, ${z})`}</h3>
        {isHome ? (
          <p>
            Set at {x}, {y}, {z}
          </p>
        ) : (
          <p>Claimed {prettyPrintDateAndTime(claimed_on)}</p>
        )}
      </div>
    </div>
  );
};

function Player() {
  const router = useRouter();

  const { data: playerData, error: playerError } = useSWR(`/api/minecraft/player?name=${router.query.name}`);
  const { data: chunkData, error: chunkError } = useSWR(() => "/api/minecraft/chunkByUUID?uuid=" + playerData.data[0].player_id);
  const [currentMapUrl, setMapUrl] = useState(mapUrlBase + "/#world:-7:58:214:30:0:0:0:0:perspective");

  if (!router.query.name) {
    return (
      <MainLayout>
        <ErrorFullBox message="No username provided." />
      </MainLayout>
    );
  }

  if (playerError) {
    return (
      <MainLayout>
        <ErrorFullBox header={playerError.status} text="Error getting player data." />
      </MainLayout>
    );
  }
  if (chunkError) {
    return (
      <MainLayout>
        <ErrorFullBox header={chunkError.status} text="Error getting chunk data." />
      </MainLayout>
    );
  }

  if (!playerData) {
    return <LoadingFullBox text="Grabbing player data..." />;
  }

  if (playerData.data.length === 0) {
    return (
      <MainLayout>
        <ErrorFullBox header={404} text="Player not found." />
      </MainLayout>
    );
  }

  if (!chunkData) {
    return <LoadingFullBox text="Loading chunk claims..." />;
  }

  function updateMapFrame(x, z, dimension) {
    const newCoords = findChunkCenter(x, z);
    setMapUrl(`${mapUrlBase}/#${dimension}:${newCoords.x}:${newCoords.y}:${newCoords.z}:30:0:0:0:0:perspective`);
  }
  function updateMapFrameHome(x, y, z, dimension) {
    setMapUrl(`${mapUrlBase}/#${dimension}:${x}:${y + 2}:${z}:5:0:1.4:0:0:free`);
  }

  const player = playerData.data[0];
  const joinDate = new Date(player.joined);

  if (!player.community_id) {
    player.community_id = 99;
  }

  const communityName = CommunityIdMap[player.community_id];
  const communityColor = CommunityColorMap[player.community_id];

  return (
    <MainLayout noPadding>
      <div className="grid grid-template-columns-500px-auto max-height-100vh height-100vh" gap={0}>
        <div
          className="overflow-y-auto"
        >
          <div className="sticky top-0">
            <div className="height-125 overflow-hidden flex align-items-center position-relative">
              <div className="align-self-flex-start mr-2 position-relative">
                <Image
                  src={`https://visage.surgeplay.com/full/304/${player.player_id}`}
                  alt={`${player.name}'s portrait`}
                  width="198px"
                  height="320px"
                  layout="fixed"
                  priority
                />
              </div>

              <div className="grid gap-2">
                <h1 className="font-size-4">{player.name}</h1>
                <p>
                  <CommunityIcon
                    className="height-font-size-3 width-font-size-3 fill-white vertical-align-text-bottom mr-2"
                  />
                  {communityName}
                </p>
                <p>
                  <CalendarIcon
                    className="height-font-size-3 width-font-size-3 fill-white vertical-align-text-bottom mr-2"
                  />
                  Joined on {prettyPrintDate(joinDate)}
                </p>
                <div
                  className="position-absolute width-45 opacity-75 top-15 right-15 z-index-1"
                >
                  <Image src={`/static-assets/community/${player.community_id}.png`} alt="community watermark" width="45px" height="45px" />
                </div>
              </div>
            </div>
          </div>
          <div className="p-4">
            {player.home_x && player.home_y && player.home_z && player.home_dimension && (
              <button
                onClick={() => updateMapFrameHome(player.home_x, player.home_y, player.home_z, DimensionInternalNameMap[player.home_dimension])}
                className="p-0 bg-transparent text-left cursor-pointer"
              >
                <ChunkCard x={player.home_x} y={player.home_y} z={player.home_z} dimension={player.home_dimension} isHome />
              </button>
            )}
            {chunkData.data.length === 0 && <p>This player has not claimed any chunks yet.</p>}
            {chunkData.data.map((chunk, index) => {
              return (
                <button
                  onClick={() => updateMapFrame(chunk.x, chunk.z, DimensionInternalNameMap[chunk.dimension])}
                  key={index}
                  className="p-0 bg-transparent text-left cursor-pointer"
                >
                  <ChunkCard x={chunk.x} z={chunk.z} dimension={chunk.dimension} claimed_on={new Date(chunk.claimed_on)} />
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <iframe
            className="width-100 height-100 border-none"
            src={currentMapUrl}
            title={`${player.name}'s Base`}
          ></iframe>
        </div>
      </div>
    </MainLayout>
  );
}

export default Player;
