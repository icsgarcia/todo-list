const express = require("express");
const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/TodoRoutes");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
