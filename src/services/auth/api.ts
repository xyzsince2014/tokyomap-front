import axios, {AxiosResponse} from 'axios';
import statusCodes from 'http-status-codes';

// todo: see https://d.potato4d.me/entry/20200831-factory-args/
interface ApiConfig {
  baseURL?: string;
  timeout?: number;
}

const DEFAULT_API_CONFIG: ApiConfig = {
  baseURL: process.env.DOMAIN_API,
  timeout: 1000 * 10,
};

const createAxiosInstance = (optionalConfig: ApiConfig) => {
  const config = {
    ...DEFAULT_API_CONFIG,
    ...optionalConfig,
  };

  const instance = axios.create(config);

  // interceptors
  // instance.interceptors.request.use(() => {});
  // instance.interceptors.response.use(() => {});

  return instance;
};

interface AuthenticateResponse {
  userId: string;
}

interface AuthenticateResult {
  isAuthenticated: boolean;
  userId: string;
}

export const getAuthFactory = (optionalConfig: ApiConfig = {}) => {
  const instance = createAxiosInstance(optionalConfig);

  const authenticate = async (): Promise<AuthenticateResult> => {
    try {
      const response: AxiosResponse<AuthenticateResponse> = await instance.get(
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
