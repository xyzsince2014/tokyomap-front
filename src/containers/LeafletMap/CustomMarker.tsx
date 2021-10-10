import useTimer from '../../hooks/leafletMap/useTimer';
import CustormMarker from '../../components/LeafletMap/CustomMarker';

interface EnhancedCustomMarkerProps {
  tweet: Tweet;
}

const EnhancedCustormMarker: React.FC<EnhancedCustomMarkerProps> = ({tweet}) => {
  const {timeRemaining} = useTimer(tweet.disappearAt);
  return timeRemaining > 0 ? <CustormMarker tweet={tweet} timeRemaining={timeRemaining} /> : <></>;
};

export default EnhancedCustormMarker;
