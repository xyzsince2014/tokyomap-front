const defaultOptions: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10,
  maximumAge: 1000 * 60,
};

/**
 * Resolves the browser's current position as a [lat, lng] tuple.
 *
 * @param options geolocation options (accuracy / timeout / max age); defaults to defaultOptions
 * @returns a promise of [latitude, longitude], rejected if the position cannot be obtained
 */
const getGeolocation = (options: PositionOptions = defaultOptions): Promise<L.LatLngTuple> =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos: GeolocationPosition) => resolve([pos.coords.latitude, pos.coords.longitude]),
      () => reject(new Error('failed to get geolocation')),
      options,
    );
  });

export default getGeolocation;
