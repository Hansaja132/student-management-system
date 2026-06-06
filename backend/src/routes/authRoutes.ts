import express, { Request, Response } from "express";
const { login } = require("../controllers/authController");

const router = express.Router();

router.post("/login", login);

module.exports = router;