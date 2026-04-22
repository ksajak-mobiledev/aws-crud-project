const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function initDb() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        done BOOLEAN DEFAULT FALSE
      )
    `);

    const countResult = await pool.query(`SELECT COUNT(*) FROM tasks`);
    const count = Number(countResult.rows[0].count);

    if (count === 0) {
      await pool.query(`
        INSERT INTO tasks (title, done)
        VALUES
          ('Learn AWS', FALSE),
          ('Deploy CRUD App', TRUE)
      `);
    }

    console.log("Database initialized");
  } catch (error) {
    console.error("Database init error:", error);
  }
}

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/tasks", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM tasks ORDER BY id ASC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("GET /tasks error:", error);
    res.status(500).json({ message: "Database error" });
  }
});

app.get("/tasks/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const result = await pool.query(
      "SELECT * FROM tasks WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("GET /tasks/:id error:", error);
    res.status(500).json({ message: "Database error" });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const result = await pool.query(
      "INSERT INTO tasks (title, done) VALUES ($1, $2) RETURNING *",
      [title, false]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("POST /tasks error:", error);
    res.status(500).json({ message: "Database error" });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const result = await pool.query(
      "DELETE FROM tasks WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("DELETE /tasks/:id error:", error);
    res.status(500).json({ message: "Database error" });
  }
});

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await initDb();
});