import ModalAuth from '../../components/LeafletMap/ModalAuth';
import useModal from '../../hooks/LeafletMap/use-modal';

const ModalAuthContainer: React.FC = () => {
  const modalRef = useModal();
  return <ModalAuth ref={modalRef} />;
};

export default ModalAuthContainer;
