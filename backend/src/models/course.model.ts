import { pool } from "../config/dbConnect";
import { Course } from "../types/Course";

type CreateCourseInput = Omit<Course, "id">;

export class CourseModel {
  static async create(course: CreateCourseInput) {
    const query = `INSERT INTO courses
        (
          course_name,
          course_code,
          description,
          credits,
          teacher_id
        )
        VALUES
        ($1, $2, $3, $4, $5)
        RETURNING *;`;

    const values = [
      course.course_name,
      course.course_code,
      course.description,
      course.credits,
      course.teacher_id,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async getAllCourses() {
    const query = `SELECT * FROM courses;`;
    const result = await pool.query(query);
    return result.rows;
  }

  static async findById(id: string) {
    const query = `SELECT * FROM courses WHERE id = $1;`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async findByCode(code: string) {
    const query = `SELECT * FROM courses WHERE course_code = $1;`;
    const result = await pool.query(query, [code]);
    return result.rows[0];
  }

  static async update(id: string, updates: Partial<CreateCourseInput>) {}

  static async delete(id: string) {}
}
