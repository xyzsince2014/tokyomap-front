import {expectSaga} from 'redux-saga-test-plan';

import geolocationReducer, {initialGeolocationState} from '../../reducers/geolocationReducer';
import {watchGeolocation} from '../../sagas/geolocationSaga';
import * as geolocationActionCreators from '../../actions/geolocation/geolocationActionCreators';

describe('geolocationSaga with geolocationReducer', () => {
  const apiHandler = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should succeed', async () => {
    const latLngTuple = [35.7242395, 139.7013494] as L.LatLngTuple;
    apiHandler.mockReturnValue(latLngTuple);
    return expectSaga(watchGeolocation, apiHandler)
      .withReducer(geolocationReducer)
      .dispatch(geolocationActionCreators.getGeolocation.begin())
      .put(geolocationActionCreators.getGeolocation.resolve(latLngTuple))
      .hasFinalState({geolocation: latLngTuple})
      .silentRun();
  });

  it('should fail', async () => {
    apiHandler.mockRejectedValue(Error('hoge'));
    return expectSaga(watchGeolocation, apiHandler)
      .withReducer(geolocationReducer)
      .dispatch(geolocationActionCreators.getGeolocation.begin())
      .put(geolocationActionCreators.getGeolocation.reject())
      .hasFinalState(initialGeolocationState)
      .silentRun();
  });
});
