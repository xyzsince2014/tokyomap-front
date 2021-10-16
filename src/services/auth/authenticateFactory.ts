import {AxiosResponse} from 'axios';
import statusCodes from 'http-status-codes';

import axiosInstanceFactory, {ApiConfig} from './axiosInstanceFactory';

interface AuthenticateResponse {
  userId: string;
}

interface AuthenticateResult {
  isAuthenticated: boolean;
  userId: string;
}

const authenticateFactory = (optionalConfig: ApiConfig = {}) => {
  const axiosInstance = axiosInstanceFactory(optionalConfig);

  const authenticate = async (): Promise<AuthenticateResult> => {
    try {
      const response: AxiosResponse<AuthenticateResponse> = await axiosInstance.get(
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

  return authenticate;
};

export default authenticateFactory;
