import mysql, {
  type Connection,
  type ConnectionOptions,
  type RowDataPacket,
} from "mysql2/promise";

const dbConfig: ConnectionOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "loungeSurvival",
};

export async function executeQuery<T>(
  query: string,
  params: (string | number)[] = []
): Promise<T[]> {
  let connection: Connection | null = null;

  try {
    connection = await mysql.createConnection(dbConfig);
    // type safety https://stackoverflow.com/a/76730761
    const [rows] = await connection.execute<Array<T & RowDataPacket>>(
      query,
      params
    );
    return rows;
  } catch (error) {
    console.error("Database query failed:", error);
    // Throw a generic error to be caught by the API handler
    throw new Error("An error occurred trying to grab data.");
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
