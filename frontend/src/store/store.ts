import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import rootSaga from "./sagas/rootSaga";
import songsReducer from "./slices/songsSlice";
import uiReducer from "./slices/uiSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        songs: songsReducer,
        ui: uiReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            thunk: false,
            // serializableCheck: { // not gonna use redux persist for now
            //     ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            // },
        }).concat(sagaMiddleware),
});

// Run the saga middleware
sagaMiddleware.run(rootSaga);
export type RootState = ReturnType<typeof store.getState>;
