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
          <div className="c-modal__content">
            <form>
              <ul>
                <li>
                  <textarea id="message" placeholder="message" />
                </li>
              </ul>
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
              className="c-modal__select__btn c-modal__select__btn--gray-dark"
              data-modal-close="modal_tweet"
              tabIndex={0}
            >
              <span>Close</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
));

export default ModalTweet;
