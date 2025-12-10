const express = require("express");
const path = require("path");
const sqlite3 = require('sqlite3').verbose(); // Use .verbose() for more detailed error messages

const app = express();

app.use(express.static(path.join(__dirname, "PWA app"))); // Serving static files

// Connect to SQLite database
const db = new sqlite3.Database(path.join(__dirname, 'datasource.db'), (err) => {
  if (err) console.error(err.message);
  else console.log('Connected to SQLite database');
});

app.get('/data', (req, res) => {
  const sql = 'SELECT * FROM chances';
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('DB Error:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});


// Serve HTML pages
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "PWA app", "index.html")));
app.get("/fanfic", (req, res) => res.sendFile(path.join(__dirname, "PWA app", "fanfic.html")));
app.get("/feet", (req, res) => res.sendFile(path.join(__dirname, "PWA app", "feet.html")));
app.get("/database", (req, res) => res.sendFile(path.join(__dirname, "PWA app", "database.html")));

app.listen(8000, () => {
    console.log("Server is running on Port 8000");
    console.log("Visit: http://localhost:8000/");
});