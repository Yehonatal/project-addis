import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDb from "./config/db";
import songsRoutes from "./routes/songs";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 5000;

app.set("trust proxy", 1);
const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:5000",
    "https://project-addis.vercel.app",
    "https://project-addis.onrender.com",
];

// Basic middleware
app.use(helmet());
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Connect to MongoDB
connectDb();

// Routes
app.use("/api/songs", songsRoutes);
app.use("/api/auth", authRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
    res.json({
        status: "OK",
        message: "Song Management API is running",
        timestamp: new Date().toISOString(),
        deployment: {
            platform: "Render",
            environment: process.env.NODE_ENV || "production",
            version: "1.0.0",
        },
    });
});

// 404 handler
app.all("*", (req, res) => {
    res.status(404).json({
        error: "Not Found",
        message: `Route ${req.originalUrl} not found`,
    });
});

// Error handling middleware
app.use(
    (
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        console.error(err.stack);
        res.status(500).json({
            error: "Internal Server Error",
            message: "Something went wrong!",
        });
    }
);

// Start server
app.listen(PORT, () => {
    console.log(`🎵 Song Management API server is running on port ${PORT}`);
    console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🎶 Songs API: http://localhost:${PORT}/api/songs`);
    console.log(`🔒 Auth API: http://localhost:${PORT}/api/auth`);
});

export default app;
