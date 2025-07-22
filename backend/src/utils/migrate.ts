import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { pool } from "../db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function runMigrations() {
    const client = await pool.connect();

    try {
        // Create migrations table if it doesn't exist
        await client.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        run_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

        // Get all migration files
        const migrationsDir = path.join(__dirname, "../../migrations");
        const migrationFiles = fs
            .readdirSync(migrationsDir)
            .filter((file) => file.endsWith(".sql"))
            .sort();

        // Run each migration that hasn't been run yet
        for (const file of migrationFiles) {
            const result = await client.query(
                "SELECT id FROM migrations WHERE name = $1",
                [file]
            );

            if (result.rows.length === 0) {
                // Running migration
                const migrationSQL = fs.readFileSync(
                    path.join(migrationsDir, file),
                    "utf8"
                );

                // Run the migration in a transaction
                await client.query("BEGIN");
                try {
                    await client.query(migrationSQL);
                    await client.query(
                        "INSERT INTO migrations (name) VALUES ($1)",
                        [file]
                    );
                    await client.query("COMMIT");
                    // Migration applied successfully
                } catch (error) {
                    await client.query("ROLLBACK");
                    console.error(`Error applying migration ${file}:`, error);
                    throw error;
                }
            }
        }
    } finally {
        client.release();
    }
}

// Run migrations if this file is executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    runMigrations()
        .then(() => {
            console.log("Migrations completed successfully");
            process.exit(0);
        })
        .catch((error) => {
            console.error("Migrations failed:", error);
            process.exit(1);
        });
}
