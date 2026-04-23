import {forwardRef} from 'react';

const ModalAuth = forwardRef<HTMLDivElement>(({}, ref) => (
  <div
    className="l-modal"
    role="dialog"
    data-modal="modal_auth"
    aria-modal="true"
    aria-hidden="true"
    ref={ref}
  >
    <div className="l-modal__inner">
      <div className="l-modal__inner__content" data-modal-wrapper="modal_auth">
        <div className="c-modal" role="document">
          <div className="c-modal__header">
            <h2>Welcome to Tokyo Map</h2>
            <p className="c-modal__subtitle">Sign in to share your moments</p>
          </div>
          <div className="c-modal__content">
            {/* Sign in with Tallyme */}
            <button
              type="button"
              className="c-modal__select__btn c-modal__select__btn--email"
              onClick={() => {
                window.location.href = `${process.env.DOMAIN!}/api/auth/authorise`;
              }}
            >
              <svg className="c-modal__select__btn__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 8L10.89 13.26C11.5 13.67 12.5 13.67 13.11 13.26L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Sign in with Email</span>
            </button>
            {/* Sign in with Cognito */}
            <button
              type="button"
              className="c-modal__select__btn c-modal__select__btn--cognito u-mt10"
              onClick={() => {
                // provider=cognito
                window.location.href = `${process.env.DOMAIN!}/api/cognito/authorise`;
              }}
            >
              <svg className="c-modal__select__btn__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" fill="currentColor"/>
              </svg>
              <span>Sign in with AWS Cognito</span>
            </button>
          </div>
          <div className="c-modal__select">
            <div
              role="button"
              className="c-modal__select__btn c-modal__select__btn--white"
              data-modal-close="modal_auth"
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

export default ModalAuth;
