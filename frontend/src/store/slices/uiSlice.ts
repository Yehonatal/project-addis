import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isCreateModalOpen: false,
    isEditModalOpen: false,
    isDeleteModalOpen: false,
    notification: [],
    theme: "light", // Default theme
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        // TODO : Modal actions
        // TODO: Notification actions
    },
});

export const {} = uiSlice.actions;
export default uiSlice.reducer; // What I'll use in the store
