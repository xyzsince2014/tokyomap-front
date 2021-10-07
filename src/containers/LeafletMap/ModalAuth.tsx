import ModalAuth from '../../components/LeafletMap/ModalAuth';
import useModal from '../../hooks/leafletMap/useModal';

const EnhancedModalAuth: React.FC = () => {
  const modalRef = useModal();
  return <ModalAuth ref={modalRef} />;
};

export default EnhancedModalAuth;
