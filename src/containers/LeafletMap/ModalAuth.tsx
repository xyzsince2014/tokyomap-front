import {useState} from 'react';
import {TiMessage} from 'react-icons/ti';

import ModalAuth from '../../components/LeafletMap/ModalAuth';

/**
 * The auth feature, self-contained: owns the open state and renders its own trigger button and the
 * modal, so no state leaks into the presentational controls.
 */
const EnhancedModalAuth: React.FC = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <button type="button" aria-label="Sign in" onClick={() => setOpen(true)}>
        <TiMessage />
      </button>
      <ModalAuth isOpen={isOpen} onClose={() => setOpen(false)} />
    </>
  );
};

export default EnhancedModalAuth;
