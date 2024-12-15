import pool from "../db/pool";

class MessageModel {
  async get() {
    return await pool.query("SELECT * FROM messages");
  }
}
export default new MessageModel();
