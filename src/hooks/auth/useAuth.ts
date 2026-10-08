import { useQuery } from '@tanstack/react-query';

import authenticate from '../../services/auth/authenticate';

export interface Auth {
  isAuthenticated: boolean;
  userId: string;
  isLoading: boolean;
}

/**
 * Authenticates, caches the result under the 'auth' key, and serves the cache (refetching when stale or invalidated).
 */
const useAuth = (): Auth => {
  // useQuery() returns {data, isLoading, error}, and re-renders when the cache changes.
  const { data, isLoading } = useQuery({
    queryKey: ['auth'], // cache key
    queryFn: authenticate,
    retry: false, // an auth check should fail closed, not retry
    staleTime: 1000 * 60 * 5, // treat the result as fresh for 5 min to avoid needless refetches
  });

  // treat as signed out before the first response or on error data is undefined
  return {
    isAuthenticated: data?.isAuthenticated ?? false,
    userId: data?.userId ?? '',
    isLoading,
  };
};

export default useAuth;
