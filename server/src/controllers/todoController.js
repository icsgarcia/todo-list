const db = require("../configs/db");

const addTodo = async (req, res) => {
    const { title, description } = req.body;
    const { id } = req.user;
    try {
        console.log(req.user);
        await db.query(
            `
            INSERT INTO todos (user_id, title, description) VALUES (?, ?, ?)
            `,
            [id, title, description]
        );
        res.status(201).json({ message: "Todo created successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error creating todo" });
    }
};

const fetchTodos = async (req, res) => {
    const { id } = req.user;
    try {
        const [todos] = await db.query(
            `SELECT * FROM todos WHERE user_id = ?`,
            [id]
        );
        res.status(200).json({
            message: "Todos fetched successfully",
            todos: todos,
        });
    } catch (error) {
        res.status(500).json({ error: "Error fetching todos" });
    }
};

const fetchTodoById = async (req, res) => {
    const { id } = req.params;
    try {
        const [todo] = await db.query(
            `
            SELECT * FROM todos WHERE id = ?
            `,
            [id]
        );
        res.status(200).json({
            message: "Todo fetched successfully",
            todo: todo[0],
        });
    } catch (error) {
        res.status(500).json({ error: "Error fetching todo" });
    }
};

const modifyTodo = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        await db.query(
            `
            UPDATE todos
            SET title = ?, description = ?
            WHERE id = ?
        `,
            [title, description, id]
        );
        res.status(200).json({ message: "Todo updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error updating todo" });
    }
};

const removeTodo = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query(
            `
            DELETE FROM todos WHERE id = ?
        `,
            [id]
        );
        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting todo" });
    }
};

module.exports = { addTodo, fetchTodos, fetchTodoById, modifyTodo, removeTodo };
