import { useQuery } from '@tanstack/react-query';

import authenticate from '../../services/auth/authenticate';

export interface Auth {
  isAuthenticated: boolean;
  userId: string;
  isLoading: boolean;
}

/**
 * Calls authenticate() once, caches the result under the 'auth' key, and hands loading/data to any component which calls this hook.
 * Dedupes concurrent calls and can refetch/invalidate the cache later.
 */
const useAuth = (): Auth => {
  const { data, isLoading } = useQuery({
    queryKey: ['auth'], // cache key
    queryFn: authenticate,
    retry: false, // an auth check should fail closed, not retry
    staleTime: 1000 * 60 * 5, // treat the result as fresh for 5 min to avoid needless refetches
  });

  // before the first response or on error data is undefined -> treat as signed out
  return {
    isAuthenticated: data?.isAuthenticated ?? false,
    userId: data?.userId ?? '',
    isLoading,
  };
};

export default useAuth;
