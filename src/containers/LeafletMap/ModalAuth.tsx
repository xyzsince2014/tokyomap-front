import * as React from 'react';

import ModalAuth from '../../components/LeafletMap/ModalAuth';
import {setModals} from '../../utils/modal';

const ModalAuthContainer: React.FC = () => {
  // todo: use `useRef` instead of `useEffect` and `document.getElementsByClassName`
  React.useEffect(() => {
    Array.from(document.getElementsByClassName('l-modal')).map(modal => {
      setModals(modal);
      return false;
    });
  }, []);

  return <ModalAuth />;
};

export default ModalAuthContainer;
