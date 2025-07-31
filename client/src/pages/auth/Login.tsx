import { useState, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, Link } from "react-router";
import { FiLogIn, FiUserPlus } from "react-icons/fi";
import { showSuccessToast, showErrorToast } from "../../utils/toast";

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const mutation = useMutation({
        mutationFn: (formData: typeof form) => {
            return axios.post(
                `${import.meta.env.VITE_APP_API_URL}/auth/login`,
                formData
            );
        },
        onSuccess: (response) => {
            login(response.data.accessToken);
            showSuccessToast("Login successful! Welcome back.");

            navigate("/");
        },
        onError: () => {
            showErrorToast(
                "Login failed. Please check your credentials and try again."
            );
        },
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const loginUser = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate(form);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <h1 className="text-4xl font-extrabold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">
                    Todo List
                </h1>
                <p className="text-slate-600 text-center mb-8">
                    Log in to manage your tasks
                </p>

                <form
                    onSubmit={loginUser}
                    className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-indigo-100"
                >
                    <h2 className="text-2xl font-bold text-indigo-800 mb-6">
                        Welcome Back!
                    </h2>

                    <div className="mb-5">
                        <label className="block mb-2 font-medium text-indigo-800">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="your@email.com"
                            className="w-full p-3 rounded-lg border border-indigo-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2 font-medium text-indigo-800">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full p-3 rounded-lg border border-indigo-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-3 rounded-lg shadow-md hover:shadow-lg disabled:opacity-70 transition-all transform hover:-translate-y-1 mb-5"
                    >
                        <FiLogIn />
                        {mutation.isPending ? "Logging in..." : "Log In"}
                    </button>

                    <div className="flex items-center my-5">
                        <div className="flex-1 border-t border-gray-300"></div>
                        <span className="px-3 text-gray-500 text-sm">or</span>
                        <div className="flex-1 border-t border-gray-300"></div>
                    </div>

                    <Link
                        to="/register"
                        className="flex items-center justify-center gap-2 w-full border border-indigo-500 text-indigo-600 p-3 rounded-lg hover:bg-indigo-50 transition"
                    >
                        <FiUserPlus />
                        Create an Account
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
