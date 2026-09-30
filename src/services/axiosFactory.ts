import axios from 'axios';

export interface ApiConfig {
  baseURL?: string;
  timeout?: number;
}

const DEFAULT_API_CONFIG: ApiConfig = {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  baseURL: `${process.env.DOMAIN!}/api`,
  timeout: 1000 * 10,
};

const axiosFactory = (optionalConfig: ApiConfig) => {
  const config = {
    ...DEFAULT_API_CONFIG,
    ...optionalConfig,
  };

  const axiosInstance = axios.create(config);

  // interceptors
  // instance.interceptors.request.use(() => {});
  // instance.interceptors.response.use(() => {});

  return axiosInstance;
};

export default axiosFactory;
