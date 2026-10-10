import {expectSaga} from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import {throwError} from 'redux-saga-test-plan/providers';
import {eventChannel} from 'redux-saga';

import socketSaga from '../../store/socketSaga';
import {AppSocket} from '../../services/socket/socketEvents';
import {createSocket} from '../../services/socket/createSocket';
import {subscribe} from '../../services/socket/subscriber';
import {
  connectToSocket,
  connectToSocketFailed,
  postTweet,
  tweetsReceived,
} from '../../store/socketSlice';

// a minimal socket stub; only emit/disconnect are exercised by the saga
const fakeSocket = () =>
  ({emit: jest.fn(), disconnect: jest.fn()} as unknown as AppSocket);

const tweets = [{tweetId: 't1'}] as Tweet[];

describe('socketSaga', () => {
  it('puts tweetsReceived when the socket channel emits it (connect -> subscribe -> put)', () => {
    const socket = fakeSocket();
    // a channel that emits one tweetsReceived once a taker is listening
    const channel = eventChannel(emit => {
      setTimeout(() => emit(tweetsReceived(tweets)), 0);
      return () => {};
    });

    return expectSaga(socketSaga)
      .provide([
        [matchers.call.fn(createSocket), socket],
        [matchers.call.fn(subscribe), channel],
      ])
      .dispatch(connectToSocket())
      .put(tweetsReceived(tweets))
      .silentRun();
  });

  it('puts connectToSocketFailed when the connection fails', () =>
    expectSaga(socketSaga)
      .provide([[matchers.call.fn(createSocket), throwError(new Error('connect failed'))]])
      .dispatch(connectToSocket())
      .put(connectToSocketFailed())
      .silentRun());

  it('forwards a postTweet to the socket server', async () => {
    // keep emit as a standalone mock so the assertion does not reference it as an unbound method
    const emit = jest.fn();
    const socket = {emit, disconnect: jest.fn()} as unknown as AppSocket;
    const channel = eventChannel(() => () => {});

    await expectSaga(socketSaga)
      .provide([
        [matchers.call.fn(createSocket), socket],
        [matchers.call.fn(subscribe), channel],
      ])
      .dispatch(connectToSocket())
      .dispatch(postTweet({userId: 'u1', message: 'hi', geolocation: [35, 139]}))
      .silentRun();

    expect(emit).toHaveBeenCalledWith('postTweet', {
      userId: 'u1',
      message: 'hi',
      geolocation: [35, 139],
    });
  });
});
