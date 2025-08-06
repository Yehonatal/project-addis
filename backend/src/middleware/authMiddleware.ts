import { jwtVerify } from "jose";
import dotenv from "dotenv";
import User from "../models/User";
import JWT_SECRET from "../utils/getJwtSecret";

dotenv.config();

export const protect = async (req: any, res: any, next: any) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, no token provided",
            });
        }
        const token = authHeader.split(" ")[1];
        const { payload } = await jwtVerify(token, JWT_SECRET);

        const user = (await User.findById(payload.userId).select(
            "_id username email"
        )) as { _id: string; username: string; email: string } | null;
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, user not found",
            });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401);
        next(new Error("Not authorized, token failed"));
    }
};
