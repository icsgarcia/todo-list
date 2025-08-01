const db = require("../configs/db");

(async () => {
    try {
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
})();
