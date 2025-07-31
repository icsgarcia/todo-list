const db = require("../configs/db");

try {
    db.query(`
CREATE TABLE IF NOT EXISTS users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
)`);
    console.log("Users table created successfully or already exists.");
} catch (error) {
    console.log(error);
}
