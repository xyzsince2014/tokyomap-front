import { call, fork, put, takeLatest } from 'redux-saga/effects';
import { GetGeolocationType } from '../actions/geolocation/geolocationActionType';

import * as geolocationActionCreators from '../actions/geolocation/geolocationActionCreators';
import getGeolocation from '../services/geolocation/getGeolocation';

/**
 * Runs one geolocation lookup: calls the service and dispatches the [lat, lng] back into Redux (resolve), or reject on failure (e.g. the user denied permission).
 *
 * @param apiHandler the geolocation service to call (injectable, so tests can pass a mock)
 */
function* runGetGeolocation(apiHandler: typeof getGeolocation) {
  try {
    const geolocation = (yield call(apiHandler)) as L.LatLngTuple;
    yield put(geolocationActionCreators.getGeolocation.resolve(geolocation));
  } catch (err) {
    // no toast system in this app; window.alert is the established pattern (cf. ModalTweet)
    window.alert('Could not get your location. Please allow location access and try again.');
    yield put(geolocationActionCreators.getGeolocation.reject());
  }
}

/**
 * Watches for getGeolocation.begin and runs runGetGeolocation for each (takeLatest keeps only the most recent lookup).
 *
 * @param apiHandler the geolocation service, forwarded to runGetGeolocation
 */
function* watchGeolocation(apiHandler: typeof getGeolocation) {
  yield takeLatest(GetGeolocationType.GET_GEOLOCATION_BEGIN, runGetGeolocation, apiHandler);
}

/**
 * Root geolocation saga: starts the watcher.
 *
 * @param apiHandler the geolocation service used to answer getGeolocation.begin
 */
export default function* geolocationSaga(
  apiHandler: () => Promise<L.LatLngTuple> = getGeolocation,
) {
  yield fork(watchGeolocation, apiHandler);
}
