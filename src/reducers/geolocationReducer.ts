import {Reducer} from 'redux';
import produce from 'immer';

import {GetGeolocationType} from '../actions/geolocation/geolocationActionType';
import {GetGeolocationAction} from '../actions/geolocation/geolocationActionCreators';

export interface GeolocationState {
  geolocation: L.LatLngTuple;
}

// default geolocation is Tokyo Sta.
export const initialGeolocationState: GeolocationState = {geolocation: [35.680722, 139.767271]};

const geolocationReducer: Reducer<GeolocationState, GetGeolocationAction> = (
  state: GeolocationState = initialGeolocationState,
  action: GetGeolocationAction,
): GeolocationState => {
  switch (action.type) {
    case GetGeolocationType.GET_GEOLOCATION_RESOLVE: {
      return produce(state, draft => {
        draft.geolocation = action.payload as L.LatLngTuple;
      });
    }
    case GetGeolocationType.GET_GEOLOCATION_REJECT: {
      return produce(state, draft => {
        draft.geolocation = initialGeolocationState.geolocation;
      });
    }
    default: {
      return state;
    }
  }
};

export default geolocationReducer;
