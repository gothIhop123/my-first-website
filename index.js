const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "PWA app")));

// NEW CODE for database
const sqlite3 = require('sqlite3').verbose(); // Use .verbose() for more detailed error messages

// NEW CODE for database connect to your SQLite database
const db = new sqlite3.Database('./datasource.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

// NEW CODE: Handle a GET request to the '/data' endpoint
app.get('/data', (req, res) => {
    // Define the SQL query to retrieve all records from the 'favourite_wiki' table
    const sql = `SELECT * FROM favourite_wiki`; // Replace with your actual table name if different

    // Execute the SQL query using the database connection
    db.all(sql, [], (err, rows) => {
        // If an error occurs during the query, send a 500 status with the error message
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        // If the query is successful, send the retrieved rows as a JSON response
        res.json(rows);
    });
});

function servePage(page) {
    return path.join(__dirname, "PWA app", page);
}

// Routes to HTML pages
app.get("/", (req, res) => res.sendFile(servePage("index.html")));
app.get("/fanfic", (req, res) => res.sendFile(servePage("fanfic.html")));
app.get("/feet", (req, res) => res.sendFile(servePage("feet.html")));
app.get("/database", (req, res) => res.sendFile(servePage("database.html")));

app.listen(8000, () => {
    console.log("Server is running on Port 8000");
    console.log("Visit: http://localhost:8000/");
});