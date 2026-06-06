import { Request, Response } from "express";

exports.getAllCourses = (req: Request, res: Response) => {
  res.status(200).send("Get all Course endpoint");
};

exports.createCourses = (req: Request, res: Response) => {
  res.status(200).send("Create Course endpoint");
};

exports.getCourseById = (req: Request, res: Response) => {
  res.status(200).send("Get Course by ID endpoint");
};

exports.updateCourse = (req: Request, res: Response) => {
  res.status(200).send("Update Course endpoint");
};

exports.deleteCourse = (req: Request, res: Response) => {
  res.status(200).send("Delete Course endpoint");
};
