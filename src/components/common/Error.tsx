import React from 'react';

const ErrorPage: React.FC = () => (
  <section className="p-error">
    <div className="p-error__container">
      <div className="p-error__icon">⚠️</div>
      <h1 className="p-error__title">Sync Failed</h1>
      <p className="p-error__message">
        An error occurred while synchronizing with the server.<br />
        Your session may have expired or the service is temporarily unavailable.
      </p>
      <div className="p-error__btn-group">
        <a href="/" className="p-error__btn p-error__btn--primary">
          Back to Map
        </a>
        <button
          type="button"
          className="p-error__btn p-error__btn--secondary"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    </div>
  </section>
);

export default ErrorPage;
