import type { NextApiRequest, NextApiResponse } from "next";
import { executeQuery } from "@/internals/db";
import type { ApiError, LogEntryWithPlayerBase } from "@/internals/apiTypes";
import {
  generate405Response,
  validateChunkArguments,
} from "@/internals/apiUtils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LogEntryWithPlayerBase[] | ApiError>
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
    const results = await executeQuery<LogEntryWithPlayerBase>(
      `SELECT 
        le.id,
        le.x,
        le.z,
        le.dimension,
        le.player_id,
        p.name,
        le.entered_time
      FROM logentries le
      JOIN players p ON le.player_id = p.player_id
      WHERE le.dimension = $1 AND le.x = $2 AND le.z = $3
      ORDER BY le.entered_time DESC`,
      [dimension, x, z]
    );

    res.status(200).json(results);
  } catch (error) {
    console.error("unexpected error grabbing visitors log for chunk", error);

    res.status(500).json({
      errorMessage:
        "An unexpected error occurred trying to get this chunk's information.",
    });
  }
}
