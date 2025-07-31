import { NavLink, Link, useNavigate } from "react-router";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { type TodoType } from "./types/Todo";
import { useState, type MouseEvent } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiLogOut } from "react-icons/fi";
import { useAuth } from "./contexts/AuthContext";
import { showSuccessToast, showErrorToast } from "./utils/toast";

function App() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
    const [deleteId, setDeleteId] = useState<number>();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["todos"],
        queryFn: async () => {
            const token = localStorage.getItem("token");
            return await axios.get(
                `${import.meta.env.VITE_APP_API_URL}/todos`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        },
    });

    const mutation = useMutation({
        mutationFn: (id: number) => {
            const token = localStorage.getItem("token");
            return axios.delete(
                `${import.meta.env.VITE_APP_API_URL}/todos/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
            showSuccessToast("Todo deleted successfully!");
        },
        onError: () => {
            showErrorToast("Failed to delete todo");
        },
    });

    const deleteTodo = () => {
        if (!deleteId) return;
        mutation.mutate(deleteId);
        setOpenDeleteModal(false);
    };

    const handleLogout = () => {
        logout();
        showSuccessToast("Logged out successfully!");
        navigate("/login");
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50 flex justify-center p-4">
            {openDeleteModal && (
                <div
                    onClick={() => setOpenDeleteModal(false)}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
                >
                    <div
                        onClick={(e: MouseEvent<HTMLDivElement>) =>
                            e.stopPropagation()
                        }
                        className="relative bg-white w-full max-w-sm p-6 rounded-xl shadow-2xl transform transition-all"
                    >
                        <h3 className="text-xl font-bold text-indigo-600 mb-4">
                            Confirm Deletion
                        </h3>
                        <p className="mb-6 text-slate-700">
                            Are you sure you want to delete this todo?
                        </p>
                        <div className="flex gap-4 justify-end">
                            <button
                                onClick={() => setOpenDeleteModal(false)}
                                className="px-4 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={deleteTodo}
                                className="px-4 py-2 rounded-md bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 shadow-md hover:shadow-lg transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="p-6 w-full max-w-2xl">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600">
                            My Todos
                        </h1>
                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 border border-indigo-500 text-indigo-600 rounded-md hover:bg-indigo-50 transition"
                        >
                            <FiLogOut /> Logout
                        </button>
                    </div>
                    {/* Add Todo Button */}
                    <NavLink
                        to="/create-todo"
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-md shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 w-full justify-center"
                    >
                        <FiPlus /> Add New Todo
                    </NavLink>
                </div>

                {/* Todo List */}
                <div className="space-y-4">
                    {isLoading && (
                        <div className="flex justify-center p-8">
                            <div className="w-12 h-12 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin"></div>
                        </div>
                    )}

                    {isError && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                            <p className="text-red-600">
                                Oops! We couldn't load your todos. Please try
                                again.
                            </p>
                        </div>
                    )}

                    {!isLoading &&
                        !isError &&
                        data?.data.todos?.length === 0 && (
                            <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm border border-indigo-100">
                                <div className="text-5xl mb-4">✨</div>
                                <h3 className="text-xl font-bold text-indigo-600 mb-2">
                                    No Todos Yet!
                                </h3>
                                <p className="text-slate-600 mb-4">
                                    Create your first todo to get started on
                                    your productivity journey.
                                </p>
                                <NavLink
                                    to={"/create-todo"}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-md shadow-md hover:shadow-lg transition-all"
                                >
                                    <FiPlus /> Create First Todo
                                </NavLink>
                            </div>
                        )}

                    <ul className="space-y-4">
                        {data?.data.todos?.map((todo: TodoType) => (
                            <li
                                key={todo.id}
                                className="transform transition-all hover:-translate-y-1"
                            >
                                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md border-l-4 border-indigo-500 hover:shadow-lg transition p-5">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg text-indigo-800 mb-1">
                                                {todo.title}
                                            </h3>
                                            <p className="text-slate-600">
                                                {todo.description ||
                                                    "No description provided"}
                                            </p>
                                        </div>
                                        <div className="flex gap-2 ml-4">
                                            <Link
                                                to={`/update-todo/${todo.id}`}
                                                className="flex items-center justify-center h-9 w-9 rounded-md bg-amber-100 text-amber-600 hover:bg-amber-200 transition-colors"
                                            >
                                                <FiEdit2 />
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    setDeleteId(todo.id);
                                                    setOpenDeleteModal(true);
                                                }}
                                                className="flex items-center justify-center h-9 w-9 rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default App;
