import {eventChannel} from 'redux-saga';

import {connectToSocket, postTweet} from '../../actions/Socket/socketActionCreator';
import * as Models from '../../services/socket/models';

const subscribe = (socket: SocketIOClient.Socket) =>
  eventChannel(emit => {
    const initSocketStateResolve = (tweets: Models.Tweet[]) => {
      // todo: display connection notification
      emit(connectToSocket.resolve(tweets));
    };

    const initSocketStateReject = (err: Error) => {
      window.alert('failed to fetch tweets'); // todo: display error notification
      emit(connectToSocket.reject());
    };

    const updateSocketStateResolve = (tweets: Models.Tweet[]) => {
      emit(postTweet.resolve(tweets));
    };

    const updateSocketStateReject = (err: Error) => {
      window.alert('failed to post'); // todo: display error notification
      emit(postTweet.reject());
    };

    socket.on('initSocketState:resolve', initSocketStateResolve);
    socket.on('initSocketState:reject', initSocketStateReject);
    socket.on('postTweet:resolve', updateSocketStateResolve);
    socket.on('postTweet:reject', updateSocketStateReject);

    // the subscriber must return `unsubscribe()`, which will be invoked when the saga calls `channel.close()`
    const unsubscribe = () => {
      socket.off('initSocketState:resolve', initSocketStateResolve);
      socket.off('initSocketState:reject', initSocketStateReject);
      socket.off('postTweet:resolve', updateSocketStateResolve);
      socket.off('postTweet:reject', updateSocketStateReject);
    };

    return unsubscribe;
  });

export default subscribe;
