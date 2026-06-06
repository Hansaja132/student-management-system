import express, { Request, Response } from "express";

const { databaseHealth } = require("../controllers/healthController");
const router = express.Router();

router.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "OK" });
});

router.get("/dbHealth", databaseHealth);

module.exports = router;
