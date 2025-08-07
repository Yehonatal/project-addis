import { call, fork, put, takeLatest } from "redux-saga/effects";
import {
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
} from "../slices/authSlice";

import {
    addNotification,
    removeNotification,
    clearNotifications,
} from "../slices/uiSlice";
import {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken as apiRefreshAccessToken,
} from "@/services/authAPI";
import { setStoredAccessToken } from "@/libs/AuthToken";

function* handleRegister(
    action: ReturnType<typeof registerRequest>
): Generator<any, void, any> {
    try {
        const response = yield call(() => registerUser(action.payload));
        const { accessToken } = response;
        const user = response.user?.user ?? response.user;

        yield put(registerSuccess({ user, accessToken }));
        setStoredAccessToken(accessToken);
        yield put(
            addNotification({
                type: "success",
                message: "Registration successful!",
            })
        );
    } catch (error: any) {
        yield put(registerFailure(error.message));
        yield put(
            addNotification({
                type: "error",
                message: "Registration failed. Please try again.",
            })
        );
    }
}

function* handleLogin(
    action: ReturnType<typeof loginRequest>
): Generator<any, void, any> {
    try {
        const response = yield call(() => loginUser(action.payload));
        const { user, accessToken } = response;
        setStoredAccessToken(accessToken);

        yield put(
            loginSuccess({
                user: user,
                accessToken: accessToken,
            })
        );
        yield put(
            addNotification({
                type: "success",
                message: "Login successful!",
            })
        );
    } catch (error: any) {
        yield put(loginFailure(error.message));
        yield put(
            addNotification({
                type: "error",
                message: "Login failed. Please try again.",
            })
        );
    }
}

function* handleLogout(action: ReturnType<typeof logoutRequest>) {
    try {
        yield call(() => logoutUser());
        yield put(logoutSuccess());
        yield put(
            addNotification({
                type: "success",
                message: "Logout successful!",
            })
        );
    } catch (error: any) {
        yield put(logoutFailure(error.message));
        yield put(
            addNotification({
                type: "error",
                message: "Logout failed. Please try again.",
            })
        );
    }
}

function* refreshToken(): Generator<any, void, any> {
    try {
        const response = yield call(apiRefreshAccessToken);
        const { accessToken, user } = response.data;

        // Hydrate store with new session
        yield put(hydrateFromRefresh({ accessToken, user }));
    } catch (error: any) {
        yield put(refreshTokenFailure(error.message));
    }
}

const authSaga = function* () {
    yield takeLatest(registerRequest.type, handleRegister);
    yield takeLatest(loginRequest.type, handleLogin);
    yield takeLatest(logoutRequest.type, handleLogout);
    yield takeLatest(refreshTokenRequest.type, refreshToken);
};

export default authSaga;
