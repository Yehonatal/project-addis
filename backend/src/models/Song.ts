import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        artist: {
            type: String,
            required: true,
        },
        album: {
            type: String,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
        genre: {
            type: String,
            required: true,
        },
        duration: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Song", songSchema);
