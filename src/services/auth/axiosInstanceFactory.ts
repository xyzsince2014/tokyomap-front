import axios from 'axios';

// todo: see https://d.potato4d.me/entry/20200831-factory-args/
export interface ApiConfig {
  baseURL?: string;
  timeout?: number;
}

const DEFAULT_API_CONFIG: ApiConfig = {
  baseURL: process.env.DOMAIN_API,
  timeout: 1000 * 10,
};

const axiosInstanceFactory = (optionalConfig: ApiConfig) => {
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

export default axiosInstanceFactory;
