import {fork, take, call, takeLatest} from 'redux-saga/effects';
import {
  createSocketConnection,
  initSocketState,
  updateSocketState,
  dispatchActionFromChannel,
  runGetGeolocation,
} from './tasks';
import {connectToSocket} from '../../actions/Socket/socketActionCreator';
import * as ActionType from '../../actions/Socket/socketConstants';

export function* watchSocket() {
  while (true) {
    const action: ReturnType<typeof connectToSocket.begin> = yield take(
      ActionType.CONNECT_SOCKET_BEGIN,
    );
    const socket = yield call(createSocketConnection); // todo: try-catch?
    yield fork(initSocketState, socket, action.payload.userId);
    yield fork(updateSocketState, socket, action.payload.userId);
    yield fork(dispatchActionFromChannel, socket);
  }
}

export function* watchGeolocation() {
  yield takeLatest(ActionType.GET_GEOLOCATION_BEGIN, runGetGeolocation);
}
