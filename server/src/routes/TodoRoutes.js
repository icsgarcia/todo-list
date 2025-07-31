const express = require("express");
const router = express.Router();
const {
    addTodo,
    fetchTodos,
    fetchTodoById,
    modifyTodo,
    removeTodo,
} = require("../controllers/todoController");
const { authenticateToken } = require("../middlewares/authMiddleware");

router.get("/", authenticateToken, fetchTodos);
router.get("/:id", authenticateToken, fetchTodoById);
router.post("/", authenticateToken, addTodo);
router.patch("/:id", authenticateToken, modifyTodo);
router.delete("/:id", authenticateToken, removeTodo);

module.exports = router;
