const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const db = mysql
    .createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
    })
    .promise();

try {
    db.query(`
CREATE TABLE IF NOT EXISTS users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
)`);
    console.log("Users table created successfully or already exists.");

    db.query(`CREATE TABLE IF NOT EXISTS todos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
)`);
    console.log("Todos table created successfully or already exists.");
} catch (error) {
    console.log(error);
}

module.exports = db;
