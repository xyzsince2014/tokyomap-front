import useTimer from '../../hooks/LeafletMap/use-timer';
import CustormMarker from '../../components/LeafletMap/CustomMarker';
import {Tweet} from '../../services/socket/models';

interface EnhancedCustomMarkerProps {
  tweet: Tweet;
}

const CustormMarkerContainer: React.FC<EnhancedCustomMarkerProps> = ({tweet}) => {
  const timeRemaining = useTimer(tweet.disappearAt);
  return timeRemaining > 0 ? <CustormMarker tweet={tweet} timeRemaining={timeRemaining} /> : <></>;
};

export default CustormMarkerContainer;
