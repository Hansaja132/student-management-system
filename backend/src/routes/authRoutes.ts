import express, { Request, Response } from "express";
const { login } = require("../controllers/authController");

const router = express.Router();

router.post("/login", login);
// router.post("/logout", login);
// router.post("/me", login); //IMPLEMENT LATER

module.exports = router;
