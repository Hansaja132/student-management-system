import { Request, Response } from "express";
import { CourseModel } from "../models/course.model";

exports.getAllCourses = async (req: Request, res: Response) => {
  try {
    const courses = await CourseModel.getAllCourses();
    return res.status(200).json({
      status: "success",
      results: courses.length,
      data: courses,
    });
  } catch (err) {
    return res.status(500).json({ message: "Error fetching courses" });
  }
};

exports.createCourses = async (req: Request, res: Response) => {
  try {
    const { course_code, course_name, credits, description, teacher_id } =
      req.body;

    if (!course_code || !course_name || !credits) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newCourse = await CourseModel.create({
      course_code,
      course_name,
      credits,
      description,
      teacher_id,
    });

    return res.status(201).json({
      status: "success",
      data: newCourse,
    });
  } catch (err) {
    return res.status(500).json({ message: "Error creating course" });
  }
};

exports.getCourseById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Course ID is required" });
  }

  try {
    const course = await CourseModel.findById(id.toString());

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json({
      status: "success",
      data: course,
    });
  } catch (err) {
    return res.status(500).json({ message: "Error fetching course" });
  }
};

exports.updateCourse = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Course ID is required" });
  }

  try {
    const existingCourse = await CourseModel.findById(id.toString());

    if (!existingCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    const updates = req.body;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No update fields provided" });
    }

    const updatedCourse = await CourseModel.update(id.toString(), updates);

    return res.status(200).json({
      message: "Success",
      data: updatedCourse,
    });
  } catch (err) {
    return res.status(500).json({ message: "Error updating course" });
  }
};

exports.deleteCourse = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Course ID is required" });
  }

  try {
    const deletedCourse = await CourseModel.delete(id.toString());

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(204).json({
      message: "Course deleted successfully",
      data: null,
    });
  } catch (err) {
    return res.status(500).json({ message: "Error deleting course" });
  }
};
