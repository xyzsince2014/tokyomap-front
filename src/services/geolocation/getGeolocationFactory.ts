const defaultOptions: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10,
  maximumAge: 1000 * 60,
};

const getGeolocationFactory = (options: PositionOptions = defaultOptions) => {
  const getGeolocation = (): Promise<L.LatLngTuple> =>
    new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos: GeolocationPosition) => resolve([pos.coords.latitude, pos.coords.longitude]),
        () => reject(new Error('failed to get geolocation')),
        options,
      );
    });
  return getGeolocation;
};

export default getGeolocationFactory;
