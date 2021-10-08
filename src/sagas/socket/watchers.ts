import {fork, take, call, takeLatest} from 'redux-saga/effects';
import {
  initSocketState,
  updateSocketState,
  dispatchActionFromChannel,
  runGetGeolocation,
} from './tasks';
import {ConnectToSocketType, GetGeolocationType} from '../../actions/socket/socketActionType';
import {createSocketConnection} from '../../services/socket/connector';

export function* watchSocket() {
  while (true) {
    yield take(ConnectToSocketType.CONNECT_TO_SOCKET_BEGIN);
    const socket: SocketIOClient.Socket = yield call(createSocketConnection);
    yield fork(initSocketState, socket);
    yield fork(updateSocketState, socket);
    yield fork(dispatchActionFromChannel, socket);
  }
}

export function* watchGeolocation() {
  yield takeLatest(GetGeolocationType.GET_GEOLOCATION_BEGIN, runGetGeolocation);
}
