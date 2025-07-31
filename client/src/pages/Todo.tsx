import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { type TodoType } from "../types/Todo";
import { useParams, useNavigate, NavLink } from "react-router";
import { FiSave, FiArrowLeft } from "react-icons/fi";
import { showSuccessToast, showErrorToast } from "../utils/toast";

function Todo() {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const isEditing = Boolean(id);
    const [form, setForm] = useState<TodoType>({
        title: "",
        description: "",
    });

    const { data, isFetching } = useQuery({
        queryKey: ["todo", id],
        queryFn: async () => {
            const token = localStorage.getItem("token");
            return await axios.get(`http://localhost:3000/todos/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        },
        enabled: isEditing,
        staleTime: Infinity,
    });

    useEffect(() => {
        if (data && data.data && data.data.todo) {
            setForm({
                title: data.data.todo.title || "",
                description: data.data.todo.description || "",
            });
        }
    }, [data]);

    const mutation = useMutation({
        mutationFn: (formData: typeof form) => {
            const token = localStorage.getItem("token");

            if (!isEditing) {
                return axios.post("http://localhost:3000/todos", formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } else {
                return axios.patch(
                    `http://localhost:3000/todos/${id}`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
            if (!isEditing) {
                showSuccessToast("Todo created successfully!");
            } else {
                showSuccessToast("Todo updated successfully!");
            }
            navigate("/");
        },
        onError: () => {
            showErrorToast(`Error ${isEditing ? "updating" : "creating"} todo`);
        },
    });

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate(form);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50 flex items-center justify-center p-4">
            <div className="w-full max-w-xl">
                <NavLink
                    to="/"
                    className="flex items-center gap-2 mb-6 text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
                >
                    <FiArrowLeft /> Back to todos
                </NavLink>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-indigo-100"
                >
                    <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600 mb-6">
                        {isEditing ? "Edit Todo" : "Create New Todo"}
                    </h1>

                    {isFetching && (
                        <div className="flex justify-center p-8">
                            <div className="w-10 h-10 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin"></div>
                        </div>
                    )}

                    {(!isEditing || !isFetching) && (
                        <>
                            <div className="mb-6">
                                <label className="block mb-2 font-medium text-indigo-800">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    placeholder="What needs to be done?"
                                    className="w-full p-3 rounded-lg border border-indigo-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition"
                                    required
                                />
                            </div>

                            <div className="mb-8">
                                <label className="block mb-2 font-medium text-indigo-800">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="Add details about this task..."
                                    className="w-full p-3 rounded-lg border border-indigo-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition min-h-[120px]"
                                ></textarea>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    disabled={mutation.isPending}
                                    className="flex items-center justify-center gap-2 flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-lg shadow-md hover:shadow-lg disabled:opacity-70 transition-all transform hover:-translate-y-1"
                                >
                                    <FiSave />
                                    {mutation.isPending
                                        ? isEditing
                                            ? "Updating..."
                                            : "Creating..."
                                        : isEditing
                                        ? "Save Changes"
                                        : "Create Todo"}
                                </button>

                                <NavLink
                                    to="/"
                                    className="flex items-center justify-center px-6 py-3 border border-indigo-300 text-indigo-700 rounded-lg hover:bg-indigo-50 transition"
                                >
                                    Cancel
                                </NavLink>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Todo;
