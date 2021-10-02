import axios, {AxiosResponse} from 'axios';

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
  isAuthenticated: boolean;
  user?: {userId: string};
}

export interface AuthenticateResult {
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
          validateStatus: statusCode => statusCode === 200,
          withCredentials: true,
        },
      );

      if (!response.data.user?.userId || !response.data.isAuthenticated) {
        return {
          isAuthenticated: false,
          userId: '',
        };
      }

      return {
        isAuthenticated: response.data.isAuthenticated,
        userId: response.data.user.userId,
      };
    } catch (err) {
      return {
        isAuthenticated: false,
        userId: '',
      };
    }
  };

  return authenticate;
};
