import io from 'socket.io-client';

import {createSocket} from '../../../services/socket/createSocket';

jest.mock('socket.io-client', () => ({__esModule: true, default: jest.fn()}));

type Handler = (arg?: unknown) => void;

// a fake socket that records its event handlers so the test can trigger connect / connect_error
const makeFakeSocket = () => {
  const handlers: Record<string, Handler> = {};
  return {
    socket: {
      on: (event: string, handler: Handler) => {
        handlers[event] = handler;
      },
    },
    trigger: (event: string, arg?: unknown) => handlers[event]?.(arg),
  };
};

describe('createSocket()', () => {
  afterEach(() => jest.clearAllMocks());

  it('resolves with the socket once connected', async () => {
    const {socket, trigger} = makeFakeSocket();
    (io as unknown as jest.Mock).mockReturnValue(socket);

    const promise = createSocket('http://localhost');
    trigger('connect');

    await expect(promise).resolves.toBe(socket);
  });

  it('rejects when the connection fails', async () => {
    const {socket, trigger} = makeFakeSocket();
    (io as unknown as jest.Mock).mockReturnValue(socket);

    const promise = createSocket('http://localhost');
    trigger('connect_error', new Error('boom'));

    await expect(promise).rejects.toThrow('boom');
  });

  it('rejects with a generic error when connect_error carries no Error', async () => {
    const {socket, trigger} = makeFakeSocket();
    (io as unknown as jest.Mock).mockReturnValue(socket);

    const promise = createSocket('http://localhost');
    trigger('connect_error', 'oops'); // not an Error instance

    await expect(promise).rejects.toThrow('socket connection failed');
  });
});
