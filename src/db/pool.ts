import { config } from "dotenv";
import { Pool } from "pg";
config();
// TODO: Make pool to db
const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
  ssl: true,
});
export default pool;
