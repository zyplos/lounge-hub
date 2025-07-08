import type { NextApiRequest, NextApiResponse } from "next";
import { generate405Response, isStringUUID } from "@/internals/apiUtils";
import type { ApiError, Chunk } from "@/internals/apiTypes";
import { executeQuery } from "@/internals/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Chunk[] | ApiError>
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
  const queryColumn = isUUID ? "p.player_id" : "p.name";
  const queryValue = isUUID ? "UUID_TO_BIN(?)" : "?";

  try {
    const results = await executeQuery<Chunk>(
      `SELECT
         BIN_TO_UUID(p.player_id) AS player_id,
         c.chunk_id,
         c.claimed_on,
         c.x,
         c.z,
         BIN_TO_UUID(c.dimension) AS dimension
       FROM players p
       LEFT JOIN chunks c ON p.player_id = c.player_id
       WHERE ${queryColumn} = ${queryValue}`,
      [identifier]
    );

    // Case 1: Player not found. The LEFT JOIN will produce an empty result set.
    if (results.length === 0) {
      return res.status(404).json({ errorMessage: "Player not found." });
    }

    // Case 2: Player exists, but has no claims. The result will be a single
    // row where chunk_id (and other chunk columns) is null.
    if (results.length === 1 && results[0].chunk_id === null) {
      return res.status(200).json([]);
    }

    // Case 3: Player exists and has claims. The result is the array of claims.
    // The query was designed to produce the same shape as the Chunk type.
    res.status(200).json(results);
  } catch (error) {
    console.error("unexpected error grabbing player land claims", error);

    res.status(500).json({
      errorMessage:
        "An unexpected error occurred trying to get this player's land claims.",
    });
  }
}
