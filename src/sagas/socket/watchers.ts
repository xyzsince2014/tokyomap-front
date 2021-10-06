import {fork, take, call, takeLatest} from 'redux-saga/effects';
import {
  createSocketConnection,
  initSocketState,
  updateSocketState,
  dispatchActionFromChannel,
  runGetGeolocation,
} from './tasks';
import {ConnectSocketType, GetGeolocationType} from '../../actions/socket/socketActionType';

export function* watchSocket() {
  while (true) {
    yield take(ConnectSocketType.CONNECT_SOCKET_BEGIN);
    const socket: SocketIOClient.Socket = yield call(createSocketConnection);
    yield fork(initSocketState, socket);
    yield fork(updateSocketState, socket);
    yield fork(dispatchActionFromChannel, socket);
  }
}

export function* watchGeolocation() {
  yield takeLatest(GetGeolocationType.GET_GEOLOCATION_BEGIN, runGetGeolocation);
}
