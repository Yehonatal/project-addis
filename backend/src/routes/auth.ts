import express from "express";
import User from "../models/User";
import { generateToken } from "../utils/generateToken";

import { jwtVerify } from "jose";
import JWT_SECRET from "../utils/getJwtSecret";

const router = express.Router();

/**
 * @route           POST /api/auth/register
 * @description     Register a new user
 * @access          Public
 * Validates the request body for required fields (name, email, password).
 * Creates a new user and returns the created user object.
 * Returns an error if validation fails or user creation fails.
 */
router.post("/register", async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: username, email, password",
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ username }, { email }],
        });

        const newUser = await User.create({
            username: username.trim().toLowerCase().replace(/\s+/g, ""),
            email: email.trim().toLowerCase(),
            password: password.trim(),
        });

        // Create Tokens
        const payload = { userId: newUser._id, username: newUser.username };
        const accessToken = await generateToken(payload, "15m");
        const refreshToken = await generateToken(payload, "7d");

        // Set refresh token in cookies
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
            accessToken,
        });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({
            success: false,
            message: "Failed to register user",
            error:
                process.env.NODE_ENV === "development"
                    ? (error as Error).message
                    : undefined,
        });
    }
});

/**
 * @route           GET /api/auth/login
 * @description     Login a user
 * @access          Public
 * Validates the request body for required fields (email, password).
 * Authenticates the user and returns a success message.
 * Returns an error if validation fails or authentication fails.
 */
router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: email, password",
            });
        }

        // Find user by email
        const user = await User.findOne({ email: email.trim().toLowerCase() });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Check Password
        const isPswMatch = await user.matchPassword(password);
        if (!isPswMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({
            success: false,
            message: "Failed to log in user",
            error:
                process.env.NODE_ENV === "development"
                    ? (error as Error).message
                    : undefined,
        });
    }
});

/**
 * @route           POST /api/auth/logout
 * @description     Logout user and clear session
 * @access          Private
 * Logs out the user by clearing the session or token.
 * Returns a success message.
 */
router.post("/logout", async (req, res, next) => {
    try {
        // Clear the refresh token cookie
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
        });

        res.status(200).json({
            success: true,
            message: "User logged out successfully",
        });
    } catch (error) {
        console.error("Error logging out user:", error);
        res.status(500).json({
            success: false,
            message: "Failed to log out user",
            error:
                process.env.NODE_ENV === "development"
                    ? (error as Error).message
                    : undefined,
        });
    }
});

/**
 * @route           POST /api/auth/refresh
 * @description     Generate new access token using refresh token
 * @access          Public
 * Validates the refresh token and generates a new access token.
 */
router.post("/refresh", async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;
        console.log("Refreshing token...");
        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "No refresh token provided",
            });
        }

        // Verify the refresh token
        const { payload } = await jwtVerify(refreshToken, JWT_SECRET);
        if (!payload || !payload.userId) {
            return res.status(401).json({
                success: false,
                message: "Invalid refresh token",
            });
        }

        const user = await User.findById(payload.userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Generate a new access token
        const newAccessToken = await generateToken(
            { userId: user._id, username: user.username },
            "15m"
        );

        res.status(200).json({
            success: true,
            message: "Access token refreshed successfully",
            accessToken: newAccessToken,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Error refreshing token:", error);
        res.status(500).json({
            success: false,
            message: "Failed to refresh token",
            error:
                process.env.NODE_ENV === "development"
                    ? (error as Error).message
                    : undefined,
        });
    }
});

export default router;
