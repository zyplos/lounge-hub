import mysql, { ConnectionOptions, RowDataPacket } from "mysql2/promise";
import type { NextApiRequest, NextApiResponse } from "next";

interface LogEntryData {
  x: number;
  z: number;
  dimension: string; // UUID
  player_id: string; // UUID
  name: string;
  entered_time: string; // Assuming datetime string
}

interface ApiLogEntryResponse {
  data?: LogEntryData[];
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
  res: NextApiResponse<ApiLogEntryResponse>
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
    res.status(400).json({ error: "Dimension must be specified." });
    return;
  }

  let connection: mysql.Connection | null = null;
  try {
    connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute<RowDataPacket[]>(
      "SELECT x, z, BIN_TO_UUID(dimension) AS dimension, BIN_TO_UUID(player_id) AS player_id, name, entered_time " +
        "FROM logentries JOIN players USING (player_id) " +
        "WHERE x=? AND z=? AND dimension=UUID_TO_BIN(?) " +
        "ORDER BY id DESC",
      [x, z, dimension]
    );
    res.status(200).json({ data: rows as LogEntryData[] });
  } catch (error: any) {
    console.error("Database Error fetching log entries by coords:", error);
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
