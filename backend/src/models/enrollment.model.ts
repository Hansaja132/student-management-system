import { pool } from "../config/dbConnect";
import { Enrollment } from "../types/Enrollment";

type CreateEnrollmentInput = {
  student_id: string;
  course_id: string;
};

export class EnrollmentModel {
  static async create(enrollment: CreateEnrollmentInput) {
    const query = `INSERT INTO enrollments
        (student_id, course_id)
        VALUES ($1, $2)
        RETURNING *;`;
    const values = [enrollment.student_id, enrollment.course_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async getAllEnrollments() {
    const query = `SELECT * FROM enrollments;`;
    const result = await pool.query(query);
    return result.rows;
  }

  static async findById(id: string) {
    const query = `SELECT * FROM enrollments WHERE id = $1;`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async delete(id: string) {
    const query = `DELETE FROM enrollments WHERE id = $1 RETURNING *;`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}
