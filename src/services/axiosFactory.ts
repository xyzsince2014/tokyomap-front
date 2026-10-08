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

/**
 * Creates an axios instance preconfigured for the BFF API, merging the caller's overrides over the defaults.
 *
 * @param optionalConfig per-call overrides merged over DEFAULT_API_CONFIG
 * @returns a configured axios instance
 */
const axiosFactory = (optionalConfig: ApiConfig = {}) => {
  const config = {
    ...DEFAULT_API_CONFIG,
    ...optionalConfig,
  };

  const axiosInstance = axios.create(config);

  return axiosInstance;
};

export default axiosFactory;
