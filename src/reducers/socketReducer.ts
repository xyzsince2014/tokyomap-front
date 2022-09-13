import {Reducer} from 'redux';
import produce from 'immer';

import {ConnectToSocketType, PostTweetType} from '../actions/socket/socketActionType';
import {SocketAction} from '../actions/socket/socketActionCreators';

export interface SocketState {
  tweets: Tweet[];
}

export const initialSocketState: SocketState = {tweets: []};

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
    default: {
      return state;
    }
  }
};

export default socketReducer;
