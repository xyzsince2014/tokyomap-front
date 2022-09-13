import {AuthActionType} from './authActionType';

interface AuthenticateResult {
  isAuthenticated: boolean;
  userId: string;
}

export interface AuthAction {
  type: ValueOf<typeof AuthActionType>;
  payload?: AuthenticateResult;
  error?: boolean;
}

export const authenticate = {
  begin: (): AuthAction => ({
    type: AuthActionType.BEGIN,
  }),
  resolve: (result: AuthenticateResult): AuthAction => ({
    type: AuthActionType.RESOLVE,
    payload: result,
  }),
  reject: (): AuthAction => ({
    type: AuthActionType.REJECT,
    error: true,
  }),
};
