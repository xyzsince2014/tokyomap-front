import {ConnectToSocketType, PostTweetType, GetGeolocationType} from './socketActionType';

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

interface GetGeolocationAction {
  type: ValueOf<typeof GetGeolocationType>;
  payload?: L.LatLngTuple;
  error?: boolean;
}

export type SocketAction = ConnectToSocketAction | PostTweetAction | GetGeolocationAction;

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

export const getGeolocation = {
  begin: (): GetGeolocationAction => ({
    type: GetGeolocationType.GET_GEOLOCATION_BEGIN,
  }),
  resolve: (geolocation: L.LatLngTuple): GetGeolocationAction => ({
    type: GetGeolocationType.GET_GEOLOCATION_RESOLVE,
    payload: geolocation,
  }),
  reject: (): GetGeolocationAction => ({
    type: GetGeolocationType.GET_GEOLOCATION_REJECT,
    error: true,
  }),
};
