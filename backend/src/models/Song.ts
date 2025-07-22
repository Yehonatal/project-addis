import { ISong, CreateSongRequest, UpdateSongRequest } from "../types/types.js";
import { query } from "../db.js";

export class Song implements ISong {
    id: string;
    title: string;
    artist: string;
    album: string;
    year: number;
    genre: string;
    duration: string;
    createdAt: string;
    updatedAt: string;

    constructor(song: ISong) {
        this.id = song.id;
        this.title = song.title;
        this.artist = song.artist;
        this.album = song.album;
        this.year = song.year;
        this.genre = song.genre;
        this.duration = song.duration;
        this.createdAt = song.createdAt;
        this.updatedAt = song.updatedAt;
    }

    // Create a new song in the database
    static async create(songData: CreateSongRequest): Promise<Song> {
        const result = await query(
            `INSERT INTO songs (title, artist, album, year, genre, duration)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
            [
                songData.title,
                songData.artist,
                songData.album,
                songData.year,
                songData.genre,
                songData.duration,
            ]
        );

        return new Song(result.rows[0]);
    }

    // Find a song by ID
    static async findById(id: string): Promise<Song | null> {
        const result = await query("SELECT * FROM songs WHERE id = $1", [id]);
        return result.rows.length ? new Song(result.rows[0]) : null;
    }

    // Find all songs with optional filtering
    static async findAll(filters: Partial<ISong> = {}): Promise<Song[]> {
        let queryText = "SELECT * FROM songs";
        const queryValues: any[] = [];
        const conditions: string[] = [];

        // Add filters if provided
        Object.entries(filters).forEach(([key, value], index) => {
            if (value !== undefined) {
                conditions.push(`${key} = $${index + 1}`);
                queryValues.push(value);
            }
        });

        if (conditions.length > 0) {
            queryText += " WHERE " + conditions.join(" AND ");
        }

        queryText += " ORDER BY created_at DESC";

        const result = await query(queryText, queryValues);
        return result.rows.map((row) => new Song(row));
    }

    // Update a song
    async update(updateData: UpdateSongRequest): Promise<Song> {
        const updates: string[] = [];
        const values: any[] = [];
        let paramIndex = 1;

        // Build the SET clause dynamically based on provided fields
        Object.entries(updateData).forEach(([key, value]) => {
            if (value !== undefined) {
                updates.push(`${key} = $${paramIndex++}`);
                values.push(value);
            }
        });

        if (updates.length === 0) {
            return this; // No updates to make
        }

        // Add the ID to the values array for the WHERE clause
        values.push(this.id);

        const result = await query(
            `UPDATE songs 
             SET ${updates.join(", ")}
             WHERE id = $${paramIndex}
             RETURNING *`,
            values
        );

        // Update the current instance with the new values
        Object.assign(this, result.rows[0]);
        return this;
    }

    // Delete a song
    async delete(): Promise<void> {
        await query("DELETE FROM songs WHERE id = $1", [this.id]);
    }

    // Static method to delete a song by ID
    static async deleteById(id: string): Promise<void> {
        await query("DELETE FROM songs WHERE id = $1", [id]);
    }
}

export default Song;
