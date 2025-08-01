import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        console.log("Connecting to MongoDB...");
        const conn = await mongoose.connect(
            process.env.MONGODB_URI as string,
            {}
        );
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {}
};

export default connectDB;
