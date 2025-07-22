import express from "express";
import { Song } from "../models/Song.js";
import { ISong, CreateSongRequest, UpdateSongRequest } from "../types/types.js";

const router = express.Router();

// GET /api/songs - Get all songs with optional filtering
router.get("/", async (req, res) => {
    try {
        const { artist, album, genre, year } = req.query;
        const filters: Partial<ISong> = {};

        // Add filters from query parameters if they exist
        if (artist) filters.artist = artist as string;
        if (album) filters.album = album as string;
        if (genre) filters.genre = genre as string;
        if (year) filters.year = parseInt(year as string, 10);

        const songs = await Song.findAll(filters);
        res.json(songs);
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
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const song = await Song.findById(id);

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
router.post(
    "/",
    async (req: express.Request<{}, {}, CreateSongRequest>, res) => {
        try {
            const songData: CreateSongRequest = req.body;

            // Basic validation
            if (!songData.title || !songData.artist || !songData.album) {
                return res.status(400).json({
                    success: false,
                    message: "Title, artist, and album are required fields",
                });
            }

            const newSong = await Song.create(songData);
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
    }
);

// PUT /api/songs/:id - Update a song
router.put(
    "/:id",
    async (
        req: express.Request<{ id: string }, {}, UpdateSongRequest>,
        res
    ) => {
        try {
            const { id } = req.params;
            const updateData = req.body;

            const song = await Song.findById(id);
            if (!song) {
                return res.status(404).json({
                    success: false,
                    message: "Song not found",
                });
            }

            const updatedSong = await song.update(updateData);
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
    }
);

// DELETE /api/songs/:id - Delete a song
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const song = await Song.findById(id);

        if (!song) {
            return res.status(404).json({
                success: false,
                message: "Song not found",
            });
        }

        await song.delete();
        res.status(204).send();
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
