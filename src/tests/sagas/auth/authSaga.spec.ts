import {expectSaga} from 'redux-saga-test-plan';

import authReducer, {initialAuthState} from '../../../reducers/authReducer';
import {watchGetIsAuthorised} from '../../../sagas/auth/authSaga';
import * as authActionCreators from '../../../actions/auth/authActionCreators';

describe('authSaga with authReducer', () => {
  const apiHandler = jest.fn(); // mock apiHandler

  it('should be authenticated', async () => {
    apiHandler.mockReturnValue({isAuthenticated: true, userId: 'hoge'});
    return expectSaga(watchGetIsAuthorised, apiHandler)
      .withReducer(authReducer)
      .dispatch(authActionCreators.authenticate.begin()) // action to be taken by saga
      .put(authActionCreators.authenticate.resolve({isAuthenticated: true, userId: 'hoge'})) // action expected to be dispatched by saga
      .hasFinalState({isAuthenticated: true, userId: 'hoge'}) // expected state
      .silentRun(); // run saga
  });

  it('should be unauthenticated', async () => {
    apiHandler.mockReturnValue({isAuthenticated: false, userId: ''});
    return expectSaga(watchGetIsAuthorised, apiHandler)
      .withReducer(authReducer)
      .dispatch(authActionCreators.authenticate.begin()) // action to be taken by saga
      .put(authActionCreators.authenticate.resolve({isAuthenticated: false, userId: ''})) // action expected to be dispatched by saga
      .hasFinalState({isAuthenticated: false, userId: ''}) // expected state
      .silentRun(); // run saga
  });

  it('should fail with Error thrown', async () => {
    apiHandler.mockRejectedValue(Error('Server Error'));
    return expectSaga(watchGetIsAuthorised, apiHandler)
      .withReducer(authReducer)
      .dispatch(authActionCreators.authenticate.begin())
      .put(authActionCreators.authenticate.reject())
      .hasFinalState(initialAuthState)
      .silentRun();
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
      .dispatch(authActionCreators.authenticate.begin())
      .put(authActionCreators.authenticate.reject())
      .hasFinalState(initialAuthState)
      .silentRun();
  });
});
