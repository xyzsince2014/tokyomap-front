import {useContext} from 'react';

import DatetimeContext from '../../providers/datetime/datetime-context';

const Clock: React.FC = () => {
  const {datetime} = useContext(DatetimeContext);
  return <div className="p-clock">{datetime}</div>;
};

export default Clock;
