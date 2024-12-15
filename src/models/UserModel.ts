import pool from "../db/pool";
import { userStatus } from "../types";

class UserModel {
  // TODO:
  // methods
  async getUser(id?: number) {
    if (!id) return await pool.query("SELECT * FROM users;");
    else return await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  }
  async getUserByEmail(email: string) {
    return await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  }
  async createUser(user: Express.User) {
    await pool.query(
      "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)",
      [user.first_name, user.last_name, user.email, user.password]
    );
    return;
  }
  async updateUserStatus(id: number, status: userStatus) {
    await pool.query("UPDATE users SET status = $1 WHERE id = $2", [
      id,
      status,
    ]);
  }
}
export default new UserModel();
