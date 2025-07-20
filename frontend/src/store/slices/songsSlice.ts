import { ISong } from "@app-types/song";
import { createSlice } from "@reduxjs/toolkit";

// TODO: Helper function to handler filter ang pagination
const filterAndPaginateSongs = (
    allSongs: ISong[],
    searchQuery: string,
    currentPage: number,
    itemsPerPage: number,
    sortBy: keyof ISong,
    sortOrder: "asc" | "desc"
) => {
    // TODO: Filter songs based on search query
    // TODO: Sort songs based on sortBy and sortOrder
    // TODO: Paginate songs based on currentPage and itemsPerPage
};

const initialState = {
    allSongs: [],
    songs: [],
    currentSong: null,
    isLoading: false,
    error: null,
    searchQuery: "",
    sortBy: "title", // Default sort by title
    sortOrder: "asc", // Default sort order ascending
    pagination: {
        currentPage: 1,
        totalPages: 1,
        itemsPerPage: 9,
        totalItems: 0,
    },
};

const songsSlice = createSlice({
    name: "songs",
    initialState,
    reducers: {
        // TODO: Fetch songs action
        // TODO: Create song action
        // TODO: Update song action
        // TODO: Delete song action
        // TODO: UI state actions
        // TODO: Set current song action
        // TODO: Set search query action
        // TODO: Set sort by action
        // TODO: Set current page action
        clearError: state => {
            state.error = null;
        },
    },
});

export const {} = songsSlice.actions;
export default songsSlice.reducer;
