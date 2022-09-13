import * as React from 'react';
import Loader from 'react-loader-spinner';

const Spinner: React.FC = () => (
  <div className="l-spinner">
    <Loader type="ThreeDots" color="#333" />
  </div>
);

export default Spinner;
