import type { NextApiRequest, NextApiResponse } from "next";
import { executeQuery } from "@/internals/db";
import type { ApiError, ChunkWithPlayerBase } from "@/internals/apiTypes";
import {
  generate405Response,
  validateChunkArguments,
} from "@/internals/apiUtils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChunkWithPlayerBase | ApiError>
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return generate405Response(req, res);
  }

  const queryArgs = validateChunkArguments(req);

  if ("errorMessage" in queryArgs) {
    return res.status(400).json(queryArgs);
  }

  const [dimension, x, z] = queryArgs;

  try {
    const results = await executeQuery<ChunkWithPlayerBase>(
      `SELECT 
        c.chunk_id, 
        BIN_TO_UUID(c.player_id) AS player_id, 
        p.name, 
        c.claimed_on, 
        c.x, 
        c.z,
        BIN_TO_UUID(c.dimension) AS dimension
      FROM chunks as c
      LEFT JOIN players as p ON c.player_id=p.player_id
      WHERE dimension=UUID_TO_BIN(?) AND x=? AND z=?`,
      [dimension, x, z]
    );

    if (results.length === 0) {
      return res.status(404).json({
        errorMessage: "The requested chunk hasn't been claimed by anyone.",
      });
    }

    const chunk = results[0];

    res.status(200).json(chunk);
  } catch (error) {
    console.error("unexpected error grabbing chunk owner info", error);

    res.status(500).json({
      errorMessage:
        "An unexpected error occurred trying to get this chunk's information.",
    });
  }
}
