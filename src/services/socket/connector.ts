import io from 'socket.io-client';

export const createSocketConnection = (): Promise<SocketIOClient.Socket> => {
  const socket = io(`${process.env.DOMAIN_WEB!}`, {transports: ['websocket']});

  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
};
