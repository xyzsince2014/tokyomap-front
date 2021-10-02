import {Reducer} from 'redux';

import {AuthAction} from '../actions/Auth/authActionCreator';
import * as ActionType from '../actions/Auth/authConstants';

export interface AuthState {
  isAuthenticated: boolean;
  userId: string;
}

export const initialAuthState = {
  isAuthenticated: false,
  userId: '0',
};

const authReducer: Reducer<AuthState, AuthAction> = (
  state: AuthState = initialAuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case ActionType.BEGIN: {
      return {
        ...state,
      };
    }
    case ActionType.RESOLVE: {
      return {
        ...state,
        isAuthenticated: action.payload.result.isAuthenticated,
        userId: action.payload.result.userId,
      };
    }
    case ActionType.REJECT: {
      return {
        ...state,
        isAuthenticated: false,
      };
    }
    default: {
      const _: never = action;
      return state;
    }
  }
};

export default authReducer;
