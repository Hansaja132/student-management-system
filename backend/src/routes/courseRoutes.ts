import express, { Request, Response } from "express";

const {
  getAllCourses,
  createCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

const router = express.Router();

router.route("/").get(getAllCourses).post(createCourses);
router
  .route("/:id")
  .get(getCourseById)
  .patch(updateCourse)
  .delete(deleteCourse);

module.exports = router;
