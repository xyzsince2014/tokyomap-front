const getGeolocationFactory = () => {
  const getGeolocation = (): Promise<L.LatLngTuple> =>
    new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos: GeolocationPosition) => resolve([pos.coords.latitude, pos.coords.longitude]),
        (err: GeolocationPositionError) => reject(new Error('failed to get geolocation')),
        {
          enableHighAccuracy: true,
          timeout: 1000 * 10,
          maximumAge: 1000 * 60,
        },
      );
    });

  return getGeolocation;
};

export default getGeolocationFactory;
