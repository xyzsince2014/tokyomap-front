import {forwardRef} from 'react';

import TwitterLogo from '../../assets/images/icons/logo_tw.png';
// import FacebookLogo from '../../assets/images/icons/logo_fb.png';
import LineLogo from '../../assets/images/icons/logo_line.png';
import EmailLogo from '../../assets/images/icons/logo_email.png';

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
        <div className="c-modal c-modal--transparent" role="document">
          <div className="c-modal__content">
            <ul className="p-modal-auth">
              <li className="p-modal-auth__btn p-modal-auth__btn--twitter" key={1}>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    window.location.href = `${process.env.DOMAIN_API!}/auth/twitter`;
                  }}
                  className="p-modal-auth__btn__inner"
                >
                  <img src={TwitterLogo} alt="Sign in with Twitter" />
                  <span>Sign in with Twitter</span>
                </div>
              </li>
              {/* <li className="p-modal-auth__btn p-modal-auth__btn--facebook" key={2}>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    window.location.href = `${process.env.DOMAIN_API!}/auth/facebook`;
                  }}
                  className="p-modal-auth__btn__inner"
                >
                  <img src={FacebookLogo} alt="Sign in with Facebook" />
                  <span>Sign in with Facebook</span>
                </div>
              </li> */}
              <li className="p-modal-auth__btn p-modal-auth__btn--line" key={3}>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    window.location.href = `${process.env.DOMAIN_API!}/auth/line`;
                  }}
                  className="p-modal-auth__btn__inner"
                >
                  <img src={LineLogo} alt="Sign in with Line" />
                  <span>Sign in with Line</span>
                </div>
              </li>
              <li className="p-modal-auth__btn p-modal-auth__btn--email" key={4}>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    window.location.href = `${process.env.DOMAIN_API!}/auth/authorise`;
                  }}
                  className="p-modal-auth__btn__inner"
                >
                  <img src={EmailLogo} alt="Sign in with email" />
                  <span>Sign in with email</span>
                </div>
              </li>
            </ul>
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
