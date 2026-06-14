import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";

const app = express()

dotenv.config()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

pool.connect()
.then(() => {
    console.log('Connected to the database');
})
.catch((err) => {
    console.error('Error connecting to the database', err);
});