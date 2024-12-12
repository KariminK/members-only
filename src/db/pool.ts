import { Pool } from "pg";

// TODO: Make pool to db
const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
});
export default pool;
