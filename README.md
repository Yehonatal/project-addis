# Project Addis : A song management application for Addis software plc (Internship)

This is a full-stack song management application built for Addis software plc as a test project. The application allows users to manage songs, including adding, editing, and deleting them. It also provides a search functionality to find specific songs.

## Tech Stack as Per Requirement

### Frontend
- **React** (Functional components with hooks)
- **Redux Toolkit** + **Redux-Saga** (State management and side effects)
- **Emotion/Styled System** (CSS-in-JS and theming)
- **Custom Webpack Configuration** (Manual setup without Create React App)

### Backend
- **Node.js** + **Express** (REST API server)
- **In-memory data storage** (Dummy song data)

## Features to be Included (For now)

- [ ] **CRUD operations** (Create, Read, Update, Delete)
- [ ] **Paginated song listing** with 9 songs per page
- [ ] **Search functionality** with debounced input
- [ ] **Responsive design** using Emotion's styled components
- [ ] **Loading states** and error handling
- [ ] **Toast notifications** for user feedback
- [ ] **Modal dialogs** for forms and confirmations
- [ ] **Form validation** with real-time feedback
- [ ] **Custom Webpack configuration** (no Create React App)

## Project Structure

``` bash
song-management-app/
├── frontend/           # React frontend application
├── backend/            # Node.js/Express backend API
├── package.json        # Root package.json with scripts
└── README.md          
```

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

## Development

### Backend Development
```bash
cd backend
npm run dev
```

### Frontend Development
```bash
cd frontend
npm run dev
```

### Building for Production
```bash
npm run build
```

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
- `npm run dev` - Start both frontend and backend
- `npm run install:all` - Install dependencies for both projects
- `npm run build` - Build frontend for production
- `npm start` - Start backend in production mode

#### Backend (`cd backend`)
- `npm run dev` - Start with nodemon (auto-restart)
- `npm start` - Start in production mode

#### Frontend (`cd frontend`)
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
