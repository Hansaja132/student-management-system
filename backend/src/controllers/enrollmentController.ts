import { Request, Response } from "express";
import { EnrollmentModel } from "../models/enrollment.model";

exports.getAllEnrollments = async (req: Request, res: Response) => {
  try {
    const enrollments = await EnrollmentModel.getAllEnrollments();
    return res.status(200).json({
      status: "success",
      results: enrollments.length,
      data: enrollments,
    });
  } catch (err) {
    console.error("Error fetching enrollments:", err);
    return res.status(500).json({ message: "Error fetching enrollments" });
  }
};

exports.createEnrollment = async (req: Request, res: Response) => {
  try {
    const { studentId, courseId } = req.body;

    if (!studentId || !courseId) {
      return res
        .status(400)
        .json({ message: "Missing required fields: studentId and courseId" });
    }

    const newEnrollment = await EnrollmentModel.create({
      student_id: studentId,
      course_id: courseId,
    });

    return res.status(201).json({
      status: "success",
      data: newEnrollment,
    });
  } catch (err) {
    console.error("Error creating enrollment:", err);

    if (err instanceof Error && err.message.includes("unique constraint")) {
      return res
        .status(409)
        .json({ message: "Student is already enrolled in this course" });
    }

    return res.status(500).json({ message: "Error creating enrollment" });
  }
};

exports.getEnrollmentById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Enrollment ID is required" });
  }

  try {
    const enrollment = await EnrollmentModel.findById(id.toString());

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    return res.status(200).json({
      status: "success",
      data: enrollment,
    });
  } catch (err) {
    console.error("Error fetching enrollment:", err);
    return res.status(500).json({ message: "Error fetching enrollment" });
  }
};

exports.deleteEnrollment = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Enrollment ID is required" });
  }

  try {
    const deletedEnrollment = await EnrollmentModel.delete(id.toString());

    if (!deletedEnrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    return res.status(204).json({
      message: "Enrollment deleted successfully",
      data: null,
    });
  } catch (err) {
    console.error("Error deleting enrollment:", err);
    return res.status(500).json({ message: "Error deleting enrollment" });
  }
};
