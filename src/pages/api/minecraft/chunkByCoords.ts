import mysql, { ConnectionOptions, RowDataPacket } from "mysql2/promise";
import type { NextApiRequest, NextApiResponse } from "next";

interface ChunkData {
  chunk_id: number;
  player_id: string; // UUID
  name: string;
  claimed_on: string; // Assuming datetime string
  x: number;
  z: number;
  dimension: string; // UUID
}

interface ApiResponseData {
  data?: ChunkData[];
  error?: string;
}

const dbConfig: ConnectionOptions = {
  host: process.env.DB_HOST as string,
  user: process.env.DB_USERNAME as string,
  password: process.env.DB_PASSWORD as string,
  database: "loungeSurvival",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseData>
) {
  const { x: queryX, z: queryZ, dimension: queryDimension } = req.query;

  if (!queryX || !queryZ || !queryDimension) {
    res
      .status(400)
      .json({ error: "Chunk X, Z, and dimension must be specified." });
    return;
  }

  const x = typeof queryX === "string" ? parseInt(queryX, 10) : NaN;
  const z = typeof queryZ === "string" ? parseInt(queryZ, 10) : NaN;
  const dimension = typeof queryDimension === "string" ? queryDimension : "";

  if (isNaN(x) || isNaN(z)) {
    res.status(400).json({ error: "Chunk X and Z must be valid numbers." });
    return;
  }
  if (!dimension) {
    // This case should be caught by the first check, but as a safeguard
    res.status(400).json({ error: "Dimension must be specified." });
    return;
  }

  let connection: mysql.Connection | null = null;
  try {
    connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute<RowDataPacket[]>(
      "SELECT chunk_id, BIN_TO_UUID(player_id) AS player_id, name, claimed_on, x, z, " +
        "BIN_TO_UUID(dimension) AS dimension " +
        "FROM chunks JOIN players USING (player_id) WHERE x=? AND z=? AND dimension=UUID_TO_BIN(?)",
      [x, z, dimension]
    );
    res.status(200).json({ data: rows as ChunkData[] });
  } catch (error: any) {
    console.error("Database Error:", error);
    res
      .status(500)
      .json({
        error: "Failed to retrieve data from the database. " + error.message,
      });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
