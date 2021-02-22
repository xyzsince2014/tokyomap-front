import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {authenticate} from '../../actions/Auth/authActionCreator';
import {connectToSocket} from '../../actions/Socket/socketActionCreator';
import {RootState} from '../../reducers/rootReducer';
import * as Models from '../../services/socket/models';
import LeafletMap, {LeafletMapProps} from '../../presentationals/LeafletMap/LeafletMap';

interface StateProps {
  tweets: Models.Tweet[];
  isAuthenticated: boolean;
}

interface DispatchProps {
  connectToSocketInit: () => void;
  getIsAuthorisedBegin: () => void;
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
    },
    dispatch,
  );

const LeafletMapContainer: React.FC<EnhancedLeafletMapProps> = ({
  tweets,
  isAuthenticated,
  connectToSocketInit,
  getIsAuthorisedBegin,
}) => {
  React.useEffect(() => {
    connectToSocketInit();
    getIsAuthorisedBegin();
  }, []);
  return <LeafletMap tweets={tweets} isAuthenticated={isAuthenticated} />;
};

export default connect(mapStateToProps, mapDispatchToProps)(LeafletMapContainer);
