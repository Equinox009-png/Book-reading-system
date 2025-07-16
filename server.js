const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "jyoti123", // your MySQL password
  database: "booksystem",
});

db.connect(err => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

app.get("/books", (req, res) => {
  db.query("SELECT * FROM books", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.post("/books", (req, res) => {
  const { title, author } = req.body;
  db.query(
    "INSERT INTO books (title, author) VALUES (?, ?)",
    [title, author],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Book added", id: result.insertId });
    }
  );
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
