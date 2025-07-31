import { toast, type ToastOptions } from "react-toastify";

// Shared toast configuration for consistency
const toastConfig: ToastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
};

// Helper functions with consistent styling
export const showSuccessToast = (message: string) => {
    toast.success(message, {
        ...toastConfig,
        className: "bg-indigo-50 border-l-4 border-indigo-500",
    });
};

export const showErrorToast = (message: string) => {
    toast.error(message, {
        ...toastConfig,
        autoClose: 5000,
        className: "bg-red-50 border-l-4 border-red-500",
    });
};

export const showInfoToast = (message: string) => {
    toast.info(message, {
        ...toastConfig,
        className: "bg-blue-50 border-l-4 border-blue-500",
    });
};

export const showWarningToast = (message: string) => {
    toast.warning(message, {
        ...toastConfig,
        className: "bg-amber-50 border-l-4 border-amber-500",
    });
};
