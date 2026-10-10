import Modal from './Modal';

interface ModalTweetProps {
  isOpen: boolean;
  onClose: () => void;
  handlePost: () => void;
}

const ModalTweet: React.FC<ModalTweetProps> = ({isOpen, onClose, handlePost}) => {
  // post, then close the modal
  const post = () => {
    handlePost();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="c-modal" role="document">
        <div className="c-modal__header">
          <h2>Share your moment</h2>
        </div>
        <div className="c-modal__content">
          <form>
            <textarea
              id="message"
              name="message"
              placeholder="Share something with the world..."
              aria-label="What's happening?"
            />
          </form>
        </div>
        <div className="c-modal__select">
          <div
            role="button"
            className="c-modal__select__btn"
            onClick={post}
            onKeyDown={post}
            tabIndex={0}
          >
            <span>Post</span>
          </div>
          <div
            role="button"
            className="c-modal__select__btn c-modal__select__btn--white"
            onClick={onClose}
            onKeyDown={onClose}
            tabIndex={0}
          >
            <span>Cancel</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalTweet;
