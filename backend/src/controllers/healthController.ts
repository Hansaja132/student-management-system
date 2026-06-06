import { Request, Response } from "express";
import { pool } from "../config/dbConnect";

exports.databaseHealth = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT 1 AS healthy");

    res.status(200).json({
      status: "OK",
      database: "connected",
      result: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      database: "disconnected",
      message:
        error instanceof Error ? error.message : "Database health check failed",
    });
  }
};
