import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

app.use("/api", require("./routes/healthRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Endpoint not found" });
});

module.exports = app;
