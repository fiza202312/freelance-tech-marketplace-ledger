const mysql = require("mysql2");

// Create MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "2617",
    database: "freelance_marketplace"
});

// Connect to Database
db.connect((err) => {
    if (err) {
        console.error("❌ Database connection failed:");
        console.error(err.message);
        return;
    }

    console.log("✅ Connected to MySQL Database");
});

module.exports = db;