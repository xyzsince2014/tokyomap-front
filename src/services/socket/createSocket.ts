import io from 'socket.io-client';

const DEFAULT_CONNECT_OPTS: SocketIOClient.ConnectOpts = { transports: ['websocket'] };

/**
 * Connects to the socket server: resolves with the socket once connected, rejects if the
 * connection fails.
 *
 * @param uri the socket server URL
 * @param opts socket.io connection options (defaults to websocket transport)
 * @returns a promise of the connected socket
 */
export const createSocket = (uri: string, opts: SocketIOClient.ConnectOpts = DEFAULT_CONNECT_OPTS): Promise<SocketIOClient.Socket> =>
  new Promise((resolve, reject) => {
    const socket = io(uri, opts);
    socket.on('connect', () => resolve(socket));
    socket.on('connect_error', (err: Error) =>
      reject(err instanceof Error ? err : new Error('socket connection failed')),
    );
  });
