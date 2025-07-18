import pool from "./poolInstance";
import type { QueryResultRow, PoolClient } from "pg";

export async function executeQuery<T extends QueryResultRow>(
  query: string,
  params: (string | number | boolean | null)[] = []
): Promise<T[]> {
  let client: PoolClient | undefined;
  try {
    client = await pool.connect();
    const { rows } = await client.query<T>(query, params);
    return rows;
  } catch (error) {
    console.error("Database query failed:", error);
    throw new Error("An error occurred trying to grab data.");
  } finally {
    if (client) {
      client.release();
    }
  }
}
