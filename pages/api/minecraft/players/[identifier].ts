import type { NextApiRequest, NextApiResponse } from "next";
import { executeQuery } from "@/internals/db";
import type { ApiError, Player, Chunk } from "@/internals/apiTypes";
import { generate405Response } from "@/internals/apiUtils";

// Regex to check if a string is a valid UUID
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

interface PlayerApiResponse extends Player {
  chunks?: Chunk[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PlayerApiResponse | ApiError>
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return generate405Response(req, res);
  }

  const { identifier } = req.query;

  if (!identifier || typeof identifier !== "string") {
    return res
      .status(400)
      .json({ errorMessage: "Player name or UUID must be provided." });
  }

  const isUUID = UUID_REGEX.test(identifier);
  const queryColumn = isUUID ? "player_id" : "name";
  const queryValue = isUUID ? "UUID_TO_BIN(?)" : "?";

  try {
    const playerResults = await executeQuery<Player>(
      `SELECT BIN_TO_UUID(player_id) AS player_id, name, joined, community_id, home_x, home_y, home_z, BIN_TO_UUID(home_dimension) AS home_dimension, home_hidden FROM players WHERE ${queryColumn}=${queryValue}`,
      [identifier]
    );

    console.log("PLAYER RESULTS", playerResults);

    if (playerResults.length === 0) {
      return res.status(404).json({ errorMessage: "Player not found." });
    }

    const player = playerResults[0];

    // hide home stuff to client
    if (player.home_hidden) {
      player.home_x = null;
      player.home_y = null;
      player.home_z = null;
      player.home_dimension = null;
    }

    const response: PlayerApiResponse = player;

    res.status(200).json(response);
  } catch (error) {
    console.error("unexpected error grabbing player info", error);
    res.status(500).json({
      errorMessage:
        "An unexpected error occurred trying to get this player's info.",
    });
  }
}
