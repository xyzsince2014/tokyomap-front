import Clock from '../Clock/Clock';
import ModalAuth from '../../containers/LeafletMap/ModalAuth';

const SignedOutControls: React.FC = () => (
  <div>
    <div className="l-control">
      <div className="l-control__topright">
        <ModalAuth />
      </div>
      <div className="l-control__bottomleft">
        <Clock />
      </div>
    </div>
  </div>
);

export default SignedOutControls;
