import {eventChannel, EventChannel} from 'redux-saga';
import {connectToSocket, postTweet,SocketAction} from '../../actions/socket/socketActionCreators';

export const subscribe = (socket: SocketIOClient.Socket): EventChannel<SocketAction> => eventChannel(emit => {
    // Listen for initSocketState response
    socket.on('initSocketState:resolve', (tweets: Tweet[]) => {
      emit(connectToSocket.resolve(tweets));
    });

    socket.on('initSocketState:reject', (error: Error) => {
      emit(connectToSocket.reject());
    });

    // Listen for postTweet response
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

    // Unsubscribe function
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
