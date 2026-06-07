import { pool } from "../config/dbConnect";
import { Teacher } from "../types/Teacher";

type CreateTeacherInput = Omit<Teacher, "id">;

export class TeacherModel {
  static async create(teacher: CreateTeacherInput) {
    const query = `INSERT INTO teachers
        (
          user_id,
          employee_number,
          phone,
          address,
          hire_date,
          specialization
        )
        VALUES
        ($1, $2, $3, $4, $5, $6)
        RETURNING *;`;
    const values = [
      teacher.user_id,
      teacher.employee_number,
      teacher.phone,
      teacher.address,
      teacher.hire_date,
      teacher.specialization,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async getAllTeachers() {
    const query = `SELECT * FROM teachers;`;
    const result = await pool.query(query);
    return result.rows;
  }

  static async findById(id: string) {
    const query = `SELECT * FROM teachers WHERE id = $1;`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async findByEmployeeNumber(employee_number: string) {
    const query = `SELECT * FROM teachers WHERE employee_number = $1;`;
    const result = await pool.query(query, [employee_number]);
    return result.rows[0];
  }

  static async update(id: string, updates: Partial<CreateTeacherInput>) {
    const setClauses: string[] = [];
    const values: any[] = [];
    let index = 1;

    for (const [key, value] of Object.entries(updates)) {
      if (value !== undefined) {
        setClauses.push(`${key} = $${index}`);
        values.push(value);
        index++;
      }
    }

    if (setClauses.length === 0) return null;

    values.push(id);
    const query = `UPDATE teachers SET ${setClauses.join(", ")}, updated_at = CURRENT_TIMESTAMP WHERE id = $${index} RETURNING *;`;
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async delete(id: string) {
    const query = `DELETE FROM teachers WHERE id = $1 RETURNING *;`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}
