import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { UserModel } from "../models/user.model";

const signToken = (userId: string) => {
  const secret = process.env.JWT_SECRET as Secret;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  return jwt.sign({ id: userId }, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
  });
};

// Separate function to compare passwords
const comparePassword = async (
  candidatePassword: string,
  userPasswordHash: string,
) => {
  return await bcrypt.compare(candidatePassword, userPasswordHash);
};

exports.login = async (req: Request, res: Response, next: Function) => {
  try {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // 2) Check if user exists
    const user = await UserModel.findByEmail(email);

    if (!user) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    // 3) Check if password is correct
    const isPasswordCorrect = await comparePassword(
      password,
      user.password_hash,
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    // 4) If everything ok, send token to client
    const token = signToken(user.id);

    user.password_hash = undefined;

    return res.status(200).json({
      status: "success",
      token,
      data: { user },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error during login" });
  }
};
