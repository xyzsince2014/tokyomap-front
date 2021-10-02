export const getGeolocationFactory = () => {
  const getGeolocation = (): Promise<L.LatLngTuple> | void => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos: GeolocationPosition) => resolve([pos.coords.latitude, pos.coords.longitude]),
        (err: GeolocationPositionError) => reject(new Error(`${err}`)),
        {
          enableHighAccuracy: true,
          timeout: 1000 * 10,
          maximumAge: 1000 * 60,
        },
      );
    });
  };

  return getGeolocation;
};
