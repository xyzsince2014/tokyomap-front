import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {authenticate} from '../../actions/Auth/authActionCreator';
import {connectToSocket, getGeolocation} from '../../actions/Socket/socketActionCreator';

import {RootState} from '../../reducers/rootReducer';
import * as Models from '../../services/socket/models';
import LeafletMap, {LeafletMapProps} from '../../components/LeafletMap/LeafletMap';

interface StateProps {
  tweets: Models.Tweet[];
  isAuthenticated: boolean;
}

interface DispatchProps {
  connectToSocketInit: () => void;
  getIsAuthorisedBegin: () => void;
  getGeolocationBegin: () => void;
}

type EnhancedLeafletMapProps = LeafletMapProps & StateProps & DispatchProps;

const mapStateToProps = (state: RootState): StateProps => ({
  tweets: state.socketState.tweets,
  isAuthenticated: state.authState.isAuthenticated,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      connectToSocketInit: () => connectToSocket.begin(),
      getIsAuthorisedBegin: () => authenticate.begin(),
      getGeolocationBegin: () => getGeolocation.begin(),
    },
    dispatch,
  );

const LeafletMapContainer: React.FC<EnhancedLeafletMapProps> = ({
  tweets,
  isAuthenticated,
  connectToSocketInit,
  getIsAuthorisedBegin,
  getGeolocationBegin,
}) => {
  React.useEffect(() => {
    connectToSocketInit();
    getIsAuthorisedBegin();
    // todo: disconnectFromSocket on unmount, i.e. return a callback to disconnect here
  }, [connectToSocketInit, getIsAuthorisedBegin]);
  return (
    <LeafletMap
      tweets={tweets}
      isAuthenticated={isAuthenticated}
      getGeolocationBegin={getGeolocationBegin}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LeafletMapContainer);
