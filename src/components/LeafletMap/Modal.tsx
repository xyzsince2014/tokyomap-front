import {useEffect} from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

/**
 * Renders the overlay and toggles visibility via aria-hidden, locks page scroll while open, and closes on an overlay click.
 */
const Modal: React.FC<ModalProps> = ({isOpen, onClose, children}) => {
  // lock page scroll while the modal is open; restore it on close / unmount
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  return (
    <div className="l-modal" role="dialog" aria-modal="true" aria-hidden={!isOpen}>
      <div className="l-modal__inner">
        {/* clicking the overlay itself closes the modal */}
        <div
          className="l-modal__inner__content"
          role="presentation"
          onClick={e => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
