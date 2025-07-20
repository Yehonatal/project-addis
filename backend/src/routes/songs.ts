import express from "express";
import { songs, Song } from "../data/songs";
import { ISong, CreateSongRequest, UpdateSongRequest } from "../types/types";

const router = express.Router();

let songsDatabase: ISong[] = [...songs];

const getAllSongs = () => {
    return songsDatabase;
};

// GET /api/songs - Get all songs
router.get("/", (_req, res) => {
    try {
        res.json(getAllSongs());
    } catch (error) {
        console.error("Error fetching songs:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch songs",
            error:
                process.env.NODE_ENV === "development"
                    ? (error as Error).message
                    : undefined,
        });
    }
});

// GET /api/songs/:id - Get a specific song by ID
router.get("/:id", (req, res) => {
    try {
        const { id } = req.params;
        const song = songsDatabase.find((s) => s.id === id);

        if (!song) {
            return res.status(404).json({
                success: false,
                message: "Song not found",
            });
        }

        res.json(song);
    } catch (error) {
        console.error("Error fetching song:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch song",
            error:
                process.env.NODE_ENV === "development"
                    ? (error as Error).message
                    : undefined,
        });
    }
});

// POST /api/songs - Create a new song
router.post("/", (req, res) => {
    try {
        const songData: CreateSongRequest = req.body;

        const requiredFields = [
            "title",
            "artist",
            "album",
            "year",
            "genre",
            "duration",
        ];
        const missingFields = requiredFields.filter(
            (field) => !songData[field as keyof CreateSongRequest]
        );

        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Missing required fields: ${missingFields.join(", ")}`,
            });
        }

        // Create new song
        const newSong = new Song(songData);
        songsDatabase.unshift(newSong);

        res.status(201).json(newSong);
    } catch (error) {
        console.error("Error creating song:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create song",
            error:
                process.env.NODE_ENV === "development"
                    ? (error as Error).message
                    : undefined,
        });
    }
});

// PUT /api/songs/:id - Update a song
router.put("/:id", (req, res) => {
    try {
        const { id } = req.params;
        const updateData: UpdateSongRequest = req.body;

        const songIndex = songsDatabase.findIndex((s) => s.id === id);

        if (songIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Song not found",
            });
        }

        const updatedSong = {
            ...songsDatabase[songIndex],
            ...updateData,
            updatedAt: new Date().toISOString(),
        };

        songsDatabase[songIndex] = updatedSong;

        res.json(updatedSong);
    } catch (error) {
        console.error("Error updating song:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update song",
            error:
                process.env.NODE_ENV === "development"
                    ? (error as Error).message
                    : undefined,
        });
    }
});

// DELETE /api/songs/:id - Delete a song
router.delete("/:id", (req, res) => {
    try {
        const { id } = req.params;
        const songIndex = songsDatabase.findIndex((s) => s.id === id);

        if (songIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Song not found",
            });
        }

        const deletedSong = songsDatabase[songIndex];
        songsDatabase.splice(songIndex, 1);

        res.json({
            success: true,
            message: "Song deleted successfully",
            data: deletedSong,
        });
    } catch (error) {
        console.error("Error deleting song:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete song",
            error:
                process.env.NODE_ENV === "development"
                    ? (error as Error).message
                    : undefined,
        });
    }
});

export default router;
