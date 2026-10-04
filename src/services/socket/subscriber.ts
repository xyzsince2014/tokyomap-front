import {eventChannel, EventChannel} from 'redux-saga';

import {connectToSocketFailed, tweetsReceived, SocketEvent} from '../../store/socketSlice';
import {logError} from '../../utils/devLog';

/**
 * Bridges the socket's inbound events into a redux-saga channel: each server message becomes a
 * Redux action the saga can take() and dispatch. The returned unsubscribe handler removes the
 * listeners when the channel is closed.
 *
 * @param socket the connected socket to listen on
 * @returns an EventChannel that emits a SocketEvent for each inbound server event
 */
export const subscribe = (socket: SocketIOClient.Socket): EventChannel<SocketEvent> =>
  eventChannel(emit => {
    socket.on('initSocketState:resolve', (tweets: Tweet[]) => emit(tweetsReceived(tweets)));
    socket.on('initSocketState:reject', (error?: unknown) => {
      // the server sends the underlying Error here; surface it (dev only) so the cause is visible in DevTools
      logError('socket initSocketState rejected:', error);
      emit(connectToSocketFailed());
    });
    socket.on('postTweet:resolve', (tweets: Tweet[]) => emit(tweetsReceived(tweets)));
    socket.on('postTweet:reject', (error?: unknown) => {
      logError('socket postTweet rejected:', error);
      emit(connectToSocketFailed());
    });

    return () => {
      socket.off('initSocketState:resolve');
      socket.off('initSocketState:reject');
      socket.off('postTweet:resolve');
      socket.off('postTweet:reject');
    };
  });
