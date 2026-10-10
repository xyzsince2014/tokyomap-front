import { useCallback, useState } from 'react';

import getGeolocation from '../../services/geolocation/getGeolocation';

// default position
const DEFAULT_GEOLOCATION: L.LatLngTuple = [35.680722, 139.767271];

/**
 * Local-state hook for the browser's geolocation.
 * fetchGeolocation() calls the same getGeolocation() service on demand (e.g. when posting a tweet), stores the result, and returns it.
 */
const useGeolocation = () => {
  const [geolocation, setGeolocation] = useState<L.LatLngTuple>(DEFAULT_GEOLOCATION);

  const fetchGeolocation = useCallback(async (): Promise<L.LatLngTuple> => {
    try {
      const current = await getGeolocation();
      setGeolocation(current);
      return current;
    } catch {
      window.alert('Cannot not get your location.');
      return DEFAULT_GEOLOCATION;
    }
  }, []);

  return { geolocation, fetchGeolocation };
};

export default useGeolocation;
