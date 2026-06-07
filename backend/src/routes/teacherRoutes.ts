import express from "express";

const {
  getAllTeachers,
  createTeacher,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
} = require("../controllers/teacherController");

const router = express.Router();

router.route("/").get(getAllTeachers).post(createTeacher);
router
  .route("/:id")
  .get(getTeacherById)
  .patch(updateTeacher)
  .delete(deleteTeacher);

module.exports = router;
