const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const db = require("../configs/db");
const { generateAccessToken } = require("../middlewares/authMiddleware");

dotenv.config();

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [user] = await db.query(`SELECT * FROM users WHERE email = ?`, [
            email,
        ]);
        const isMatch = await bcrypt.compare(password, user[0].password);
        if (isMatch) {
            const accessToken = generateAccessToken(user[0]);

            return res.status(200).json({
                message: "Login successful",
                accessToken,
            });
        } else {
            return res
                .status(401)
                .json({ message: "Invalid email or password" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = { username, email, password: hashedPassword };
        await db.query(
            `INSERT INTO users(username, email, password)
            VALUES (?, ?, ?)`,
            [user.username, user.email, user.password]
        );
        return res
            .status(201)
            .json({ message: "User registered successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

const logout = (req, res) => {
    res.sendStatus(204);
};

module.exports = { login, register, logout };
