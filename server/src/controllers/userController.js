const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const db = require("../configs/db");
const { generateAccessToken } = require("../middlewares/authMiddleware");

dotenv.config();

let refreshTokens = [];

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [user] = await db.query(`SELECT * FROM users WHERE email = ?`, [
            email,
        ]);
        const isMatch = await bcrypt.compare(password, user[0].password);
        if (isMatch) {
            const accessToken = generateAccessToken(user[0]);
            const refreshToken = jwt.sign(
                user[0],
                process.env.REFRESH_TOKEN_SECRET
            );
            refreshTokens.push(refreshToken);
            return res.status(200).json({
                message: "Login successful",
                user,
                accessToken,
                refreshToken,
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

const getRefreshToken = (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.sendStatus(401);
    if (!refreshTokens.includes(refreshToken)) {
        return res.sendStatus(403);
    }
    jwt.sign(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = generateAccessToken({
            name: user.name,
            email: user.email,
        });
        res.json({ accessToken });
    });
};

const logout = (req, res) => {
    refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
    res.sendStatus(204);
};

module.exports = { login, register, getRefreshToken, logout };
