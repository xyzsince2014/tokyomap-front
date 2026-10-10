import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {TiMessage} from 'react-icons/ti';

import {postTweet} from '../../store/socketSlice';
import ModalTweet from '../../components/LeafletMap/ModalTweet';
import useAuth from '../../hooks/auth/useAuth';
import useGeolocation from '../../hooks/geolocation/useGeolocation';

/**
 * The tweet feature, self-contained: owns the open state, renders its own trigger button and the
 * modal, and dispatches the tweet on post. The parent just drops in <ModalTweet /> — no state leaks
 * into the presentational controls.
 */
const EnhancedModalTweet: React.FC = () => {
  const {userId} = useAuth();
  const {fetchGeolocation} = useGeolocation();
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);

  const handlePost = async (): Promise<void> => {
    const message = document.getElementById('message') as HTMLInputElement;
    if (!message.value || message.value.length > 256) {
      // eslint-disable-next-line no-alert
      window.alert('invalid input');
      return;
    }

    // fetch the current position at post time, then dispatch the tweet (the saga sends it over the socket)
    const geolocation = await fetchGeolocation();
    dispatch(postTweet({userId, message: message.value, geolocation}));
    message.value = '';
  };

  return (
    <>
      <button type="button" aria-label="Share a moment" onClick={() => setOpen(true)}>
        <TiMessage />
      </button>
      <ModalTweet isOpen={isOpen} onClose={() => setOpen(false)} handlePost={handlePost} />
    </>
  );
};

export default EnhancedModalTweet;
