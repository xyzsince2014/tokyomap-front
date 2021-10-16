import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import statusCodes from 'http-status-codes';

import authenticateFactory from '../../../services/auth/authenticateFactory';

describe('authenticate()', () => {
  const mockAdapter = new MockAdapter(axios);

  afterEach(() => {
    mockAdapter.reset(); // reset response data after each test
  });

  it('should succeed (be authenticated)', async () => {
    mockAdapter.onGet('/auth/authenticate').reply(statusCodes.OK, {userId: '12345'});
    const authenticate = authenticateFactory();
    const authenticateResult = await authenticate();
    expect(authenticateResult).toStrictEqual({isAuthenticated: true, userId: '12345'});
  });

  it('should succeed (be unauthenticated)', async () => {
    mockAdapter.onGet('/auth/authenticate').reply(statusCodes.UNAUTHORIZED, {userId: ''});
    const authenticate = authenticateFactory();
    const authenticateResult = await authenticate();
    expect(authenticateResult).toStrictEqual({isAuthenticated: false, userId: ''});
  });

  it('should fail with invalid response', async () => {
    mockAdapter.onGet('/auth/authenticate').reply(statusCodes.OK, {userId: ''});
    try {
      const authenticate = authenticateFactory();
      void (await authenticate());
    } catch (err) {
      expect(err).toStrictEqual(Error('Server Error'));
    }
  });

  it('should fail with internal server error', async () => {
    mockAdapter.onGet('/auth/authenticate').reply(statusCodes.INTERNAL_SERVER_ERROR);
    try {
      const authenticate = authenticateFactory();
      void (await authenticate());
    } catch (err: any) {
      expect(err).toStrictEqual(Error('Server Error'));
    }
  });
});
