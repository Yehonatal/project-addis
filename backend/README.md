# Project Addis Backend API

A RESTful API for managing songs built with Node.js, Express.js, and TypeScript. This backend provides CRUD operations for song management with in-memory data storage.


### Prerequisites
- Node.js (v16 or higher)
- pnpm (recommended) or npm

### Installation
```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Start production server
pnpm start
```

### Environment
- **Development**: http://localhost:5000
- **Production**: Deployed on Render

## API Documentation

### Base URL
- **Development**: `http://localhost:5000/api`
- **Production**: `https://your-app.onrender.com/api`

### Content Type
All requests and responses use `application/json` content type.

---

## Songs Endpoints

### 1. Get All Songs
Retrieve a list of all songs in the database.

**Endpoint:** `GET /api/songs`

**Response:**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Bohemian Rhapsody",
    "artist": "Queen",
    "album": "A Night at the Opera",
    "year": 1975,
    "genre": "Rock",
    "duration": "5:55",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

**Status Codes:**
- `200 OK` - Success
- `500 Internal Server Error` - Server error

---

### 2. Get Song by ID
Retrieve a specific song by its unique identifier.

**Endpoint:** `GET /api/songs/:id`

**Parameters:**
- `id` (string, required) - The unique identifier of the song

**Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Bohemian Rhapsody",
  "artist": "Queen",
  "album": "A Night at the Opera",
  "year": 1975,
  "genre": "Rock",
  "duration": "5:55",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Status Codes:**
- `200 OK` - Success
- `404 Not Found` - Song not found
- `500 Internal Server Error` - Server error

**Error Response (404):**
```json
{
  "success": false,
  "message": "Song not found"
}
```

---

### 3. Create New Song
Add a new song to the database.

**Endpoint:** `POST /api/songs`

**Request Body:**
```json
{
  "title": "Hotel California",
  "artist": "Eagles",
  "album": "Hotel California",
  "year": 1976,
  "genre": "Rock",
  "duration": "6:30"
}
```

**Required Fields:**
- `title` (string) - Song title
- `artist` (string) - Artist name
- `album` (string) - Album name
- `year` (number) - Release year
- `genre` (string) - Music genre
- `duration` (string) - Song duration in MM:SS format

**Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "title": "Hotel California",
  "artist": "Eagles",
  "album": "Hotel California",
  "year": 1976,
  "genre": "Rock",
  "duration": "6:30",
  "createdAt": "2024-01-15T10:35:00.000Z",
  "updatedAt": "2024-01-15T10:35:00.000Z"
}
```

**Status Codes:**
- `201 Created` - Song created successfully
- `400 Bad Request` - Missing required fields
- `500 Internal Server Error` - Server error

**Error Response (400):**
```json
{
  "success": false,
  "message": "Missing required fields: title, artist"
}
```

---

### 4. Update Song
Update an existing song's information.

**Endpoint:** `PUT /api/songs/:id`

**Parameters:**
- `id` (string, required) - The unique identifier of the song

**Request Body:**
```json
{
  "title": "Updated Song Title",
  "artist": "Updated Artist",
  "year": 2024
}
```

**Optional Fields:**
- `title` (string) - Song title
- `artist` (string) - Artist name
- `album` (string) - Album name
- `year` (number) - Release year
- `genre` (string) - Music genre
- `duration` (string) - Song duration

**Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Updated Song Title",
  "artist": "Updated Artist",
  "album": "A Night at the Opera",
  "year": 2024,
  "genre": "Rock",
  "duration": "5:55",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T11:00:00.000Z"
}
```

**Status Codes:**
- `200 OK` - Song updated successfully
- `404 Not Found` - Song not found
- `500 Internal Server Error` - Server error

---

### 5. Delete Song
Remove a song from the database.

**Endpoint:** `DELETE /api/songs/:id`

**Parameters:**
- `id` (string, required) - The unique identifier of the song

**Response:**
```json
{
  "success": true,
  "message": "Song deleted successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Bohemian Rhapsody",
    "artist": "Queen",
    "album": "A Night at the Opera",
    "year": 1975,
    "genre": "Rock",
    "duration": "5:55",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Status Codes:**
- `200 OK` - Song deleted successfully
- `404 Not Found` - Song not found
- `500 Internal Server Error` - Server error

---

## Health Check Endpoint

### Health Check
Check if the API server is running and healthy.

**Endpoint:** `GET /api/health`

**Response:**
```json
{
  "status": "OK",
  "message": "Song Management API is running",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "deployment": {
    "platform": "Render",
    "environment": "production",
    "version": "1.0.0"
  }
}
```

**Status Codes:**
- `200 OK` - Server is healthy

---

## Data Models

### Song Object
```typescript
interface ISong {
  id: string;           // UUID v4 generated automatically
  title: string;        // Song title
  artist: string;       // Artist name
  album: string;        // Album name
  year: number;         // Release year
  genre: string;        // Music genre
  duration: string;     // Duration in MM:SS format
  createdAt: string;    // ISO 8601 timestamp
  updatedAt: string;    // ISO 8601 timestamp
}
```

### Create Song Request
```typescript
interface CreateSongRequest {
  title: string;        // Required
  artist: string;       // Required
  album: string;        // Required
  year: number;         // Required
  genre: string;        // Required
  duration: string;     // Required (MM:SS format)
}
```

### Update Song Request
```typescript
interface UpdateSongRequest {
  title?: string;       // Optional
  artist?: string;      // Optional
  album?: string;       // Optional
  year?: number;        // Optional
  genre?: string;       // Optional
  duration?: string;    // Optional (MM:SS format)
}
```

---

## Error Handling

### Error Response Format
All error responses follow this structure:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error (development only)"
}
```

### Common Error Codes
- `400 Bad Request` - Invalid request data or missing required fields
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server-side error

### Development vs Production
- **Development**: Error responses include detailed error information
- **Production**: Error responses only include user-friendly messages

---

## 🔧 Technical Details

### Technology Stack
- **Runtime**: Node.js
- **Framework**: Express.js 4.21.2
- **Language**: TypeScript
- **Data Storage**: In-memory (no database)
- **Security**: Helmet.js for security headers
- **CORS**: Enabled for cross-origin requests
- **Logging**: Morgan for HTTP request logging

### Middleware
- **helmet**: Security headers
- **cors**: Cross-origin resource sharing
- **morgan**: HTTP request logging
- **express.json()**: JSON body parsing
- **express.urlencoded()**: URL-encoded body parsing

### Project Structure
```
backend/
├── src/
│   ├── data/
│   │   └── songs.ts          # Song data and Song class
│   ├── routes/
│   │   └── songs.ts          # Songs API routes
│   ├── types/
│   │   └── types.ts          # TypeScript interfaces
│   └── server.ts             # Express server setup
├── dist/                     # Compiled JavaScript (production)
├── package.json
├── tsconfig.json
└── README.md
```

---

## Deployment

### Build Commands
```bash
# Install dependencies
pnpm install

# Build TypeScript to JavaScript
pnpm run build

# Start production server
pnpm start
```

### Environment Variables
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)

---

## Example Usage

### Using cURL

**Get all songs:**
```bash
curl -X GET http://localhost:5000/api/songs
```

**Create a new song:**
```bash
curl -X POST http://localhost:5000/api/songs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Stairway to Heaven",
    "artist": "Led Zeppelin",
    "album": "Led Zeppelin IV",
    "year": 1971,
    "genre": "Rock",
    "duration": "8:02"
  }'
```

**Update a song:**
```bash
curl -X PUT http://localhost:5000/api/songs/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "year": 2024
  }'
```

**Delete a song:**
```bash
curl -X DELETE http://localhost:5000/api/songs/550e8400-e29b-41d4-a716-446655440000
```

### Using JavaScript/Axios

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Get all songs
const songs = await api.get('/songs');

// Create a song
const newSong = await api.post('/songs', {
  title: 'New Song',
  artist: 'Artist Name',
  album: 'Album Name',
  year: 2024,
  genre: 'Pop',
  duration: '3:30'
});

// Update a song
const updatedSong = await api.put('/songs/song-id', {
  title: 'Updated Title'
});

// Delete a song
await api.delete('/songs/song-id');
```

---

## 👨‍💻 Author

**Yonatan Afewerk**
Developed for Addis Software PLC (Internship Project)