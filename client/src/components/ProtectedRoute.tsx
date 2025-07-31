import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export const AuthRoute = () => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};
