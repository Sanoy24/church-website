// Switched to SQLite for local development / seeding.
// The original MySQL pool is left commented for easy reversion.
// const mysql = require('mysql2/promise');
// require('dotenv').config();
// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT || 3306,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });
// pool.getConnection()
//   .then(connection => {
//     console.log('✅ MySQL connected successfully');
//     connection.release();
//   })
//   .catch(err => {
//     console.error('❌ MySQL connection failed:', err.message);
//   });

// Lightweight SQLite compatibility wrapper exposing a `query` method
// that returns `[rows, fields]` similar to mysql2/promise.
const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const dataDir = path.resolve(__dirname, "../../data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
const dbPath = path.join(dataDir, process.env.SQLITE_DB || "dev.sqlite");

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("❌ SQLite open error:", err.message);
    } else {
        console.log("✅ SQLite DB opened at", dbPath);
    }
});

function query(sql, params = []) {
    return new Promise((resolve, reject) => {
        // Choose all vs run based on SQL verb
        const verb = sql.trim().split(" ")[0].toUpperCase();
        if (verb === "SELECT" || verb === "PRAGMA") {
            db.all(sql, params, (err, rows) => {
                if (err) return reject(err);
                resolve([rows, undefined]);
            });
        } else {
            db.run(sql, params, function (err) {
                if (err) return reject(err);
                // mimic mysql2 result: affectedRows / insertId
                const result = {
                    affectedRows: this.changes,
                    insertId: this.lastID,
                };
                resolve([result, undefined]);
            });
        }
    });
}

function getConnection() {
    // return a dummy connection object with a release() method
    return Promise.resolve({ release: () => {} });
}

module.exports = { query, getConnection, raw: db };
