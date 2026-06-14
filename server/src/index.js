import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});
const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    await pool.query("select now()");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
};

startServer();
