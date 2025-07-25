# Project Addis : A song management application for Addis software plc (Internship)

This is a full-stack song management application built for Addis software plc as a test project. The application allows users to manage songs, including adding, editing, and deleting them. It also provides a search functionality to find specific songs.

## Deployed
- Frontend: https://project-addis.vercel.app

Render's Free tier for web services will automatically spin down after 15 minutes of inactivity, then it stops consuming instance hours once spun down. So, when a new request arrives, Render spins the service back up, which can take up to about a minute, resulting in a delayed (cold‑start) response I can't do anything about it, you just have to reload it and wait (I promise it works).

- Backend: https://project-addis.onrender.com

### UI
![Light Theme](frontend/public/preview/homepage-light.png)

## Preface 
I didn't have any experience with both tools (I have used redux before but only in a tutorial never used it after) This was a really good exp in challenging myself to pick up new tools in a very limited time. The following repo's are what I built to learn how to make the project for the test, I used youtube videos, GPT(and Gemini when gpt didn't cut it), and their respective documentations 
- [Learning Redux toolkit and saga](https://github.com/Yehonatal/learn-redux-toolkit-and-saga)
- [Learning Webpack](https://github.com/Yehonatal/learn-webpack)


## Webpack config explanation and my reasoning    
- [Webpack config explanation](frontend/webpack-doc.md) : Its in frontend/webpack-doc.md

## API Documentation
- [API Documentation](backend/README.md) : Its in backend/README.md

## AI Tools and Other assistance used disclaimer
- Large amount of the AI assistant I used is "inline code completion" which I honestly really like since its cuts down actual coding time by a lot (when it works)    
- I used chatGpt, Gemini and inline copilot for reading the documentation when am learning something new or when I need reminding of something I don't remember how to implement directly but remember how it should work which is a great help as well specially when I have to build something using tech I haven't used that much before.
- I used copilot and chatGpt for various bug detection and possible solutions, "I always try to ask these tools various solution for bugs am finding hard to fix and I look through and chose the right one, seems to work best for most cases"
- I have used it to do mundane task in various points, Generating dummy songs data, generating theme colors, copying UI styles in various components after I have made the general style and feel I want from the app.    
- I have used it to apply styling across styling files ex. "Make the fonts in these files (link the files) 10% larger"... stuff like that
- I have used it to generate API documentation and API routes and I have read through it (I have used it to generate content on this page as well)

## Tech Stack as Per Requirement

### Frontend
- **React** (Functional components with hooks)
- **Redux Toolkit** + **Redux-Saga** (State management and side effects)
- **Emotion/Styled System** (CSS-in-JS and theming)
- **Custom Webpack Configuration** (Manual setup without Create React App)

### Backend
- **Node.js** + **Express** (no database, in-memory data)
- **RESTful API** with proper error handling
- **CORS**, logging via **Morgan**, and structured route separation

## Features to be Included (For now)
- [x] **Custom** Webpack setup
- [x] React app with **Redux Toolkit + Saga**
- [x] Dummy **song data** (80 items)
- [x] **Design** using Emotion's styled components
- [x] **CRUD operations** (Create, Read, Update, Delete)
- [x] **Paginated song listing** with 9 songs per page
- [x] **Search functionality** with debounced input
- [x] **Loading states** and error handling
- [x] **Toast notifications** for user feedback
- [x] **Modal dialogs** for forms and confirmations
- [x] **Form validation** with real-time feedback


## Quick Start

1. **Install dependencies for both frontend and backend:**
   ```bash
   npm run install:all
   ```

2. **Start both frontend and backend in development mode:**
   ```bash
   npm run dev
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Available Scripts

### Root-Level
| Command                | Description                          |
|------------------------|--------------------------------------|
| `npm run install:all`  | Installs both frontend and backend   |
| `npm run dev`          | Starts both frontend and backend     |
| `npm run build`        | Builds frontend for production       |
| `npm start`            | Starts backend in production mode    |

### Frontend (`cd frontend`)
| Command         | Description                     |
|-----------------|---------------------------------|
| `npm run dev`   | Starts React dev server         |
| `npm run build` | Builds frontend for production  |

### Backend (`cd backend`)
| Command         | Description                     |
|-----------------|---------------------------------|
| `npm run dev`   | Starts backend with nodemon     |
| `npm start`     | Starts backend in production    |


## Architecture

### Frontend Architecture
- **React 18** with functional components and hooks
- **Redux Toolkit** for state management
- **Redux-Saga** for handling side effects and API calls
- **Emotion** for CSS-in-JS styling with a comprehensive theme system
- **Custom Webpack** configuration for build optimization
- **Responsive design** that works on desktop and mobile devices

### Backend Architecture
- **Node.js** with **Express.js** framework
- **In-memory data storage** with dummy data (40 songs)
- **RESTful API** design with proper HTTP status codes
- **CORS** enabled for cross-origin requests
- **Request validation** and error handling
- **Structured logging** with Morgan

### Project Structure
```
song-management-app/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── store/          # Redux store, slices, and sagas
│   │   ├── services/       # API service layer
│   │   ├── styles/         # Theme and global styles
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   ├── webpack.config.js   # Custom Webpack configuration
│   └── package.json
├── backend/                 # Node.js backend
│   ├── routes/             # API route handlers
│   ├── data/               # Data models and dummy data
│   ├── server.js           # Express server setup
│   └── package.json
├── package.json            # Root package.json with scripts
└── README.md              
```

### Available Scripts (I may change these)

#### Root Level
- `pnpm run dev` - Start both frontend and backend
- `pnpm run install:all` - Install dependencies for both projects
- `pnpm run build` - Build frontend for production
- `pnpm start` - Start backend in production mode

#### Backend (`cd backend`)
- `pnpm run dev` - Start with nodemon (auto-restart)
- `pnpm start` - Start in production mode

#### Frontend (`cd frontend`)
- `pnpm run dev` - Start development server with hot reload
- `pnpm run build` - Build for production

