import { query } from "../db.js";
import dotenv from "dotenv";
import path from "path";

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

async function verifySeed() {
    try {
        console.log("Verifying database seed...");
        
        // Count total songs
        const result = await query("SELECT COUNT(*) as count FROM songs");
        const count = parseInt(result.rows[0].count, 10);
        
        console.log(`✅ Found ${count} songs in the database`);
        
        // Show a few sample songs
        const sampleSongs = await query("SELECT title, artist FROM songs LIMIT 5");
        console.log("\nSample songs in database:");
        sampleSongs.rows.forEach((song, index) => {
            console.log(`${index + 1}. ${song.artist} - ${song.title}`);
        });
        
        process.exit(0);
    } catch (error) {
        console.error("Error verifying seed:", error);
        process.exit(1);
    }
}

// Run the verification if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    verifySeed();
}
