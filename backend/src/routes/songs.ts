import express from "express";
// import { songs, Song } from "../data/songs";
import { ISong, CreateSongRequest, UpdateSongRequest } from "../types/types";
import mongoose from "mongoose";
import Song from "../models/Song";

const router = express.Router();

// let songsDatabase: ISong[] = [...songs];

const getAllSongs = async () => {
    return await Song.find();
};

// GET /api/songs - Get all songs
router.get("/", async (_req, res) => {
    try {
        const songs = await getAllSongs();
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
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid song ID format",
            });
        }
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
router.post("/", async (req, res) => {
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
        await newSong.save();

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
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid song ID format",
            });
        }

        const updateData: UpdateSongRequest = req.body;

        await Song.findByIdAndUpdate(id, updateData, { new: true });

        res.json({
            success: true,
            message: "Song updated successfully",
        });
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
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid song ID format",
            });
        }

        const deletedSong = await Song.findByIdAndDelete(id);

        if (!deletedSong) {
            return res.status(404).json({
                success: false,
                message: "Song not found",
            });
        }

        res.json({
            success: true,
            message: "Song deleted successfully",
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
