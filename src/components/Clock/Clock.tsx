import {useContext} from 'react';

import DatetimeContext from '../../providers/datetime/datetimeContext';

const Clock: React.FC = () => {
  const {datetime} = useContext(DatetimeContext);
  return <div className="p-clock">{datetime}</div>;
};

export default Clock;
