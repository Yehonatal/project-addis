import api from "@/libs/axios";
import { ISong } from "@/types/song";

// Songs API functions
export const fetchSongs = async () => {
    const response = await api.get("/songs");
    return response;
};

export const createSong = async (songData: ISong) => {
    const response = await api.post("/songs", songData);
    return response;
};

export const deleteSong = async (_id: string) => {
    const response = await api.delete(`/songs/${_id}`);
    return response;
};

export const updateSong = async (_id: string, songData: ISong) => {
    const response = await api.put(`/songs/${_id}`, songData);
    return response;
};
// Health Check
export const healthCheck = async () => {
    const response = await api.get("/health");
    return response;
};
