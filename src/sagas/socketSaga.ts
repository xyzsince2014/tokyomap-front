import {EventChannel} from 'redux-saga';
import {all, call, fork, put, take} from 'redux-saga/effects';

import {ConnectToSocketType, PostTweetType} from '../actions/socket/socketActionType';
import {
  PostTweetAction,
  SocketAction,
  connectToSocket,
} from '../actions/socket/socketActionCreators';
import {createSocketFactory} from '../services/socket/createSocketFactory';
import {subscribe} from '../services/socket/subscriber';

const createSocket = createSocketFactory(`${process.env.DOMAIN_WEB!}`);

/**
 * initialise the socket state
 * @param socket
 */
export function* initSocketState(socket: SocketIOClient.Socket) {
  yield socket.emit('initSocketState');
}

/**
 * handle errors on socket connection
 */
export function* rejectConnectToSocket() {
  yield put(connectToSocket.reject());
}

/**
 * add a tweet, and syncronise the socket state
 * @param socket
 */
export function* updateSocketState(socket: SocketIOClient.Socket) {
  while (true) {
    const action = (yield take(PostTweetType.POST_TWEET_BEGIN)) as PostTweetAction;
    yield socket.emit('postTweet', action.payload);
  }
}

/**
 * subscribe the socketChannel
 * @param socket
 */
export function* subscribeChannel(socket: SocketIOClient.Socket) {
  const eventChannel = (yield call(subscribe, socket)) as EventChannel<SocketAction>;
  while (true) {
    const action = (yield take(eventChannel)) as SocketAction;
    yield put(action);
  }
}

export function* watchSocket(socketHandler: typeof createSocket) {
  while (true) {
    yield take(ConnectToSocketType.CONNECT_TO_SOCKET_BEGIN);
    try {
      const socket = (yield call(socketHandler)) as SocketIOClient.Socket;
      yield* [
        fork(initSocketState, socket),
        fork(subscribeChannel, socket),
        fork(updateSocketState, socket),
      ];
    } catch (e: unknown) {
      fork(rejectConnectToSocket);
    }
  }
}

export default function* socketSaga() {
  yield fork(watchSocket, createSocket);
}
