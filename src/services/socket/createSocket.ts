import io from 'socket.io-client';

const DEFAULT_CONNECT_OPTS: SocketIOClient.ConnectOpts = { transports: ['websocket'] };

/**
 * Connects to the socket server: resolves with the socket once connected, rejects if the connection fails.
 *
 * @param uri the socket server URL
 * @param opts socket.io connection options (defaults to websocket transport)
 * @returns a promise of the connected socket
 */
export const createSocket = (uri: string, opts: SocketIOClient.ConnectOpts = DEFAULT_CONNECT_OPTS): Promise<SocketIOClient.Socket> =>
  // bridge socket.io's event-based connect into a Promise
  new Promise((resolve, reject) => {

    // start connecting; io() returns the socket synchronously, the connection itself happens async via events
    const socket = io(uri, opts);

    // 'connect' fires once connected -> resolve with the ready socket
    socket.on('connect', () => resolve(socket));

    // 'connect_error' fires if the handshake fails -> reject (normalize whatever is passed to an Error)
    socket.on('connect_error', (err: Error) =>
      reject(err instanceof Error ? err : new Error('socket connection failed')),
    );
  });
