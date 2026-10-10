import { io } from 'socket.io-client';

import { AppSocket } from './socketEvents';

/**
 * Connects to the socket server: resolves with the socket once connected, rejects if the connection fails.
 *
 * @param uri the socket server URL
 * @returns a promise of the connected socket
 */
export const createSocket = (uri: string): Promise<AppSocket> =>
  // bridge socket.io's event-based connect into a Promise
  new Promise((resolve, reject) => {

    // start connecting; io() returns the socket synchronously, the connection itself happens async via events
    const socket: AppSocket = io(uri, { transports: ['websocket'] });

    // 'connect' is triggered once connected -> resolve with the ready socket
    socket.on('connect', () => resolve(socket));

    // 'connect_error' is triggered if the handshake fails -> reject (normalize whatever is passed to an Error)
    socket.on('connect_error', (err: Error) =>
      reject(err instanceof Error ? err : new Error('socket connection failed')),
    );
  });
