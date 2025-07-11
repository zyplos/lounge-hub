import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import useSWR from "swr";

import MainLayout from "@/internals/MainLayout";
import type { Player } from "@/internals/apiTypes";
import type { FetcherError } from "@/internals/fetcher";
import { CommunityColorMap, getPlayerFaceUrl } from "@/internals/clientUtils";

import styles from "@/styles/PlayerDirectory.module.scss";
import Spinner from "@/components/Spinner";
import { DynamicItemFrame } from "@/components/DynamicItemFrame";
import clsx from "clsx";

export default function PlayerIndexPage() {
  const [playerName, setPlayerName] = useState("");
  const debouncedPlayerName = useDebounce(playerName, 500);

  const { data: allPlayers, error: playersError } = useSWR<
    Player[],
    FetcherError
  >("/api/minecraft/players");

  const filteredPlayers = useMemo(() => {
    // If there are no players loaded, return an empty array
    if (!allPlayers) {
      return [];
    }

    // If the search box is empty, return all players
    if (!debouncedPlayerName) {
      return allPlayers;
    }

    // Otherwise, filter players whose names include the search term
    return allPlayers.filter((player) =>
      player.name.toLowerCase().includes(debouncedPlayerName.toLowerCase())
    );
  }, [allPlayers, debouncedPlayerName]);

  if (playersError) {
    return (
      <MainLayout>
        <div className="paragraphMargin textContent">
          <h1>Player Directory</h1>
          <p>
            Sorry! Looks like the player directory is unavailable at the moment.
            Check back later.
          </p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bottomSpaceMargin textContent">
        <h1>Player Directory</h1>
        <p>See where someone's base is or check their land claims.</p>
      </div>

      <div className={clsx(styles.form_Row, "paragraphMargin")}>
        <label className={styles.form_Label} htmlFor="playerSearchBox">
          Search for player
        </label>

        <input
          id="playerSearchBox"
          className={styles.form_TextInput}
          name="playerName"
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          required
          placeholder="Player name..."
        />
      </div>

      {!allPlayers && !playersError && (
        <div className="sectionMargin textContent">
          <Spinner />
          <p>Loading players...</p>
        </div>
      )}

      <div className={styles.playerGrid}>
        {filteredPlayers.map((player) => {
          return (
            <>
              <PlayerHoverCard key={player.player_id} player={player} />
            </>
          );
        })}
      </div>
    </MainLayout>
  );
}

interface PlayerHoverCardProps {
  player: Player;
}

function PlayerHoverCard({ player }: PlayerHoverCardProps) {
  const communityId = player.community_id || 99;
  // const communityName = CommunityIdMap[communityId] || CommunityIdMap[99];
  const communityColor = CommunityColorMap[communityId] || "#333";

  return (
    <Link
      key={player.player_id}
      href={`/mc/player/${player.player_id}`}
      className={styles.playerLink}
    >
      {/** biome-ignore lint/performance/noImgElement: visage url */}
      <img
        src={getPlayerFaceUrl(player.player_id, 256)}
        alt=""
        width={64}
        height={64}
        className={styles.playerImage}
      />

      <DynamicItemFrame
        color={communityColor}
        width="128"
        height="128"
        className={styles.itemFrame}
      />

      <span className={styles.tooltip}>{player.name}</span>
    </Link>
  );
}

/**
 * A custom hook to debounce a value.
 * This is used to delay the search filtering until the user has stopped typing.
 * @author Gemini 2.5 Pro
 * @param value The value to debounce.
 * @param delay The debounce delay in milliseconds.
 * @returns The debounced value.
 */
function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up a timer to update the debounced value after the specified delay
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    // Clean up the timer if the value changes before the delay has passed
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
