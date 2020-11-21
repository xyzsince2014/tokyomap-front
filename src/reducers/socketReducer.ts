import {Reducer} from 'redux';

import {SocketAction} from '../actions/Socket/socketActionCreator';
import * as ActionType from '../actions/Socket/socketConstants';
import * as Models from '../services/socket/models';

export interface SocketState {
  tweets: Models.Tweet[];
  geolocation: L.LatLngTuple;
}

const socketReducer: Reducer<SocketState, SocketAction> = (
  state: SocketState = {tweets: [], geolocation: [35.680722, 139.767271]}, // default geolocation is Tokyo Sta.
  action: SocketAction,
): SocketState => {
  switch (action.type) {
    case ActionType.CONNECT_SOCKET_BEGIN:
      return {
        ...state,
      };
    case ActionType.CONNECT_SOCKET_RESOLVE:
      return {
        ...state,
        tweets: action.payload.tweets,
      };
    case ActionType.POST_TWEET_BEGIN:
      return {
        ...state,
      };
    case ActionType.POST_TWEET_RESOLVE:
      return {
        ...state,
        tweets: action.payload.tweets,
      };
    case ActionType.GET_GEOLOCATION_BEGIN:
      return {
        ...state,
      };
    case ActionType.GET_GEOLOCATION_RESOLVE:
      return {
        ...state,
        geolocation: action.payload.geolocation,
      };
    default:
      /* eslint-disable no-case-declarations */
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _: never = action;
      return state;
  }
};

export default socketReducer;
