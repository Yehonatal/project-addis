import { Pool } from "pg";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();



// Create a new pool of connections to the database
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

// Test the database connection
export async function testConnection() {
    try {
        const client = await pool.connect();
        // Connection successful
        client.release();
        return true;
    } catch (error) {
        console.error("Error connecting to Neon database:", error);
        return false;
    }
}

// Execute a query with parameters
export async function query(text: string, params?: any[]) {
    const start = Date.now();
    try {
        const res = await pool.query(text, params);
        const duration = Date.now() - start;
        // Query executed successfully
        return res;
    } catch (error) {
        console.error("Database query error:", error);
        throw error;
    }
}

// Export the pool for transactions or direct pool access
export { pool };

