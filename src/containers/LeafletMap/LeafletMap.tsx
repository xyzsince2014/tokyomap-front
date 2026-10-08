import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {connectToSocket} from '../../store/socketSlice';
import {RootState} from '../../store';
import DatetimeProvider from './DatetimeProvider';
import useAuth from '../../hooks/auth/useAuth';
import LeafletMap from '../../components/LeafletMap/LeafletMap';

/**
 * Reads the state the map needs (tweets from Redux, auth from ReactQuery), starts the socket on mount, and hands the data down as props.
 */
const EnhancedLeafletMap: React.FC = () => {

  /* Redux */
  // useSelector(state => state.x) reads state.x from the store, and re-renders this component when state.x changes.
  const tweets = useSelector((state: RootState) => state.tweets);

  // dispatch(action) sends the action into Redux; a reducer and/or saga handles it.
  // action = {type, payload}
  const dispatch = useDispatch();

  // kick off the socket connection on mount (dispatch is stable, so this runs once)
  useEffect(() => {
    dispatch(connectToSocket());
  }, [dispatch]);

  /* ReactQuery */
  // fetch and cache auth with the custom hook
  const {isAuthenticated} = useAuth();

  return (
    <DatetimeProvider>
      <LeafletMap {...{tweets, isAuthenticated}} />
    </DatetimeProvider>
  );
};

export default EnhancedLeafletMap;
