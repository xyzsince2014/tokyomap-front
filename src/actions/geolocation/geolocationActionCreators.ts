import {GetGeolocationType} from './geolocationActionType';

export interface GetGeolocationAction {
  type: ValueOf<typeof GetGeolocationType>;
  payload?: L.LatLngTuple;
  error?: boolean;
}

export const getGeolocation = {
  begin: (): GetGeolocationAction => ({
    type: GetGeolocationType.GET_GEOLOCATION_BEGIN,
  }),
  resolve: (geolocation: L.LatLngTuple): GetGeolocationAction => ({
    type: GetGeolocationType.GET_GEOLOCATION_RESOLVE,
    payload: geolocation,
  }),
  reject: (): GetGeolocationAction => ({
    type: GetGeolocationType.GET_GEOLOCATION_REJECT,
    error: true,
  }),
};
