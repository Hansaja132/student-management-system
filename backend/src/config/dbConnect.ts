import dotenv from "dotenv";
import path from "path";
import { Pool } from "pg";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const databaseUrl = process.env.DATABASE_URL?.replace(
  "[YOUR-PASSWORD]",
  process.env.DB_PASSWORD || "",
);

export const pool = new Pool({
  connectionString: databaseUrl,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log("PostgreSQL Connected");
    client.release();
  } catch (error) {
    console.error("Database Connection Failed:", error);
    process.exit(1);
  }
};
