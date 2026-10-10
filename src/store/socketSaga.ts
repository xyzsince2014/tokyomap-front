import { EventChannel } from 'redux-saga';
import { all, call, put, take, takeLatest } from 'redux-saga/effects';

import { AppSocket, SOCKET_EVENTS } from '../services/socket/socketEvents';
import {
  connectToSocket,
  connectToSocketFailed,
  postTweet,
  SocketEvent,
} from './socketSlice';
import { createSocket } from '../services/socket/createSocket';
import { subscribe } from '../services/socket/subscriber';

/**
 * Root socket saga.
 */
export default function* socketSaga() {
  // all([...]) runs both watchers concurrently and keeps this root saga alive
  yield all([
    // on every connectToSocket action, (re)run handleConnect with createSocket passed as handleConnect's argument
    takeLatest(connectToSocket.type, handleConnect, createSocket),
    // on every connectToSocketFailed action, run alertConnectFailed to tell the user
    takeLatest(connectToSocketFailed.type, alertConnectFailed),
  ]);
}

/**
 * Connects, then runs the in/outbound loops until this task is cancelled.
 * takeLatest cancels it when a new connectToSocket arrives, which cancels the loops and disconnects the old socket.
 *
 * @param socketHandler the socket factory to connect with
 */
function* handleConnect(socketHandler: typeof createSocket) {
  let socket: AppSocket;

  try {
    socket = (yield call(socketHandler, `${process.env.DOMAIN!}`)) as AppSocket;
  } catch (e: unknown) {
    // dispatch connectToSocketFailed so the root saga alerts the user, then bail out (socket is unset)
    yield put(connectToSocketFailed());
    return;
  }

  socket.emit(SOCKET_EVENTS.INIT);

  try {
    // call (not fork) so this blocks here; cancelling the task cancels both loops
    yield all([call(watchInbound, socket), call(watchOutbound, socket)]);
  } finally {
    socket.disconnect();
  }
}

/**
 * Pushes inbound server events (tweetsReceived / connectToSocketFailed) into the store.
 */
function* watchInbound(socket: AppSocket) {
  // bridge the socket's inbound messages into a saga channel (each server event becomes one SocketEvent action)
  const channel = (yield call(subscribe, socket)) as EventChannel<SocketEvent>;
  try {
    while (true) {
      // block here until the channel emits the next event (tweetsReceived / connectToSocketFailed)
      const event = (yield take(channel)) as SocketEvent;
      // dispatch that event into the store
      yield put(event);
    }
  } finally {
    // runs when this task is cancelled (reconnect / disconnect): detach the socket listeners
    channel.close();
  }
}

/**
 * Forwards each postTweet to the socket server.
 */
function* watchOutbound(socket: AppSocket) {
  while (true) {
    // block here until the user dispatches postTweet, then take that (typed) action
    const action = (yield take(postTweet.type)) as ReturnType<typeof postTweet>;
    // forward its payload to the server over the socket
    socket.emit(SOCKET_EVENTS.POST, action.payload);
  }
}

/**
 * Tells the user when the socket connection cannot be set up.
 */
function* alertConnectFailed() {
  // call window.alert via the [context, 'method'] form so redux-saga can invoke/stub it (and avoids unbound-method)
  yield call([window, 'alert'], 'Cannot connect to the live map. Reload the page.');
}
