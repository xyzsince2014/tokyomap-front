import { eventChannel, EventChannel } from 'redux-saga';
import { connectToSocket, postTweet, SocketAction } from '../../actions/socket/socketActionCreators';

/**
 * Bridges the socket's inbound events into a redux-saga channel:
 * each server message is turned into a Redux action and emitted, so the saga can take() them and dispatch into the store.
 * The returned channel's unsubscribe handler removes every listener when the channel is closed.
 *
 * @param socket the connected socket to listen on
 * @returns an EventChannel that emits SocketAction for each inbound server event
 */
export const subscribe = (socket: SocketIOClient.Socket): EventChannel<SocketAction> => eventChannel(emit => {
  // listen for initSocketState response
  socket.on('initSocketState:resolve', (tweets: Tweet[]) => {
    emit(connectToSocket.resolve(tweets));
  });

  socket.on('initSocketState:reject', (error: Error) => {
    emit(connectToSocket.reject());
  });

  // listen for postTweet response
  socket.on('postTweet:resolve', (tweets: Tweet[]) => {
    emit(postTweet.resolve(tweets));
  });

  socket.on('postTweet:reject', (error: Error) => {
    emit(postTweet.reject());
  });

  // Handle connection events
  socket.on('connect', () => {
  });

  socket.on('disconnect', () => {
  });

  socket.on('connect_error', (error: Error) => {
  });

  // unsubscribe function
  return () => {
    socket.off('initSocketState:resolve');
    socket.off('initSocketState:reject');
    socket.off('postTweet:resolve');
    socket.off('postTweet:reject');
    socket.off('connect');
    socket.off('disconnect');
    socket.off('connect_error');
  };
});
