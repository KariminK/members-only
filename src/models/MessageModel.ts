import pool from "../db/pool";

class MessageModel {
  async get() {
    return await pool.query(
      "SELECT text, author_id, sent_date, CONCAT(first_name, ' ', last_name) as author FROM messages JOIN users ON users.id = messages.author_id"
    );
  }
  async send(text: string, author_id: number) {
    return await pool.query(
      "INSERT INTO messages (text, author_id, sent_date) VALUES ($1, $2, CURRENT_TIMESTAMP)",
      [text, author_id]
    );
  }
}
export default new MessageModel();
