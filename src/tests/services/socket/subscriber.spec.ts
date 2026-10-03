import {subscribe} from '../../../services/socket/subscriber';
import {tweetsReceived, connectToSocketFailed} from '../../../store/socketSlice';

type Handler = (arg?: unknown) => void;

// a fake socket that records its event handlers so the test can trigger them
const makeFakeSocket = () => {
  const handlers: Record<string, Handler> = {};
  const off = jest.fn();
  const socket = {
    on: (event: string, handler: Handler) => {
      handlers[event] = handler;
    },
    off,
  };
  return {
    socket: socket as unknown as SocketIOClient.Socket,
    off,
    trigger: (event: string, arg?: unknown) => handlers[event]?.(arg),
  };
};

const tweets = [{tweetId: 't1'}] as Tweet[];

describe('subscribe()', () => {
  it('emits tweetsReceived on initSocketState:resolve', done => {
    const {socket, trigger} = makeFakeSocket();
    const channel = subscribe(socket);
    channel.take(action => {
      expect(action).toEqual(tweetsReceived(tweets));
      channel.close();
      done();
    });
    trigger('initSocketState:resolve', tweets);
  });

  it('emits tweetsReceived on postTweet:resolve', done => {
    const {socket, trigger} = makeFakeSocket();
    const channel = subscribe(socket);
    channel.take(action => {
      expect(action).toEqual(tweetsReceived(tweets));
      channel.close();
      done();
    });
    trigger('postTweet:resolve', tweets);
  });

  it('emits connectToSocketFailed on initSocketState:reject', done => {
    const {socket, trigger} = makeFakeSocket();
    const channel = subscribe(socket);
    channel.take(action => {
      expect(action).toEqual(connectToSocketFailed());
      channel.close();
      done();
    });
    trigger('initSocketState:reject');
  });

  it('emits connectToSocketFailed on postTweet:reject', done => {
    const {socket, trigger} = makeFakeSocket();
    const channel = subscribe(socket);
    channel.take(action => {
      expect(action).toEqual(connectToSocketFailed());
      channel.close();
      done();
    });
    trigger('postTweet:reject');
  });

  it('removes all listeners when the channel closes', () => {
    const {socket, off} = makeFakeSocket();
    const channel = subscribe(socket);
    channel.close();
    expect(off).toHaveBeenCalledTimes(4);
  });
});
