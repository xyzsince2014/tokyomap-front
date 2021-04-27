import * as React from 'react';

import CustormMarker from '../../components/LeafletMap/CustomMarker';
import {Tweet} from '../../services/socket/models';
import {formatDateTime, fetchCurrentTime} from '../../utils/dateTime';

// todo: rename to EnhancedCustomMarkerProps
export interface CustomMarkerProps {
  tweet: Tweet;
}

const useTimer = (tweet: Tweet) => {
  const getTimeRemaining = () => {
    const disapperAt = new Date(formatDateTime(tweet.disappearAt));
    return Math.floor((disapperAt.getTime() - fetchCurrentTime().getTime()) / 1000);
  };
  const [timeRemaining, setTimeRemaining] = React.useState<number>(getTimeRemaining());

  const tick = () => {
    setTimeRemaining(getTimeRemaining());
  };

  React.useEffect(() => {
    const timer = setInterval(tick, 1000 * 10);
    return () => clearInterval(timer);
  }, []);

  return timeRemaining;
};

const CustormMarkerContainer: React.FC<CustomMarkerProps> = ({tweet}) => {
  const timeRemaining = useTimer(tweet);
  if (timeRemaining < 0) {
    return <div />;
  }
  return <CustormMarker tweet={tweet} timeRemaining={timeRemaining} />;
};

export default CustormMarkerContainer;
