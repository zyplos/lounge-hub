import mysql, { ConnectionOptions, RowDataPacket } from "mysql2/promise";
import type { NextApiRequest, NextApiResponse } from "next";

interface PlayerData {
  player_id: string; // UUID
  name: string;
  joined: string; // Assuming datetime string
  community_id: number | null;
  home_x: number | null;
  home_y: number | null;
  home_z: number | null;
  home_dimension: string | null; // UUID or custom message
  home_hidden: boolean | number; // Typically boolean (0 or 1 from DB)
}

interface ApiPlayerResponse {
  data?: PlayerData[];
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
  res: NextApiResponse<ApiPlayerResponse>
) {
  const { name: queryName } = req.query;

  // console.log("process.env.MAP_VANILLA_URL_BASE", process.env.MAP_VANILLA_URL_BASE); // This seems unused here

  if (!queryName || typeof queryName !== "string") {
    res
      .status(400)
      .json({ error: "No player name specified or name is invalid." });
    return;
  }

  const name = queryName;
  let connection: mysql.Connection | null = null;

  try {
    connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute<RowDataPacket[]>(
      "SELECT BIN_TO_UUID(player_id) AS player_id, name, joined, community_id, home_x, home_y, home_z, BIN_TO_UUID(home_dimension) AS home_dimension, home_hidden FROM players WHERE name=?",
      [name]
    );

    const playerData = rows as PlayerData[];

    if (playerData.length > 0) {
      // home_hidden is likely 0 or 1 from DB, treat as boolean
      if (playerData[0].home_hidden) {
        playerData[0].home_x = null;
        playerData[0].home_y = null;
        playerData[0].home_z = null;
        playerData[0].home_dimension = "sneaky sneaky. nothing here";
      }
    }
    res.status(200).json({ data: playerData });
  } catch (error: any) {
    console.error("Database Error fetching player data:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve player data. " + error.message });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
