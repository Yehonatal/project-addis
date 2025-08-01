import { ISong } from "@app-types/song";
import { createSlice } from "@reduxjs/toolkit";

type SongsState = {
    allSongs: ISong[];
    songs: ISong[];
    currentSong: ISong | null;
    isLoading: boolean;
    error: string | null;
    searchQuery: string;
    sortBy: keyof ISong;
    sortOrder: "asc" | "desc";
    pagination: {
        currentPage: number;
        totalPages: number;
        itemsPerPage: number;
        totalItems: number;
    };
};

const applyClientSideOperations = (state: SongsState) => {
    let filteredSongs = [...state.allSongs];

    // Apply search filter
    if (state.searchQuery && state.searchQuery.trim()) {
        const searchLower = state.searchQuery.toLowerCase().trim();
        filteredSongs = filteredSongs.filter(
            song =>
                song.title.toLowerCase().includes(searchLower) ||
                song.artist.toLowerCase().includes(searchLower) ||
                song.album.toLowerCase().includes(searchLower) ||
                song.genre.toLowerCase().includes(searchLower) ||
                song.year.toString().includes(searchLower)
        );
    }

    // Apply sorting
    filteredSongs.sort((a, b) => {
        let aValue = a[state.sortBy];
        let bValue = b[state.sortBy];

        // Handle different data types
        if (typeof aValue === "string") {
            aValue = aValue.toLowerCase();
            bValue = typeof bValue === "string" ? bValue.toLowerCase() : bValue;
        }

        // Handle undefined values
        if (aValue === undefined && bValue === undefined) return 0;
        if (aValue === undefined) return 1;
        if (bValue === undefined) return -1;

        if (state.sortOrder === "asc") {
            return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
            return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
    });

    // Update pagination info
    const totalItems = filteredSongs.length;
    const totalPages = Math.ceil(totalItems / state.pagination.itemsPerPage);

    // Ensure current page is valid
    const currentPage = Math.min(
        state.pagination.currentPage,
        Math.max(1, totalPages)
    );

    // Apply pagination
    const startIndex = (currentPage - 1) * state.pagination.itemsPerPage;
    const endIndex = startIndex + state.pagination.itemsPerPage;
    const paginatedSongs = filteredSongs.slice(startIndex, endIndex);

    // Update state
    state.songs = paginatedSongs;
    state.pagination = {
        ...state.pagination,
        currentPage,
        totalPages,
        totalItems,
    };
};

const initialState = {
    allSongs: [] as ISong[],
    songs: [] as ISong[],
    currentSong: null,
    isLoading: false,
    error: null,
    searchQuery: "",
    sortBy: "title" as keyof ISong, // Default sort by title
    sortOrder: "asc" as "asc" | "desc", // Default sort order ascending
    isInitialLoad: true, // Flag to track if this is the first load
    pagination: {
        currentPage: 1,
        totalPages: 1,
        itemsPerPage: 9, // Show 9 items per page
        totalItems: 0,
    },
};

const songsSlice = createSlice({
    name: "songs",
    initialState,
    reducers: {
        // Fetch songs action
        fetchSongsRequest: state => {
            state.isLoading = true;
            state.error = null;
        },
        fetchSongsSuccess: (state, action) => {
            state.isLoading = false;
            // Store all songs from API
            state.allSongs = action.payload;
            state.error = null;
            state.isInitialLoad = false; // Mark that initial load is complete

            // Apply client-side filtering, sorting, and pagination
            applyClientSideOperations(state);
        },
        fetchSongsFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // Create song action
        createSongRequest: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        createSongSuccess: (state, action) => {
            state.isLoading = false;
            state.allSongs.unshift(action.payload);

            // Reapply current filters and pagination
            applyClientSideOperations(state);
            state.error = null;
        },
        createSongFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        // Update song action
        updateSongRequest: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        updateSongSuccess: (state, action) => {
            state.isLoading = false;
            const index = state.allSongs.findIndex(
                song => song._id === action.payload._id
            );
            if (index !== -1) {
                state.allSongs[index] = action.payload;
            }

            // Reapply filters and pagination
            applyClientSideOperations(state);
            state.error = null;
        },
        updateSongFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // Delete song action
        deleteSongRequest: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        deleteSongSuccess: (state, action) => {
            state.isLoading = false;
            state.allSongs = state.allSongs.filter(
                song => song._id !== action.payload._id
            );

            // Reapply filters and pagination
            applyClientSideOperations(state);
            state.error = null;
        },
        deleteSongFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // UI state actions
        setCurrentSong: (state, action) => {
            state.currentSong = action.payload;
        },
        clearCurrentSong: state => {
            state.currentSong = null;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
            state.pagination.currentPage = 1; // Reset to first page when searching
            applyClientSideOperations(state);
        },

        // Sort actions (sortBy and sortOrder)
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
            applyClientSideOperations(state);
        },

        setSortOrder: (state, action) => {
            state.sortOrder = action.payload;
            applyClientSideOperations(state);
        },

        // Set current page action
        setCurrentPage: (state, action) => {
            state.pagination.currentPage = action.payload;
            applyClientSideOperations(state);
        },
        clearError: state => {
            state.error = null;
        },
    },
});

export const {
    fetchSongsRequest,
    fetchSongsSuccess,
    fetchSongsFailure,
    createSongRequest,
    createSongSuccess,
    createSongFailure,
    updateSongRequest,
    updateSongSuccess,
    updateSongFailure,
    deleteSongRequest,
    deleteSongSuccess,
    deleteSongFailure,
    setCurrentSong,
    clearCurrentSong,
    setSearchQuery,
    setSortBy,
    setSortOrder,
    setCurrentPage,
    clearError,
} = songsSlice.actions;
export default songsSlice.reducer;
