import { Socket } from 'socket.io-client';

import { TweetPosted } from '../../store/socketSlice';

/**
 * The socket event names.
 */
export const SOCKET_EVENTS = {
  INIT: 'initSocketState',
  INIT_RESOLVE: 'initSocketState:resolve',
  INIT_REJECT: 'initSocketState:reject',
  POST: 'postTweet',
  POST_RESOLVE: 'postTweet:resolve',
  POST_REJECT: 'postTweet:reject',
} as const;

/**
 * server -> client: events the client listens for.
 */
export interface ServerToClientEvents {
  [SOCKET_EVENTS.INIT_RESOLVE]: (tweets: Tweet[]) => void;
  [SOCKET_EVENTS.INIT_REJECT]: (error?: unknown) => void;
  [SOCKET_EVENTS.POST_RESOLVE]: (tweets: Tweet[]) => void;
  [SOCKET_EVENTS.POST_REJECT]: (error?: unknown) => void;
}

/**
 * client -> server: events the client emits.
 */
export interface ClientToServerEvents {
  [SOCKET_EVENTS.INIT]: () => void;
  [SOCKET_EVENTS.POST]: (payload: TweetPosted) => void;
}

/**
 * the app's socket with both directions typed.
 */
export type AppSocket = Socket<ServerToClientEvents, ClientToServerEvents>;
