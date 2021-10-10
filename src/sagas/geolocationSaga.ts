import {call, fork, put, takeLatest} from 'redux-saga/effects';
import {GetGeolocationType} from '../actions/geolocation/geolocationActionType';

import * as geolocationActionCreators from '../actions/geolocation/geolocationActionCreators';
import {getGeolocationFactory} from '../services/geolocation/api';

const getGeolocation = getGeolocationFactory();

export function* runGetGeolocation(apiHandler: typeof getGeolocation) {
  try {
    const geolocation = (yield call(apiHandler)) as L.LatLngTuple;
    yield put(geolocationActionCreators.getGeolocation.resolve(geolocation));
  } catch (err) {
    // window.alert('Enable geolocation'); // todo: display error notification
    yield put(geolocationActionCreators.getGeolocation.reject());
  }
}

export function* watchGeolocation(apiHandler: typeof getGeolocation) {
  yield takeLatest(GetGeolocationType.GET_GEOLOCATION_BEGIN, runGetGeolocation, apiHandler);
}

export default function* geolocationSaga() {
  yield fork(watchGeolocation, getGeolocation);
}
