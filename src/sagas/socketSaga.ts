import { EventChannel } from 'redux-saga';
import { all, call, put, take, takeLatest } from 'redux-saga/effects';

import {
  connectToSocket,
  connectToSocketFailed,
  postTweet,
  SocketEvent,
} from '../store/socketSlice';
import { createSocket } from '../services/socket/createSocket';
import { subscribe } from '../services/socket/subscriber';

/**
 * Pushes inbound server events (tweetsReceived / connectToSocketFailed) into the store.
 */
function* watchInbound(socket: SocketIOClient.Socket) {
  const channel = (yield call(subscribe, socket)) as EventChannel<SocketEvent>;
  try {
    while (true) {
      const event = (yield take(channel)) as SocketEvent;
      yield put(event);
    }
  } finally {
    channel.close(); // remove the socket listeners when cancelled
  }
}

/**
 * Forwards each postTweet to the socket server.
 */
function* watchOutbound(socket: SocketIOClient.Socket) {
  while (true) {
    const action = (yield take(postTweet.type)) as ReturnType<typeof postTweet>;
    socket.emit('postTweet', action.payload);
  }
}

/**
 * Connects, then runs the in/outbound loops until this task is cancelled.
 * takeLatest cancels it when a new connectToSocket arrives, which cancels the loops and disconnects the old socket — no manual bookkeeping needed.
 *
 * @param socketHandler the socket factory to connect with
 */
function* handleConnect(socketHandler: typeof createSocket) {
  let socket: SocketIOClient.Socket;
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    socket = (yield call(socketHandler, `${process.env.DOMAIN!}`)) as SocketIOClient.Socket;
  } catch (e: unknown) {
    yield put(connectToSocketFailed());
    return;
  }

  socket.emit('initSocketState');
  try {
    // call (not fork) so this blocks here; cancelling the task cancels both loops
    yield all([call(watchInbound, socket), call(watchOutbound, socket)]);
  } finally {
    socket.disconnect();
  }
}

/**
 * Tells the user when the socket connection cannot be set up.
 */
function* alertConnectFailed() {
  yield call([window, 'alert'], 'Cannot connect to the live map. Reload the page.');
}

/**
 * Root socket saga.
 */
export default function* socketSaga() {
  yield all([
    takeLatest(connectToSocket.type, handleConnect, createSocket),
    takeLatest(connectToSocketFailed.type, alertConnectFailed),
  ]);
}
