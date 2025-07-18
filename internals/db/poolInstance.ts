import { Pool, type PoolConfig } from "pg";

const dbConfig: PoolConfig = {
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: "loungesurvival",
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
};

const pool = new Pool(dbConfig);

export default pool;
