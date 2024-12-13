import { config } from "dotenv";
import { readFile } from "fs";
import path from "path";
import { Client } from "pg";

config();

const client = new Client({
  connectionString: process.env.DB_CONNECTION_STRING,
});
console.log(process.env.DB_CONNECTION_STRING);

function populateDB() {
  readFile(path.join(__dirname, "database.sql"), async (err, data) => {
    try {
      if (err) return console.log("[error] ", err);
      const query = data.toString();
      await client.connect();
      await client.query(query);
      await client.end();
      console.log("[db] database populated successfully");
    } catch (error) {
      return console.log("[error] " + error);
    }
  });
}
populateDB();
