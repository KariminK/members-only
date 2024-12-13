import pool from "../db/pool";

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
    return await pool.query(
      "INSERT INTO users (first_name, last_name, email, password, status) VALUES ($1, $2, $3, $4, 'member')",
      [user.first_name, user.last_name, user.email, user.password]
    );
  }
}
export default new UserModel();
