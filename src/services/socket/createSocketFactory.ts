import io from 'socket.io-client';

const DEFAULT_CONNECT_OPTS: SocketIOClient.ConnectOpts = {transports: ['websocket']};

export const createSocketFactory = (
  uri: string,
  opts: SocketIOClient.ConnectOpts = DEFAULT_CONNECT_OPTS,
) => {
  const createSocket = (): Promise<SocketIOClient.Socket> => {
    const socket = io(uri, opts);
    return new Promise(resolve => {
      socket.on('connect', () => {
        resolve(socket);
      });
      // todo: reject(new Error());
    });
  };

  return createSocket;
};
