import {fork, take, call, takeLatest} from 'redux-saga/effects';
import {
  createSocketConnection,
  initSocketState,
  updateSocketState,
  dispatchActionFromChannel,
  runGetGeolocation,
} from './tasks';
import * as ActionType from '../../actions/Socket/socketConstants';

export function* watchSocket() {
  while (true) {
    yield take(ActionType.CONNECT_SOCKET_BEGIN);
    const socket: SocketIOClient.Socket = yield call(createSocketConnection);
    yield fork(initSocketState, socket);
    yield fork(updateSocketState, socket);
    yield fork(dispatchActionFromChannel, socket);
  }
}

export function* watchGeolocation() {
  yield takeLatest(ActionType.GET_GEOLOCATION_BEGIN, runGetGeolocation);
}
