const db = require("../configs/db");

const createTodo = async ({ userId, title, description }) => {
    try {
        const result = await db.query(
            `
            INSERT INTO todos (user_id, title, description) VALUES (?, ?, ?)
            `,
            [userId, title, description]
        );
        return result;
    } catch (error) {
        console.error("Error creating todo:", error);
        throw error;
    }
};

const getTodos = async (id) => {
    try {
        const [result] = await db.query(
            `SELECT * FROM todos WHERE user_id = ?`,
            [id]
        );
        return result;
    } catch (error) {
        console.error("Error fetching todos:", error);
        throw error;
    }
};

const getTodoById = async (id) => {
    try {
        const [result] = await db.query(
            `
            SELECT * FROM todos WHERE id = ?
            `,
            [id]
        );
        return result[0];
    } catch (error) {
        console.error("Error fetching todo by ID:", error);
        throw error;
    }
};

const updateTodo = async (id, { title, description }) => {
    try {
        const [result] = await db.query(
            `
            UPDATE todos
            SET title = ?, description = ?
            WHERE id = ?
        `,
            [title, description, id]
        );

        return result;
    } catch (error) {
        console.error("Error updating todo:", error);
        throw error;
    }
};

const deleteTodo = async (id) => {
    try {
        const [result] = await db.query(
            `
            DELETE FROM todos WHERE id = ?
        `,
            [id]
        );
        return result;
    } catch (error) {
        console.error("Error deleting todo:", error);
        throw error;
    }
};

module.exports = { createTodo, getTodos, getTodoById, updateTodo, deleteTodo };
