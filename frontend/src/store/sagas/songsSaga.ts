import {
    call,
    put,
    takeEvery,
    takeLatest,
    delay,
    select,
} from "redux-saga/effects";
import {
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
    setCurrentPage,
} from "@store/slices/songsSlice";
import {
    addNotification,
    closeCreateModal,
    closeEditModal,
} from "@/store/slices/uiSlice";
import * as songsAPI from "@services/songsAPI";
import { SagaIterator } from "redux-saga";
import { AxiosResponse } from "axios";
import { ISong } from "@app-types/song";

function* fetchSongsSaga(): SagaIterator {
    try {
        const state = yield select((state: any) => state.songs);

        const response: AxiosResponse<ISong[]> = yield call(
            songsAPI.fetchSongs
        );
        yield put(fetchSongsSuccess(response.data));

        if (state.isInitialLoad && response.data.length > 0) {
            yield delay(1500);
            yield put(
                addNotification({
                    type: "info",
                    message: `${response.data.length} songs loaded successfully`,
                    duration: 4000,
                })
            );
        }
    } catch (error: unknown) {
        let errorMessage = "Failed to fetch songs";
        if (
            typeof error === "object" &&
            error !== null &&
            "response" in error &&
            typeof (error as any).response?.data?.message === "string"
        ) {
            errorMessage = (error as any).response.data.message;
        }

        yield put(fetchSongsFailure(errorMessage));
        yield delay(50);
        yield put(
            addNotification({
                type: "error",
                message: errorMessage,
            })
        );
    }
}

function* createSongSaga(
    action: ReturnType<typeof createSongRequest>
): SagaIterator {
    try {
        const response = yield call(songsAPI.createSong, action.payload);
        yield put(createSongSuccess(response.data));
        yield put(closeCreateModal());
        yield delay(50);
        console.log("🔔 Dispatching create song notification...");
        yield put(
            addNotification({
                type: "success",
                message: "Song created successfully",
                duration: 3000,
            })
        );
    } catch (error) {
        const errorMessage =
            (error as any)?.response?.data?.message || "Failed to create song";
        yield put(createSongFailure(errorMessage));
        yield delay(50);
        yield put(
            addNotification({
                type: "error",
                message: errorMessage,
            })
        );
    }
}

function* updateSongSaga(
    actions: ReturnType<typeof updateSongRequest>
): SagaIterator {
    try {
        const response = yield call(
            songsAPI.updateSong,
            actions.payload.id,
            actions.payload.songData
        );
        yield put(updateSongSuccess(response.data));
        yield put(closeEditModal());
        yield delay(50);
        yield put(
            addNotification({
                type: "success",
                message: "Song updated successfully",
                duration: 3000,
            })
        );
    } catch (error) {
        const errorMessage =
            (error as any)?.response?.data?.message || "Failed to update song";
        yield put(updateSongFailure(errorMessage));
        yield delay(50);
        yield put(
            addNotification({
                type: "error",
                message: errorMessage,
            })
        );
    }
}

function* deleteSongSaga(
    action: ReturnType<typeof deleteSongRequest>
): SagaIterator {
    try {
        const response = yield call(songsAPI.deleteSong, action.payload);
        yield put(deleteSongSuccess(response.data));
        yield put(setCurrentPage(1));
        yield delay(50);
        yield put(
            addNotification({
                type: "success",
                message: "Song deleted successfully",
                duration: 3000,
            })
        );
    } catch (error) {
        const errorMessage =
            (error as any)?.response?.data?.message || "Failed to delete song";
        yield put(deleteSongFailure(errorMessage));
        yield delay(50);
        yield put(
            addNotification({
                type: "error",
                message: errorMessage,
            })
        );
    }
}

export default function* songsSaga() {
    yield takeLatest(fetchSongsRequest.type, fetchSongsSaga); // am using takeLatest to run the latest one
    yield takeEvery(createSongRequest.type, createSongSaga);
    yield takeEvery(updateSongRequest.type, updateSongSaga);
    yield takeEvery(deleteSongRequest.type, deleteSongSaga);
}

// takeLatest : when the latest result is what matter s
// takeEvery : when all results matter and they all need to go through
