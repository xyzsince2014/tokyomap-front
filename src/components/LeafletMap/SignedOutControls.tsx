import {TiMessage} from 'react-icons/ti';

import Clock from '../Clock/Clock';
import ModalAuth from '../../containers/LeafletMap/ModalAuth';

const SignedOutControls: React.FC = () => (
  <div>
    <div className="l-control">
      <div className="l-control__topright">
        <button type="button" data-modal-trigger="modal_auth">
          <TiMessage />
        </button>
      </div>
      <div className="l-control__bottomleft">
        <Clock />
      </div>
    </div>
    <ModalAuth />
  </div>
);

export default SignedOutControls;
