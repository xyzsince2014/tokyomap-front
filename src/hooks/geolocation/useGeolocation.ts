import { useCallback, useState } from 'react';

import getGeolocation from '../../services/geolocation/getGeolocation';

// default position
const DEFAULT_GEOLOCATION: L.LatLngTuple = [35.680722, 139.767271];

/**
 * Local-state hook for the browser's geolocation.
 *
 * fetchGeolocation() calls the same getGeolocation() service on demand (e.g. when posting a tweet),
 * stores the result, and returns it. On failure it warns the user and falls back to the default,
 * matching the old saga's behaviour. State is local to the component that calls this hook, which is
 * fine here: only ModalTweet needs the value, and it fetches it right when it posts.
 */
const useGeolocation = () => {
  const [geolocation, setGeolocation] = useState<L.LatLngTuple>(DEFAULT_GEOLOCATION);

  const fetchGeolocation = useCallback(async (): Promise<L.LatLngTuple> => {
    try {
      const current = await getGeolocation();
      setGeolocation(current);
      return current;
    } catch {
      window.alert('Could not get your location. Please allow location access and try again.');
      return DEFAULT_GEOLOCATION;
    }
  }, []);

  return { geolocation, fetchGeolocation };
};

export default useGeolocation;
