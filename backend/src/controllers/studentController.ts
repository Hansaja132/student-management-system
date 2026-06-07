import { Request, Response } from "express";
import { StudentModel } from "../models/student.model";

exports.getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await StudentModel.getAllStudents();
    return res.status(200).json({
      status: "success",
      results: students.length,
      data: students,
    });
  } catch (err) {
    return res.status(500).json({ message: "Error fetching students" });
  }
};

exports.createStudent = async (req: Request, res: Response) => {
  try {
    const {
      user_id,
      student_number,
      date_of_birth,
      gender,
      phone_number,
      address,
      enrollment_date,
    } = req.body;

    if (!user_id || !student_number) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newStudent = await StudentModel.create({
      user_id,
      student_number,
      date_of_birth,
      gender,
      phone_number,
      address,
      enrollment_date,
    });

    return res.status(201).json({
      status: "success",
      data: newStudent,
    });
  } catch (err) {
    return res.status(500).json({ message: "Error fetching students" });
  }
};

exports.getStudentById = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Student ID is required" });
    }

    try {
      const student = await StudentModel.findById(id.toString());

      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      return res.status(200).json({
        status: "success",
        data: student,
      });
    } catch (err) {
      return res.status(500).json({ message: "Error fetching students" });
    }
};

exports.updateStudent = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Student ID is required" });
  }

  try {
    const existingStudent = await StudentModel.findById(id.toString());

    if (!existingStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    const updates = req.body;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No update fields provided" });
    }

    const updatedStudent = await StudentModel.update(id.toString(), updates);

    return res.status(200).json({
      message: "Success",
      data: updatedStudent,
    });
  } catch (err) {
    return res.status(500).json({ message: "Error updating student" });
  }
};

exports.deleteStudent = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Student ID is required" });
  }

  try {
    const deletedStudent = await StudentModel.delete(id.toString());

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.status(204).json({
      message: "Student deleted successfully",
      data: null,
    });
  } catch (err) {
    return res.status(500).json({ message: "Error deleting student" });
  }
};
