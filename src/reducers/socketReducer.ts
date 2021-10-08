import {Reducer} from 'redux';
import produce from 'immer';

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
      return state;
    }
    case ConnectToSocketType.CONNECT_TO_SOCKET_RESOLVE: {
      return produce(state, draft => {
        draft.tweets = action.payload as Tweet[];
      });
    }
    case ConnectToSocketType.CONNECT_TO_SOCKET_REJECT: {
      return state;
    }
    case PostTweetType.POST_TWEET_BEGIN: {
      return state;
    }
    case PostTweetType.POST_TWEET_RESOLVE: {
      return produce(state, draft => {
        draft.tweets = action.payload as Tweet[];
      });
    }
    case PostTweetType.POST_TWEET_REJECT: {
      return state;
    }
    case GetGeolocationType.GET_GEOLOCATION_BEGIN: {
      return state;
    }
    case GetGeolocationType.GET_GEOLOCATION_RESOLVE: {
      return produce(state, draft => {
        draft.geolocation = action.payload as L.LatLngTuple;
      });
    }
    case GetGeolocationType.GET_GEOLOCATION_REJECT: {
      return produce(state, draft => {
        draft.geolocation = initialSocketState.geolocation;
      });
    }
    default: {
      return state;
    }
  }
};

export default socketReducer;
