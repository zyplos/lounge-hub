import mysql, { ConnectionOptions, RowDataPacket } from "mysql2/promise";
import type { NextApiRequest, NextApiResponse } from "next";

interface ChunkDataByUUID {
  chunk_id: number;
  player_id: string; // UUID
  claimed_on: string; // Assuming datetime string
  x: number;
  z: number;
  dimension: string; // UUID
}

interface ApiResponseDataByUUID {
  data?: ChunkDataByUUID[];
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
  res: NextApiResponse<ApiResponseDataByUUID>
) {
  const { uuid: queryUuid } = req.query;

  if (!queryUuid || typeof queryUuid !== "string") {
    res
      .status(400)
      .json({ error: "Player UUID must be specified as a string." });
    return;
  }

  const uuid = queryUuid;

  let connection: mysql.Connection | null = null;
  try {
    connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute<RowDataPacket[]>(
      "SELECT chunk_id, BIN_TO_UUID(player_id) AS player_id, claimed_on, x, z, " +
        "BIN_TO_UUID(dimension) AS dimension " +
        "FROM chunks WHERE player_id=UUID_TO_BIN(?)",
      [uuid]
    );
    res.status(200).json({ data: rows as ChunkDataByUUID[] });
  } catch (error: any) {
    console.error("Database Error fetching chunks by UUID:", error);
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
