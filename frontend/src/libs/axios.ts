import axios from "axios";
import { getStoredAccessToken, setStoredAccessToken } from "./AuthToken";
import { refreshAccessToken } from "@/services/authAPI";

// Get API URL from environment variables with type safety
declare const process: {
    env: {
        REACT_APP_API_URL?: string;
    };
};

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// Basic error handling
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 500) {
            console.error("Server error:", error.response.data);
        }
        return Promise.reject(error);
    }
);

api.interceptors.request.use(config => {
    const token = getStoredAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    res => res,
    async error => {
        const originalRequest = error.config;
        const isAuthCall = originalRequest.url.includes("/auth/");

        if (
            error.response.status === 401 &&
            !originalRequest._retry &&
            !isAuthCall
        ) {
            originalRequest._retry = true;

            try {
                const response = await refreshAccessToken();
                const { accessToken: newAccessToken } = response.data;
                setStoredAccessToken(newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (error) {
                console.error("Failed to refresh token", error);
            }
        }
    }
);

export default api;
