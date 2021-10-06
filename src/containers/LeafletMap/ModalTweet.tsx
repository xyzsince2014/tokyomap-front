import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {postTweet, TweetPosted} from '../../actions/socket/socketActionCreators';
import {RootState} from '../../reducers/rootReducer';
import ModalTweet from '../../components/LeafletMap/ModalTweet';
import useModal from '../../hooks/leafletMap/useModal';

interface StateProps {
  userId: string;
  geolocation: L.LatLngTuple;
}

interface DispatchProps {
  postTweetBegin: (tweetPosted: TweetPosted) => void;
}

/* **************************** ↓mergeProps()を使う場合 **************************** */
// <ModalTweetContainer/>のattributes
// interface OwnProps {}

// ModalTweetContainer: React.FC<MegedProps>の型
// mergeProps()のみで使ってModalTweetContainerに渡さないattributesはomitする
// type MergedProps = Omit<StateProps, ''> & Omit<DispatchProps, ''> & OwnProps;

// connect(mapStateToProps, mapDispatchToProps, mergeProps)(ModalTweetContainer)の形で使う
// const mergeProps:MergedProps<StateProps, DispatchProps, OwnProps, MergedProps> = (stateProps, dispatchProps, ownProps) => {
// ModalTweetContainerに渡すものはここに展開
// ...stateProps,
// ...dipatchProps,
// ...ownProps,
// store, dispatchを利用する関数はここで定義してModalTweetContainerに渡す
//   hoge: async () => {...}
// };
/* **************************** ↑mergeProps()を使う場合 **************************** */

export type EnhancedModalTweetProps = StateProps & DispatchProps;

const mapStateToProps = (state: RootState): StateProps => ({
  userId: state.authState.userId,
  geolocation: state.socketState.geolocation,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators({postTweetBegin: tweetPosted => postTweet.begin(tweetPosted)}, dispatch);

const ModalTweetContainer: React.FC<EnhancedModalTweetProps> = ({
  userId,
  geolocation,
  postTweetBegin,
}) => {
  const modalRef = useModal();

  const handlePost = (): void => {
    const message = document.getElementById('message') as HTMLInputElement; // todo: use `useRefs` instead of `document.getElementById`
    if (!message.value || message.value.length > 256) {
      /* eslint-disable no-alert */
      window.alert('invalid input');
      /* eslint-enable no-alert */
      return;
    }
    postTweetBegin({userId, message: message.value, geolocation});
    message.value = '';
  };

  return <ModalTweet ref={modalRef} handlePost={handlePost} />;
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalTweetContainer);
