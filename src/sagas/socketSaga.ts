import { EventChannel, Task } from 'redux-saga';
import { all, call, cancel, fork, put, take } from 'redux-saga/effects';

import { ConnectToSocketType, PostTweetType } from '../actions/socket/socketActionType';
import {
  PostTweetAction,
  SocketAction,
  connectToSocket,
} from '../actions/socket/socketActionCreators';
import { createSocket } from '../services/socket/createSocket';
import { subscribe } from '../services/socket/subscriber';

/**
 * Initialise the socket state.
 *
 * @param socket
 */
export function* initSocketState(socket: SocketIOClient.Socket) {
  yield socket.emit('initSocketState');
}

/**
 * Handles errors on socket connection.
 */
export function* rejectConnectToSocket() {
  yield put(connectToSocket.reject());
}

/**
 * Adds a tweet, and syncronises the socket state.
 *
 * @param socket
 */
export function* updateSocketState(socket: SocketIOClient.Socket) {
  while (true) {
    const action = (yield take(PostTweetType.POST_TWEET_BEGIN)) as PostTweetAction;
    yield socket.emit('postTweet', action.payload);
  }
}

/**
 * Subscribes to the socketChannel.
 *
 * @param socket
 */
export function* subscribeChannel(socket: SocketIOClient.Socket) {
  const eventChannel = (yield call(subscribe, socket)) as EventChannel<SocketAction>;
  while (true) {
    const action = (yield take(eventChannel)) as SocketAction;
    yield put(action);
  }
}

/**
 * Watches for connectToSocket.begin.
 * On each one, connects the socket, then forks the three long-running workers which keep it in sync: initialise the state, subscribe to inbound events, and push outbound tweets.
 * A connection failure dispatches connectToSocket.reject.
 *
 * @param socketHandler the socket factory to connect with (injectable for tests)
 */
export function* watchSocket(socketHandler: typeof createSocket) {
  let workers: Task[] = [];
  let currentSocket: SocketIOClient.Socket | null = null;

  while (true) {
    yield take(ConnectToSocketType.CONNECT_TO_SOCKET_BEGIN);

    // tear down any previous connection before opening a new one,
    // so sockets and their listeners do not stack up across reconnects
    if (workers.length > 0) {
      yield all(workers.map(worker => cancel(worker)));
      workers = [];
    }
    if (currentSocket) {
      currentSocket.disconnect();
      currentSocket = null;
    }

    try {
      currentSocket = (yield call(socketHandler, `${process.env.DOMAIN!}`)) as SocketIOClient.Socket;
      // fork is non-blocking, so all() returns immediately with the three worker tasks
      workers = (yield all([
        fork(initSocketState, currentSocket),
        fork(subscribeChannel, currentSocket),
        fork(updateSocketState, currentSocket),
      ])) as Task[];

    } catch (e: unknown) {
      yield fork(rejectConnectToSocket);
    }
  }
}

/**
 * Root socket saga: starts the watcher with the real socket factory.
 */
export default function* socketSaga() {
  yield fork(watchSocket, createSocket);
}
