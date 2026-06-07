import { pool } from "../config/dbConnect";
import { Student } from "../types/Student";

type CreateStudentInput = Omit<Student, "id">;

export class StudentModel {
  static async create(student: CreateStudentInput) {
    const query = `INSERT INTO students
        (
          user_id,
          student_number,
          date_of_birth,
          gender,
          phone,
          address,
          enrollment_date
        )
        VALUES
        ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;`;
    const values = [
      student.user_id,
      student.student_number,
      student.date_of_birth,
      student.gender,
      student.phone_number,
      student.address,
      student.enrollment_date,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async getAllStudents() {
    const query = `SELECT * FROM students;`;
    const result = await pool.query(query);
    return result.rows;
  }

  static async findById(id: string) {
    const query = `SELECT * FROM students WHERE id = $1;`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async findByStudentNumber(student_number: string) {
    const query = `SELECT * FROM students WHERE student_number = $1;`;
    const result = await pool.query(query, [student_number]);
    return result.rows[0];
  }

  static async update(id: string, updates: Partial<CreateStudentInput>) {
    const setClauses: string[] = [];
    const values: any[] = [];
    let index = 1;

    for (const [key, value] of Object.entries(updates)) {
      if (value !== undefined) {
        // Map phone_number to phone column
        const columnName = key === 'phone_number' ? 'phone' : key;
        setClauses.push(`${columnName} = $${index}`);
        values.push(value);
        index++;
      }
    }

    if (setClauses.length === 0) return null;

    values.push(id);
    const query = `UPDATE students SET ${setClauses.join(", ")}, updated_at = CURRENT_TIMESTAMP WHERE id = $${index} RETURNING *;`;
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async delete(id: string) {
    const query = `DELETE FROM students WHERE id = $1 RETURNING *;`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}
