const {
    createTodo,
    getTodoById,
    getTodos,
    updateTodo,
    deleteTodo,
} = require("../models/todoModel");

const addTodo = async (req, res) => {
    const { title, description } = req.body;
    const { id } = req.user;
    try {
        console.log(req.user);
        await createTodo({ userId: id, title, description });
        res.status(201).json({ message: "Todo created successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error creating todo" });
    }
};

const fetchTodos = async (req, res) => {
    const { id } = req.user;
    try {
        const todos = await getTodos(id);
        res.status(200).json({ message: "Todos fetched successfully", todos });
    } catch (error) {
        res.status(500).json({ error: "Error fetching todos" });
    }
};

const fetchTodoById = async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await getTodoById(id);
        res.status(200).json({ message: "Todo fetched successfully", todo });
    } catch (error) {
        res.status(500).json({ error: "Error fetching todo" });
    }
};

const modifyTodo = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        await updateTodo(id, { title, description });
        res.status(200).json({ message: "Todo updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error updating todo" });
    }
};

const removeTodo = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteTodo(id);
        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting todo" });
    }
};

module.exports = { addTodo, fetchTodos, fetchTodoById, modifyTodo, removeTodo };
