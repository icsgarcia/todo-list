import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { ProtectedRoute, AuthRoute } from "./components/ProtectedRoute.tsx";
import "./index.css";
import App from "./App.tsx";
import Login from "./pages/auth/Login.tsx";
import Register from "./pages/auth/Register.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Todo from "./pages/Todo.tsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route element={<AuthRoute />}>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Route>
                        <Route element={<ProtectedRoute />}>
                            <Route path="/" element={<App />} />
                            <Route path="/create-todo" element={<Todo />} />
                            <Route path="/update-todo/:id" element={<Todo />} />
                        </Route>
                    </Routes>
                    <ToastContainer
                        position="top-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                        toastClassName="backdrop-blur-sm bg-white/90 rounded-xl shadow-md border border-indigo-100"
                        progressClassName="bg-gradient-to-r from-indigo-500 to-pink-500"
                    />
                </AuthProvider>
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>
);
