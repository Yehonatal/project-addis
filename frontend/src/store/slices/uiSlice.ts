import { createSlice } from "@reduxjs/toolkit";
import { Notification } from "@app-types/types";

const initialState = {
    isCreateModalOpen: false,
    isEditModalOpen: false,
    isDeleteModalOpen: false,
    notification: [] as Notification[],
    theme: "light", // Default theme
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        // Modal actions
        openCreateModal: state => {
            state.isCreateModalOpen = true;
        },
        closeCreateModal: state => {
            state.isCreateModalOpen = false;
        },
        openEditModal: state => {
            state.isEditModalOpen = true;
        },
        closeEditModal: state => {
            state.isEditModalOpen = false;
        },
        openDeleteModal: state => {
            state.isDeleteModalOpen = true;
        },
        closeDeleteModal: state => {
            state.isDeleteModalOpen = false;
        },

        // Notification actions
        addNotification: (state, action) => {
            const notification: Notification = {
                id: Date.now(),
                type: action.payload.type,
                message: action.payload.message,
                duration: action.payload.duration || 3000, // Default duration 3 seconds
            };
            state.notification.push(notification);
        },

        removeNotification: (state, action) => {
            state.notification = state.notification.filter(
                notification => notification.id !== action.payload.id
            );
        },

        clearNotifications: state => {
            state.notification = [];
        },

        // Theme actions
        setTheme: (state, action) => {
            state.theme = action.payload;
        },
        toggleTheme: state => {
            state.theme = state.theme === "light" ? "dark" : "light";
        },
    },
});

export const {
    openCreateModal,
    closeCreateModal,
    openEditModal,
    closeEditModal,
    openDeleteModal,
    closeDeleteModal,
    addNotification,
    removeNotification,
    clearNotifications,
    setTheme,
    toggleTheme,
} = uiSlice.actions;
export default uiSlice.reducer; // What I'll use in the store
