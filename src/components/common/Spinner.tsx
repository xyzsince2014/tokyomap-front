import * as React from 'react';
import {ThreeDots} from 'react-loader-spinner';

const Spinner: React.FC = () => (
  <div className="l-spinner">
    <ThreeDots color="#333" />
  </div>
);

export default Spinner;
