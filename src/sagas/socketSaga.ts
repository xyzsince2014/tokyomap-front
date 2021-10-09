import {EventChannel} from 'redux-saga';
import {all, call, fork, put, take} from 'redux-saga/effects';

import {ConnectToSocketType, PostTweetType} from '../actions/socket/socketActionType';
import {PostTweetAction, SocketAction} from '../actions/socket/socketActionCreators';
import {createSocketConnection} from '../services/socket/connector';
import {subscribe} from '../services/socket/subscriber';

/**
 * initialise the socket state
 * @param socket
 */
export function* initSocketState(socket: SocketIOClient.Socket) {
  yield socket.emit('initSocketState');
}

/**
 * add a tweet, and syncronise the socket state
 * @param socket
 */
export function* updateSocketState(socket: SocketIOClient.Socket) {
  while (true) {
    const action: PostTweetAction = yield take(PostTweetType.POST_TWEET_BEGIN);
    yield socket.emit('postTweet', action.payload);
  }
}

/**
 * fetch an action from the channel and dispatch it
 * @param socket
 */
export function* dispatchActionFromChannel(socket: SocketIOClient.Socket) {
  const eventChannel: EventChannel<SocketAction> = yield call(subscribe, socket);
  while (true) {
    const action: SocketAction = yield take(eventChannel);
    yield put(action);
  }
}

export function* watchSocket() {
  while (true) {
    yield take(ConnectToSocketType.CONNECT_TO_SOCKET_BEGIN);
    const socket: SocketIOClient.Socket = yield call(createSocketConnection);
    yield fork(initSocketState, socket);
    yield fork(updateSocketState, socket);
    yield fork(dispatchActionFromChannel, socket);
  }
}

export default function* socketSaga() {
  yield all([fork(watchSocket)]);
}
