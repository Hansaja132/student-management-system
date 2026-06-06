import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { UserModel } from "../models/user.model";

// Get all users
exports.getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.getAllUsers();
    return res.status(200).json({
      status: "success",
      results: users.length,
      data: users,
    });
  } catch (err) {
    return res.status(500).json({ message: "Error fetching users" });
  }
};

// Create new user
exports.createUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const savedUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(201).json(savedUser);
  } catch (error) {
    return res.status(500).json({ message: "Error creating user" });
  }
};

// Get user by ID
exports.getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const user = await UserModel.findById(id.toString());

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({ message: "Error fetching user" });
  }
};

// IMPLEMENT to get user by email
// exports.getUserByEmail = (req: Request, res: Response) => {
//   res.status(200).send("Get User by Email endpoint");
// };

exports.updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const existingUser = await UserModel.findById(id.toString());

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const { name, email, role, password } = req.body;

    if (!name && !email && !role && !password) {
      return res.status(400).json({ message: "No update fields provided" });
    }

    if (password) {
      return res.status(400).json({
        message: "Password cannot be updated through this route",
      });
    }

    const updatedUser = await UserModel.update(id.toString(), {
      name,
      email,
      role,
    });

    return res.status(200).json({
      message: "Success",
      data: updatedUser,
    });
  } catch (err) {
    return res.status(500).json({ message: "Error updating user" });
  }
};

exports.deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const deletedUser = await UserModel.delete(id.toString());

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(204).json({
      message: "User deleted successfully",
      data: null,
    });
  } catch (err) {
    return res.status(500).json({ message: "Error deleting user" });
  }
};
