import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {getAuthFactory} from '../../../services/auth/api';

describe('src/services/auth/api.ts', () => {
  const mockAdapter = new MockAdapter(axios);

  afterEach(() => {
    mockAdapter.reset(); // reset response data after each test
  });

  describe('authenticate()', () => {
    it('should resolve with normal value', async () => {
      mockAdapter
        .onGet('/auth/authenticate')
        .reply(200, {isAuthenticated: true, user: {userId: '12345'}});
      const authenticate = getAuthFactory();
      const {isAuthenticated, userId} = await authenticate();
      expect(isAuthenticated).toBeTruthy();
      expect(userId).toBe('12345');
    });

    it('should resolve with abnormal value', async () => {
      mockAdapter
        .onGet('/auth/authenticate')
        .reply(200, {isAuthenticated: null, user: {userId: null}});
      const authenticate = getAuthFactory();
      const {isAuthenticated, userId} = await authenticate();
      expect(isAuthenticated).toBeFalsy();
      expect(userId).toBe('');
    });

    it('should resolve with forbidden', async () => {
      mockAdapter.onGet('/auth/authenticate').reply(403, {isAuthenticated: false});
      try {
        const authenticate = getAuthFactory();
        await authenticate(); // todo: cover L44-47
      } catch (err: any) {
        expect(err.response.status).toBe(403);
      }
    });

    it('should reject with internal server error', async () => {
      mockAdapter.onGet('/auth/authenticate').reply(500, 'Internal Server Error');
      try {
        const authenticate = getAuthFactory();
        await authenticate();
      } catch (err: any) {
        expect(err.response.status).toBe(500);
      }
    });
  });
});
