import {takeLatest, all, fork, put, call} from 'redux-saga/effects';

import * as api from '../../services/auth/api';
import * as authActions from '../../actions/Auth/authActionCreator';
import * as ActionType from '../../actions/Auth/authConstants';

/* api handlers */
const authenticate = api.getAuthFactory();

/* tasks */
export function* runAuthenticate(apiHandler: typeof authenticate) {
  try {
    const {isAuthenticated, userId}: api.AuthenticateResult = yield call(apiHandler);
    yield put(authActions.authenticate.resolve({isAuthenticated, userId}));
  } catch (err: unknown) {
    yield put(authActions.authenticate.reject(err));
  }
}

/* watchers */
export function* watchGetIsAuthorised(apiHandler: typeof authenticate) {
  // while (true) {
  //   const action: ReturnType<typeof authActions.authenticate.begin> = yield take(ActionType.BEGIN);
  //   yield fork(runAuthenticate, apiHandler);
  // }
  yield takeLatest(ActionType.BEGIN, runAuthenticate, apiHandler); // a syntactic sugar for the snippet above. cf. https://github.com/redux-saga/redux-saga/issues/684
}

export default function* authSaga() {
  yield all([fork(watchGetIsAuthorised, authenticate)]);
}
