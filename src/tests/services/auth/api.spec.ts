import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import statusCodes from 'http-status-codes';

import {getAuthFactory} from '../../../services/auth/api';

describe('auth api handlers', () => {
  const mockAdapter = new MockAdapter(axios);

  afterEach(() => {
    mockAdapter.reset(); // reset response data after each test
  });

  describe('authenticate()', () => {
    it('should be authenticated', async () => {
      mockAdapter.onGet('/auth/authenticate').reply(statusCodes.OK, {userId: '12345'});
      const authenticate = getAuthFactory();
      const authenticateResult = await authenticate();
      expect(authenticateResult).toStrictEqual({isAuthenticated: true, userId: '12345'});
    });

    it('should be unauthenticated', async () => {
      mockAdapter.onGet('/auth/authenticate').reply(statusCodes.UNAUTHORIZED, {userId: ''});
      const authenticate = getAuthFactory();
      const authenticateResult = await authenticate();
      expect(authenticateResult).toStrictEqual({isAuthenticated: false, userId: ''});
    });

    it('should fail with invalid response', async () => {
      mockAdapter.onGet('/auth/authenticate').reply(statusCodes.OK, {userId: ''});
      try {
        const authenticate = getAuthFactory();
        void (await authenticate());
      } catch (err) {
        expect(err).toStrictEqual(Error('Server Error'));
      }
    });

    it('should fail with internal server error', async () => {
      mockAdapter.onGet('/auth/authenticate').reply(statusCodes.INTERNAL_SERVER_ERROR);
      try {
        const authenticate = getAuthFactory();
        void (await authenticate());
      } catch (err: any) {
        expect(err).toStrictEqual(Error('Server Error'));
      }
    });
  });
});
