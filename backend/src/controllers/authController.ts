import { Request, Response } from "express";

const signToken = (userId: number) => {
  // IMPLEMENT JWT token generation logic here
  return "dummy-jwt-token";
};

exports.login = async (req: Request, res: Response, next: Function) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  console.log("Login attempt:", { email, password });

  const token = signToken(1); // Replace 1 with actual user ID

  res.status(200).json({ status: "Success", token, email });
};
