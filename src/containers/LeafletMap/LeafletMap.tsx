import {useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {authenticate} from '../../actions/auth/authActionCreators';
import {connectToSocket} from '../../actions/socket/socketActionCreators';
import {getGeolocation} from '../../actions/geolocation/geolocationActionCreators';
import DatetimeProvider from '../../providers/datetime/DatetimeProvider';
import {RootState} from '../../reducers/rootReducer';
import LeafletMap from '../../components/LeafletMap/LeafletMap';

/**
 * Container for the map screen.
 * Reads the state the map needs out of the store, fires off the socket + auth work when the screen mounts, and hands the data down as props.
 */
const EnhancedLeafletMap: React.FC = () => {

  // each useSelector subscribes to the store and re-reads its slice of the state whenever the store updates
  const tweets = useSelector((state: RootState) => state.socketState.tweets);
  const isAuthenticated = useSelector((state: RootState) => state.authState.isAuthenticated);

  // dispatch sends an action into Redux, which a saga picks up and acts on.
  const dispatch = useDispatch();

  // this handler is passed down to <LeafletMap> as a prop, so it needs a stable identity:
  // useCallback returns the same function across renders, which keeps the child from re-rendering just because we passed a new function.
  const getGeolocationBegin = useCallback(() => dispatch(getGeolocation.begin()), [dispatch]);

  // kick off the socket connection and the auth check on mount.
  // the effect re-runs only when a dependency changes; dispatch is stable, thus this runs once.
  // a cleanup returned here would run on unmount — that is where the socket should eventually be disconnected.
  useEffect(() => {
    dispatch(connectToSocket.begin());
    dispatch(authenticate.begin());
  }, [dispatch]);

  return (
    <DatetimeProvider>
      <LeafletMap {...{tweets, isAuthenticated, getGeolocationBegin}} />
    </DatetimeProvider>
  );
};

export default EnhancedLeafletMap;
