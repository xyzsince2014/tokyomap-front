import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {connectToSocket} from '../../actions/socket/socketActionCreators';
import DatetimeProvider from '../../providers/datetime/DatetimeProvider';
import {RootState} from '../../reducers/rootReducer';
import useAuth from '../../hooks/auth/useAuth';
import LeafletMap from '../../components/LeafletMap/LeafletMap';

/**
 * Container for the map screen.
 * Reads the state the map needs (tweets from Redux, auth from React Query), starts the socket on mount, and hands the data down as props.
 */
const EnhancedLeafletMap: React.FC = () => {
  const tweets = useSelector((state: RootState) => state.socketState.tweets);

  // auth is server state: useAuth (React Query) fetches and caches it — no action/reducer/saga
  const {isAuthenticated} = useAuth();

  // dispatch sends an action into Redux, which a saga picks up and acts on.
  const dispatch = useDispatch();

  // kick off the socket connection on mount (auth is handled by useAuth, which fetches on its own).
  // dispatch is stable, so this runs once.
  useEffect(() => {
    dispatch(connectToSocket.begin());
  }, [dispatch]);

  return (
    <DatetimeProvider>
      <LeafletMap {...{tweets, isAuthenticated}} />
    </DatetimeProvider>
  );
};

export default EnhancedLeafletMap;
