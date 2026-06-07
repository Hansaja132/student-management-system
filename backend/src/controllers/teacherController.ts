import { Request, Response } from "express";
import { TeacherModel } from "../models/teacher.model";

exports.getAllTeachers = async (req: Request, res: Response) => {
  try {
    const teachers = await TeacherModel.getAllTeachers();
    return res.status(200).json({
      status: "success",
      results: teachers.length,
      data: teachers,
    });
  } catch (err) {
    return res.status(500).json({ message: "Error fetching Teachers" });
  }
};

exports.createTeacher = async (req: Request, res: Response) => {
  try {
    const {
      user_id,
      employee_number,
      phone,
      address,
      hire_date,
      specialization,
    } = req.body;

    if (!user_id || !employee_number) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newTeacher = await TeacherModel.create({
      user_id,
      employee_number,
      phone,
      address,
      hire_date,
      specialization,
    });

    return res.status(201).json({
      status: "success",
      data: newTeacher,
    });
  } catch (err) {
    return res.status(500).json({ message: "Error fetching students" });
  }
};

exports.getTeacherById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Teacher ID is required" });
  }

  try {
    const teacher = await TeacherModel.findById(id.toString());

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    return res.status(200).json({
      status: "success",
      data: teacher,
    });
  } catch (err) {
    return res.status(500).json({ message: "Error fetching teacher" });
  }
};

exports.updateTeacher = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Teacher ID is required" });
  }

  try {
    const existingTeacher = await TeacherModel.findById(id.toString());

    if (!existingTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const updates = req.body;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No update fields provided" });
    }

    const updatedTeacher = await TeacherModel.update(id.toString(), updates);

    return res.status(200).json({
      message: "Success",
      data: updatedTeacher,
    });
  } catch (err) {
    return res.status(500).json({ message: "Error updating teacher" });
  }
};

exports.deleteTeacher = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Teacher ID is required" });
  }

  try {
    const deletedTeacher = await TeacherModel.delete(id.toString());

    if (!deletedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    return res.status(204).json({
      message: "Teacher deleted successfully",
      data: null,
    });
  } catch (err) {
    return res.status(500).json({ message: "Error deleting teacher" });
  }
};
