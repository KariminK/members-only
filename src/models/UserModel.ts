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
}
export default UserModel;
