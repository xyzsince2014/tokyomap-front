import {expectSaga} from 'redux-saga-test-plan';

import authReducer, {initialAuthState} from '../../reducers/authReducer';
import {watchGetIsAuthorised} from '../../sagas/authSaga';
import * as authActionCreators from '../../actions/auth/authActionCreators';

describe('authSaga with authReducer', () => {
  const apiHandler = jest.fn(); // mock apiHandler
  const validAuthenticateResult = {isAuthenticated: true, userId: 'hoge'};

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be authenticated', async () => {
    apiHandler.mockReturnValue(validAuthenticateResult);
    return expectSaga(watchGetIsAuthorised, apiHandler)
      .withReducer(authReducer)
      .dispatch(authActionCreators.authenticate.begin()) // action to be taken by saga
      .put(authActionCreators.authenticate.resolve(validAuthenticateResult)) // action expected to be dispatched by saga
      .hasFinalState(validAuthenticateResult) // expected state
      .silentRun(); // run saga
  });

  it('should be unauthenticated', async () => {
    apiHandler.mockReturnValue({isAuthenticated: false, userId: ''});
    return expectSaga(watchGetIsAuthorised, apiHandler)
      .withReducer(authReducer)
      .dispatch(authActionCreators.authenticate.begin())
      .put(authActionCreators.authenticate.resolve({isAuthenticated: false, userId: ''}))
      .hasFinalState({isAuthenticated: false, userId: ''})
      .silentRun();
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

  it('should fail with internal server error', async () => {
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
