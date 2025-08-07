import { all, fork } from "redux-saga/effects";
import songsSaga from "./songsSaga";
import authSaga from "./authSaga";

export default function* rootSaga() {
    yield all([fork(songsSaga), fork(authSaga)]);
}
