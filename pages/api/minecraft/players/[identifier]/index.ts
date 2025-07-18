import type { NextApiRequest, NextApiResponse } from "next";
import { executeQuery } from "@/internals/db";
import type { ApiError, Player } from "@/internals/apiTypes";
import { generate405Response, isStringUUID } from "@/internals/apiUtils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Player | ApiError>
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

  const isUUID = isStringUUID(identifier);
  console.log("isUUID", isUUID, identifier);

  try {
    const playerResults = await executeQuery<Player>(
      `SELECT 
        player_id,
        name,
        joined,
        community_id,
        home_x,
        home_y,
        home_z,
        home_dimension,
        home_hidden
      FROM players WHERE ${isUUID ? "player_id" : "name"}=$1`,
      [identifier]
    );

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

    res.status(200).json(player);
  } catch (error) {
    console.error("unexpected error grabbing player info", error);

    res.status(500).json({
      errorMessage:
        "An unexpected error occurred trying to get this player's info.",
    });
  }
}
