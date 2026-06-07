import express from "express";
const {
  getAllEnrollments,
  createEnrollment,
  getEnrollmentById,
  deleteEnrollment,
} = require("../controllers/enrollmentController");

const router = express.Router();

router.route("/").get(getAllEnrollments).post(createEnrollment);
router
  .route("/:id")
  .get(getEnrollmentById)
  .delete(deleteEnrollment);

module.exports = router;
