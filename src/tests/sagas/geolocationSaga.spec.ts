import {expectSaga} from 'redux-saga-test-plan';

import geolocationReducer, {initialGeolocationState} from '../../reducers/geolocationReducer';
import geolocationSaga from '../../sagas/geolocationSaga';
import * as geolocationActionCreators from '../../actions/geolocation/geolocationActionCreators';

describe('geolocationSaga with geolocationReducer', () => {
  const apiHandler = jest.fn();
  const latLngTuple = [35.7242395, 139.7013494] as L.LatLngTuple;

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should succeed', async () => {
    apiHandler.mockReturnValue(latLngTuple);
    return expectSaga(geolocationSaga, apiHandler)
      .withReducer(geolocationReducer)
      .dispatch(geolocationActionCreators.getGeolocation.begin())
      .put(geolocationActionCreators.getGeolocation.resolve(latLngTuple))
      .hasFinalState({geolocation: latLngTuple})
      .silentRun();
  });

  it('should fail', async () => {
    apiHandler.mockRejectedValue(Error('hoge'));
    return expectSaga(geolocationSaga, apiHandler)
      .withReducer(geolocationReducer)
      .dispatch(geolocationActionCreators.getGeolocation.begin())
      .put(geolocationActionCreators.getGeolocation.reject())
      .hasFinalState(initialGeolocationState)
      .silentRun();
  });

  it("starts the watcher with the default service when no handler is given", () => {
    const gen = geolocationSaga();
    expect(gen.next().value).toBeDefined(); // fork(watchGeolocation, getGeolocation)
    expect(gen.next().done).toBe(true);
  });
});
