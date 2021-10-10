import {takeLatest, all, fork, put, call, SagaReturnType} from 'redux-saga/effects';

import {getAuthFactory} from '../services/auth/api';
import * as authActionCreators from '../actions/auth/authActionCreators';
import {AuthActionType} from '../actions/auth/authActionType';

/* api handlers */
const authenticate = getAuthFactory();
type AuthenticateResult = SagaReturnType<typeof authenticate>;

/* tasks */
export function* runAuthenticate(apiHandler: typeof authenticate) {
  try {
    const authenticateResult = (yield call(apiHandler)) as AuthenticateResult;
    yield put(authActionCreators.authenticate.resolve(authenticateResult));
  } catch (err: unknown) {
    yield put(authActionCreators.authenticate.reject());
  }
}

/* watchers */
export function* watchGetIsAuthorised(apiHandler: typeof authenticate) {
  // while (true) {
  //   const action: ReturnType<typeof authActionCreators.authenticate.begin> = yield take(ActionType.BEGIN);
  //   yield fork(runAuthenticate, apiHandler);
  // }
  yield takeLatest(AuthActionType.BEGIN, runAuthenticate, apiHandler); // a syntactic sugar for the snippet above. cf. https://github.com/redux-saga/redux-saga/issues/684
}

export default function* authSaga() {
  yield all([fork(watchGetIsAuthorised, authenticate)]);
}
