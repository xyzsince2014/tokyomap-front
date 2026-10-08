import { AxiosResponse } from 'axios';
import statusCodes from 'http-status-codes';

import axiosFactory from '../axiosFactory';

interface AuthenticateResponse {
  userId: string;
}

interface AuthenticateResult {
  isAuthenticated: boolean;
  userId: string;
}

/**
 * Asks the BFF whether the current session is authenticated with the session cookie.
 *
 * @returns on 200, `{isAuthenticated: true, userId}`; on 401, `{isAuthenticated: false, userId: ''}`
 */
const authenticate = async (): Promise<AuthenticateResult> => {
  const axios = axiosFactory();

  try {
    const response: AxiosResponse<AuthenticateResponse> = await axios.get(
      '/auth/authenticate',
      {
        validateStatus: statusCode =>
          statusCode === statusCodes.OK || statusCode === statusCodes.UNAUTHORIZED,
        withCredentials: true,
      },
    );

    if (response.status === statusCodes.UNAUTHORIZED) {
      return {
        isAuthenticated: false,
        userId: '',
      };
    }

    if (!response.data.userId) {
      throw new Error();
    }

    return {
      isAuthenticated: true,
      userId: response.data.userId,
    };

  } catch (err) {
    throw new Error('Server Error');
  }
};

export default authenticate;
