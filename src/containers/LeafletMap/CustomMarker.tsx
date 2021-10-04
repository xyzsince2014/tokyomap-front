import * as React from 'react';

import useTimer from '../../hooks/LeafletMap/use-timer';
import CustormMarker from '../../components/LeafletMap/CustomMarker';
import {Tweet} from '../../services/socket/models';

// todo: rename to EnhancedCustomMarkerProps
export interface CustomMarkerProps {
  tweet: Tweet;
}

const CustormMarkerContainer: React.FC<CustomMarkerProps> = ({tweet}) => {
  const timeRemaining = useTimer(tweet.disappearAt);
  return timeRemaining > 0 ? <CustormMarker tweet={tweet} timeRemaining={timeRemaining} /> : <></>;
};

export default CustormMarkerContainer;
