import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import songsRoutes from "./routes/songs.js";
import { testConnection } from "./db.js";
import { runMigrations } from "./utils/migrate.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Load environment variables from .env file
import "dotenv/config";

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
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test database connection and run migrations on startup
async function initializeServer() {
    try {
        // Run database migrations and test connection
        await runMigrations();
        const isConnected = await testConnection();
        if (!isConnected) {
            console.error("Failed to connect to the database. Server may not function correctly.");
            process.exit(1);
        }

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error during server initialization:", error);
        process.exit(1); // Exit if we can't connect to the database
    }
}

// Initialize server and test DB connection
initializeServer();

// Routes
app.use("/api/songs", songsRoutes);

// Enhanced health check endpoint
app.get("/api/health", async (req, res) => {
    try {
        const dbStatus = await testConnection();

        res.json({
            status: "OK",
            message: "Song Management API is running",
            timestamp: new Date().toISOString(),
            database: {
                status: dbStatus ? "connected" : "disconnected",
                type: "Neon PostgreSQL",
            },
            deployment: {
                platform: process.env.VERCEL ? "Vercel" : "Render",
                environment: process.env.NODE_ENV || "production",
                version: "1.0.0",
            },
        });
    } catch (error) {
        console.error("Health check failed:", error);
        res.status(500).json({
            status: "ERROR",
            message: "Health check failed",
            error:
                process.env.NODE_ENV === "development"
                    ? (error as Error).message
                    : undefined,
        });
    }
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
            error: "Something went wrong!",
            message:
                process.env.NODE_ENV === "development"
                    ? err.message
                    : undefined,
        });
    }
);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: "Not Found" });
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: Error) => {
    console.error("Unhandled Rejection:", err);
    process.exit(1);
});

export default app;
