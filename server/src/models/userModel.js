const db = require("../configs/db");

const createUser = async ({ username, email, password }) => {
    try {
        const [result] = await db.query(
            `INSERT INTO users(username, email, password)
            VALUES (?, ?, ?)`,
            [username, email, password]
        );
        return result;
    } catch (error) {
        console.error("Error creating user:", error);
    }
};

const getUsers = async () => {
    try {
        const [result] = await db.query(`SELECT * FROM users`);
        return result;
    } catch (error) {
        console.error("Error fetching users:", error);
    }
};

const getUserById = async (id) => {
    try {
        const [result] = await db.query(`SELECT * FROM users WHERE id = ?`, [
            id,
        ]);
        return result[0];
    } catch (error) {
        console.error("Error fetching user by ID:", error);
    }
};

const getUserByEmail = async (email) => {
    try {
        const [result] = await db.query(`SELECT * FROM users WHERE email = ?`, [
            email,
        ]);
        return result[0];
    } catch (error) {
        console.error("Error fetching user by email:", error);
    }
};

module.exports = {
    createUser,
    getUsers,
    getUserById,
    getUserByEmail,
};
