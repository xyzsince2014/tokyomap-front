import {BiCreditCard, BiLogOutCircle, BiUserCircle} from 'react-icons/bi';
import {TiMessage} from 'react-icons/ti';
import {useNavigate} from 'react-router';

import Clock from '../Clock/Clock';
import ModalTweet from '../../containers/LeafletMap/ModalTweet';

export interface SignedInControlsProps {
  getGeolocationBegin?: () => void;
}

const SignedInControls: React.FC<SignedInControlsProps> = ({getGeolocationBegin = () => {}}) => {

  // navigate('/path') sends the user to the /path page
  const navigate = useNavigate();

  return (
    <div>
      <div className="l-control">
        <div className="l-control__topleft">
          <button
            type="button"
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              window.location.href = `${process.env.DOMAIN!}/api/auth/signout`;
            }}
          >
            <BiLogOutCircle />
          </button>
          <button
            type="button"
            aria-label="Edit profile"
            onClick={() => {
              // open the RS-owned profile management page in a new tab
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              window.open(`${process.env.RESOURCE_DOMAIN!}/profile`, '_blank', 'noopener');
            }}
          >
            <BiUserCircle />
          </button>
          <button type="button" aria-label="Checkout" onClick={() => navigate('/checkout')}>
            <BiCreditCard />
          </button>
        </div>
        <div className="l-control__topright">
          <button type="button" data-modal-trigger="modal_tweet" onClick={getGeolocationBegin}>
            <TiMessage />
          </button>
        </div>
        <div className="l-control__bottomleft">
          <Clock />
        </div>
      </div>
      <ModalTweet />
    </div>
  );
};

export default SignedInControls;
