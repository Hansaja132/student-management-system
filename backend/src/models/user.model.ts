import { pool } from "../config/dbConnect";
import { User } from "../types/User";

type CreateUserInput = Omit<User, "id">;
type UpdateUserInput = {
  name?: string;
  email?: string;
  role?: User["role"];
};

export class UserModel {
  static async create(user: CreateUserInput) {
    const [firstName, ...lastNameParts] = user.name.trim().split(/\s+/);
    const lastName = lastNameParts.join(" ");

    const query = `INSERT INTO users
      (
        first_name,
        last_name,
        email,
        password_hash,
        role
      )
      VALUES
      ($1, $2, $3, $4, $5)
      RETURNING *;`;

    const values = [firstName, lastName, user.email, user.password, user.role];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async getAllUsers() {
    const query = `SELECT * FROM users;`;
    const result = await pool.query(query);
    return result.rows;
  }

  static async findByEmail(email: string) {
    const query = `SELECT * FROM users WHERE email = $1;`;
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  static async findById(id: string) {
    const query = `SELECT * FROM users WHERE id = $1;`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async update(id: string, updates: UpdateUserInput) {
    const setClauses: string[] = [];
    const values: string[] = [];

    if (updates.name) {
      const [firstName, ...lastNameParts] = updates.name.trim().split(/\s+/);
      const lastName = lastNameParts.join(" ");

      values.push(firstName, lastName);
      setClauses.push(`first_name = $${values.length - 1}`);
      setClauses.push(`last_name = $${values.length}`);
    }

    if (updates.email) {
      values.push(updates.email);
      setClauses.push(`email = $${values.length}`);
    }

    if (updates.role) {
      values.push(updates.role);
      setClauses.push(`role = $${values.length}`);
    }

    values.push(id);

    const query = `UPDATE users SET ${setClauses.join(", ")}, updated_at = CURRENT_TIMESTAMP WHERE id = $${values.length} RETURNING *;`;
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async delete(id: string) {
    const query = `DELETE FROM users WHERE id = $1 RETURNING *;`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}
