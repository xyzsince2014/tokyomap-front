import {call, fork, put, takeLatest} from 'redux-saga/effects';
import {GetGeolocationType} from '../actions/geolocation/geolocationActionType';

import * as geolocationActionCreators from '../actions/geolocation/geolocationActionCreators';
import getGeolocationFactory from '../services/geolocation/getGeolocationFactory';

const getGeolocation = getGeolocationFactory();

function* runGetGeolocation(apiHandler: typeof getGeolocation) {
  try {
    const geolocation = (yield call(apiHandler)) as L.LatLngTuple;
    yield put(geolocationActionCreators.getGeolocation.resolve(geolocation));
  } catch (err) {
    // window.alert('Enable geolocation'); // todo: display error notification
    yield put(geolocationActionCreators.getGeolocation.reject());
  }
}

function* watchGeolocation(apiHandler: typeof getGeolocation) {
  yield takeLatest(GetGeolocationType.GET_GEOLOCATION_BEGIN, runGetGeolocation, apiHandler);
}

export default function* geolocationSaga(
  apiHandler: () => Promise<L.LatLngTuple> = getGeolocation,
) {
  yield fork(watchGeolocation, apiHandler);
}
