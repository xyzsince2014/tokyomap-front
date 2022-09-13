import {ConnectToSocketType, PostTweetType} from './socketActionType';

interface ConnectToSocketAction {
  type: ValueOf<typeof ConnectToSocketType>;
  payload?: Tweet[];
  error?: boolean;
}

export interface TweetPosted {
  userId: string;
  message: string;
  geolocation: L.LatLngTuple;
}

export interface PostTweetAction {
  type: ValueOf<typeof PostTweetType>;
  payload?: TweetPosted | Tweet[];
  error?: boolean;
}

export type SocketAction = ConnectToSocketAction | PostTweetAction;

/* *** action creators *** */
export const connectToSocket = {
  begin: (): ConnectToSocketAction => ({
    type: ConnectToSocketType.CONNECT_TO_SOCKET_BEGIN,
  }),
  resolve: (tweets: Tweet[]): ConnectToSocketAction => ({
    type: ConnectToSocketType.CONNECT_TO_SOCKET_RESOLVE,
    payload: tweets,
  }),
  reject: (): ConnectToSocketAction => ({
    type: ConnectToSocketType.CONNECT_TO_SOCKET_REJECT,
    error: true,
  }),
};

export const postTweet = {
  begin: (tweetPosted: TweetPosted): PostTweetAction => ({
    type: PostTweetType.POST_TWEET_BEGIN,
    payload: tweetPosted,
  }),
  resolve: (tweets: Tweet[]): PostTweetAction => ({
    type: PostTweetType.POST_TWEET_RESOLVE,
    payload: tweets,
  }),
  reject: (): PostTweetAction => ({
    type: PostTweetType.POST_TWEET_REJECT,
    error: true,
  }),
};
