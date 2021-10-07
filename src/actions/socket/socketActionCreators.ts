import {ConnectSocketType, PostTweetType, GetGeolocationType} from './socketActionType';

interface ConnectToSocketAction {
  type: ValueOf<typeof ConnectSocketType>;
  payload?: {tweets: Tweet[]};
  error?: boolean;
}

// todo: remove to types/hoge.d.ts
export interface TweetPosted {
  userId: string;
  message: string;
  geolocation: L.LatLngTuple;
}

export interface PostTweetAction {
  type: ValueOf<typeof PostTweetType>;
  payload?: TweetPosted | {tweets: Tweet[]};
  error?: boolean;
}

interface GetGeolocationAction {
  type: ValueOf<typeof GetGeolocationType>;
  payload?: {geolocation: L.LatLngTuple};
  error?: boolean;
}

export type SocketAction = ConnectToSocketAction | PostTweetAction | GetGeolocationAction;

export const connectToSocket = {
  begin: (): ConnectToSocketAction => ({
    type: ConnectSocketType.CONNECT_SOCKET_BEGIN,
  }),
  resolve: (tweets: Tweet[]): ConnectToSocketAction => ({
    type: ConnectSocketType.CONNECT_SOCKET_RESOLVE,
    payload: {tweets},
  }),
  reject: (): ConnectToSocketAction => ({
    type: ConnectSocketType.CONNECT_SOCKET_REJECT,
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
    payload: {tweets},
  }),
  reject: (): PostTweetAction => ({
    type: PostTweetType.POST_TWEET_REJECT,
    error: true,
  }),
};

export const getGeolocation = {
  begin: (): GetGeolocationAction => ({
    type: GetGeolocationType.GET_GEOLOCATION_BEGIN,
  }),
  resolve: (geolocation: L.LatLngTuple): GetGeolocationAction => ({
    type: GetGeolocationType.GET_GEOLOCATION_RESOLVE,
    payload: {geolocation},
  }),
  reject: (): GetGeolocationAction => ({
    type: GetGeolocationType.GET_GEOLOCATION_REJECT,
    error: true,
  }),
};
