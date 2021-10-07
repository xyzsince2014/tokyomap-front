import {useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {authenticate} from '../../actions/auth/authActionCreators';
import {connectToSocket, getGeolocation} from '../../actions/socket/socketActionCreators';
import DatetimeProvider from '../../providers/datetime/DatetimeProvider';
import {RootState} from '../../reducers/rootReducer';
import LeafletMap from '../../components/LeafletMap/LeafletMap';

interface LeafletMapState {
  tweets: Tweet[];
  isAuthenticated: boolean;
}

const EnhancedLeafletMap: React.FC = () => {
  const {tweets, isAuthenticated} = useSelector<RootState, LeafletMapState>(rootState => ({
    tweets: rootState.socketState.tweets,
    isAuthenticated: rootState.authState.isAuthenticated,
  }));

  const dispatch = useDispatch();
  const connectToSocketInit = useCallback(() => dispatch(connectToSocket.begin()), [dispatch]);
  const getIsAuthorisedBegin = useCallback(() => dispatch(authenticate.begin()), [dispatch]);
  const getGeolocationBegin = useCallback(() => dispatch(getGeolocation.begin()), [dispatch]);

  useEffect(() => {
    connectToSocketInit();
    getIsAuthorisedBegin();
    // todo: disconnectFromSocket on unmount, i.e. return a callback to disconnect here
  }, [connectToSocketInit, getIsAuthorisedBegin]);

  return (
    <DatetimeProvider>
      <LeafletMap {...{tweets, isAuthenticated, getGeolocationBegin}} />
    </DatetimeProvider>
  );
};

export default EnhancedLeafletMap;
