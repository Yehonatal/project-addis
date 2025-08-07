import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
    id: string;
    name: string;
    email: string;
};

interface AuthState {
    user: User | null;
    accessToken: string | null;
    isLoading: boolean;
    error: string | null;
    isLoggedIn: boolean;
}

const initialState: AuthState = {
    user: null,
    accessToken: null,
    isLoading: false,
    error: null,
    isLoggedIn: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Registration
        registerRequest: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        registerSuccess: (state, action) => {
            const { user, accessToken } = action.payload;
            state.isLoading = false;
            state.user = user;
            state.accessToken = accessToken;
            state.isLoggedIn = true;
        },
        registerFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // Login
        loginRequest: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            const { user, accessToken } = action.payload;
            state.isLoading = false;
            state.user = user;
            state.accessToken = accessToken;
            state.isLoggedIn = true;
        },
        loginFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // Logout
        logoutRequest: state => {
            state.isLoading = true;
            state.error = null;
        },
        logoutSuccess: state => {
            state.isLoading = false;
            state.user = null;
            state.accessToken = null;
            state.isLoggedIn = false;
        },
        logoutFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // Refresh Token
        refreshTokenRequest: state => {
            state.isLoading = true;
            state.error = null;
        },
        refreshTokenSuccess: (
            state,
            action: PayloadAction<{ accessToken: string }>
        ) => {
            state.isLoading = false;
            state.accessToken = action.payload.accessToken;
        },
        refreshTokenFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        hydrateFromRefresh: (
            state,
            action: PayloadAction<{ user: User; accessToken: string }>
        ) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.isLoggedIn = true;
            state.isLoading = false;
            state.error = null;
        },
    },
});

export const {
    registerRequest,
    registerSuccess,
    registerFailure,
    loginRequest,
    loginSuccess,
    loginFailure,
    logoutRequest,
    logoutSuccess,
    logoutFailure,
    refreshTokenRequest,
    refreshTokenSuccess,
    refreshTokenFailure,
    hydrateFromRefresh,
} = authSlice.actions;

export default authSlice.reducer;
