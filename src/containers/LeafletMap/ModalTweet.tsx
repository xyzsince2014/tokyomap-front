import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {postTweet, TweetPosted} from '../../store/socketSlice';
import ModalTweet from '../../components/LeafletMap/ModalTweet';
import useAuth from '../../hooks/auth/useAuth';
import useGeolocation from '../../hooks/geolocation/useGeolocation';
import useModal from '../../hooks/leafletMap/useModal';

interface DispatchProps {
  postTweetBegin: (tweetPosted: TweetPosted) => void;
}

export type EnhancedModalTweetProps = DispatchProps;

const mapDispatchToProps =
  (dispatch: Dispatch): DispatchProps => bindActionCreators({postTweetBegin: tweetPosted => postTweet(tweetPosted)}, dispatch);

const EnhancedModalTweet: React.FC<EnhancedModalTweetProps> = ({postTweetBegin}) => {
  const {userId} = useAuth();
  const modalRef = useModal();
  const {fetchGeolocation} = useGeolocation();

  const handlePost = async (): Promise<void> => {
    const message = document.getElementById('message') as HTMLInputElement;
    if (!message.value || message.value.length > 256) {
      /* eslint-disable no-alert */
      window.alert('invalid input');
      /* eslint-enable no-alert */
      return;
    }

    // fetch the current position at post time
    const geolocation = await fetchGeolocation();
    postTweetBegin({userId, message: message.value, geolocation});
    message.value = '';
  };

  return <ModalTweet ref={modalRef} handlePost={handlePost} />;
};

export default connect(null, mapDispatchToProps)(EnhancedModalTweet);
