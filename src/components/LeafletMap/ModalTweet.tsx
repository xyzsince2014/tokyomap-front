import {forwardRef} from 'react';

interface ModalTweetProps {
  handlePost: () => void;
}

const ModalTweet = forwardRef<HTMLDivElement, ModalTweetProps>(({handlePost}, modalRef) => (
  <div
    className="l-modal"
    role="dialog"
    data-modal="modal_tweet"
    aria-modal="true"
    aria-hidden="true"
    ref={modalRef}
  >
    <div className="l-modal__inner">
      <div className="l-modal__inner__content" data-modal-wrapper="modal_tweet">
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
              data-modal-jump="modal_tweet"
              onClick={handlePost}
              onKeyDown={handlePost}
              tabIndex={0}
            >
              <span>Post</span>
            </div>
            <div
              role="button"
              className="c-modal__select__btn c-modal__select__btn--white"
              data-modal-close="modal_tweet"
              tabIndex={0}
            >
              <span>Cancel</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
));

export default ModalTweet;
