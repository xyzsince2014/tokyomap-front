import {Reducer} from 'redux';

import {
  ConnectToSocketType,
  PostTweetType,
  GetGeolocationType,
} from '../actions/socket/socketActionType';
import {SocketAction} from '../actions/socket/socketActionCreators';

export interface SocketState {
  tweets: Tweet[];
  geolocation: L.LatLngTuple;
}

// default geolocation is Tokyo Sta.
const initialSocketState: SocketState = {tweets: [], geolocation: [35.680722, 139.767271]};

const socketReducer: Reducer<SocketState, SocketAction> = (
  state: SocketState = initialSocketState,
  action: SocketAction,
): SocketState => {
  switch (action.type) {
    case ConnectToSocketType.CONNECT_TO_SOCKET_BEGIN: {
      return {
        ...state,
      };
    }
    case ConnectToSocketType.CONNECT_TO_SOCKET_RESOLVE: {
      return {
        ...state,
        tweets: action.payload ?? [],
      };
    }
    case ConnectToSocketType.CONNECT_TO_SOCKET_REJECT: {
      return {
        ...state,
      };
    }
    case PostTweetType.POST_TWEET_BEGIN: {
      return {
        ...state,
      };
    }
    case PostTweetType.POST_TWEET_RESOLVE: {
      const payload = action.payload as {tweets: Tweet[]};
      return {
        ...state,
        tweets: payload.tweets,
      };
    }
    case PostTweetType.POST_TWEET_REJECT: {
      return {
        ...state,
      };
    }
    case GetGeolocationType.GET_GEOLOCATION_BEGIN: {
      return {
        ...state,
      };
    }
    case GetGeolocationType.GET_GEOLOCATION_RESOLVE: {
      return {
        ...state,
        geolocation: action.payload?.geolocation ?? initialSocketState.geolocation,
      };
    }
    case GetGeolocationType.GET_GEOLOCATION_REJECT: {
      return {
        ...state,
        geolocation: initialSocketState.geolocation,
      };
    }
    default: {
      // todo: fix the line below
      // const _: never = action.type;
      return state;
    }
  }
};

export default socketReducer;
