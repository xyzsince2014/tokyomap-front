import {AuthActionType} from './authActionType';

interface AuthResult {
  isAuthenticated: boolean;
  userId: string;
}

export interface AuthAction {
  type: ValueOf<typeof AuthActionType>;
  payload?: AuthResult;
  error?: boolean;
}

export const authenticate = {
  begin: (): AuthAction => ({
    type: AuthActionType.BEGIN,
  }),
  resolve: (result: AuthResult): AuthAction => ({
    type: AuthActionType.RESOLVE,
    payload: result,
  }),
  reject: (): AuthAction => ({
    type: AuthActionType.REJECT,
    error: true,
  }),
};
