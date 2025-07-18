import type { NextApiRequest, NextApiResponse } from "next";
import type { ApiError, Player } from "@/internals/apiTypes";
import { generate405Response } from "@/internals/apiUtils";
import { executeQuery } from "@/internals/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Player[] | ApiError>
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return generate405Response(req, res);
  }

  try {
    const players = await executeQuery<Player>(
      "SELECT player_id, name, community_id FROM players"
    );

    res.status(200).json(players);
  } catch (error) {
    console.error("unexpected error grabbing player info", error);

    res.status(500).json({
      errorMessage:
        "An unexpected error occurred trying to get this player's info.",
    });
  }
}
