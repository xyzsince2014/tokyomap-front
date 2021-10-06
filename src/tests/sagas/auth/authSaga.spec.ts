import {expectSaga} from 'redux-saga-test-plan';

import authReducer from '../../../reducers/authReducer';
import {watchGetIsAuthorised} from '../../../sagas/auth/authSaga';
import * as authActions from '../../../actions/auth/authActionCreators';

describe('authSaga with authReducer', () => {
  const apiHandler = jest.fn(); // mock apiHandler

  it('should resolve', async () => {
    apiHandler.mockReturnValue({isAuthenticated: true, userId: 'hoge'});
    return expectSaga(watchGetIsAuthorised, apiHandler)
      .hasFinalState({isAuthenticated: true, userId: 'hoge'}) // expected state
      .withReducer(authReducer)
      .put(authActions.authenticate.resolve({isAuthenticated: true, userId: 'hoge'})) // action expected to be dispatched by saga
      .dispatch(authActions.authenticate.begin()) // action to be taken by saga
      .silentRun(); // run saga
  });

  it('should reject with internal server error', async () => {
    const err = {
      message: 'Intrernal Server Error',
      response: {
        status: 500,
        statusText: 'Intrernal Server Error',
      },
    };
    apiHandler.mockRejectedValue(err);
    return expectSaga(watchGetIsAuthorised, apiHandler)
      .withReducer(authReducer)
      .hasFinalState({isAuthenticated: false, userId: ''})
      .put(authActions.authenticate.reject())
      .dispatch(authActions.authenticate.begin())
      .silentRun();
  });
});
