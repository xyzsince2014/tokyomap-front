import { takeLatest, fork, put, call, SagaReturnType } from 'redux-saga/effects';

import authenticate from '../services/auth/authenticate';
import * as authActionCreators from '../actions/auth/authActionCreators';
import { AuthActionType } from '../actions/auth/authActionType';

type AuthenticateResult = SagaReturnType<typeof authenticate>;

/**
 * Runs one authentication check: calls the auth service and dispatches the result back into Redux.
 *
 * @param apiHandler the auth service to call
 */
function* runAuthenticate(apiHandler: typeof authenticate) {
  try {
    const authenticateResult = (yield call(apiHandler)) as AuthenticateResult;
    yield put(authActionCreators.authenticate.resolve(authenticateResult));
  } catch (err: unknown) {
    yield put(authActionCreators.authenticate.reject());
  }
}

/**
 * Watches for authenticate.begin and runs runAuthenticate for each.
 * takeLatest keeps only the most recent run, cancelling any in-flight one (handy if begin fires again quickly).
 *
 * @param apiHandler the auth service, forwarded to runAuthenticate
 */
function* watchGetIsAuthenticated(apiHandler: typeof authenticate) {
  yield takeLatest(AuthActionType.BEGIN, runAuthenticate, apiHandler);
}

/**
 * Root auth saga: starts the watcher.
 *
 * @param apiHandler the auth service used to answer authenticate.begin
 */
export default function* authSaga(apiHandler: () => Promise<AuthenticateResult> = authenticate) {
  yield fork(watchGetIsAuthenticated, apiHandler);
}
