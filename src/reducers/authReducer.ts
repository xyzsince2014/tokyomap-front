import {Reducer} from 'redux';
import produce from 'immer';

import {AuthAction} from '../actions/auth/authActionCreators';
import {AuthActionType} from '../actions/auth/authActionType';

export interface AuthState {
  isAuthenticated: boolean;
  userId: string;
}

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  userId: '',
};

const authReducer: Reducer<AuthState, AuthAction> = (
  state: AuthState = initialAuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case AuthActionType.BEGIN: {
      return state;
    }
    case AuthActionType.RESOLVE: {
      return produce(state, () => action.payload?.result ?? {isAuthenticated: false, userId: ''});
    }
    case AuthActionType.REJECT: {
      return produce(state, () => ({isAuthenticated: false}));
    }
    default: {
      const _: never = action.type;
      return state;
    }
  }
};

export default authReducer;
