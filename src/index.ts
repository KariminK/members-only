import express, { RequestHandler } from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(3001, () => {
  console.log("Server listening! PORT: 3001");
});
