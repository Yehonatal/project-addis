import axios from "axios";
import { ISong } from "@/types/song";

// Fetch songs API - Fetches all the songs
const api = axios.create({
    baseURL: "https://project-addis.onrender.com/api",
    timeout: 10000,
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

// Songs API functions
export const fetchSongs = async () => {
    const response = await api.get("/songs");
    return response;
};

export const createSong = async (songData: ISong) => {
    const response = await api.post("/songs", songData);
    return response;
};

export const updateSong = async (id: string, songData: ISong) => {
    const response = await api.put(`/songs/${id}`, songData);
    return response;
};
export const deleteSong = async (id: string) => {
    const response = await api.delete(`/songs/${id}`);
    return response;
};

export const searchSongs = async (query: string) => {
    const response = await api.get(`/songs/search`, {
        params: { q: query },
    });
    return response;
};

// Health Check
export const healthCheck = async () => {
    const response = await api.get("/health");
    return response;
};

export default api;
