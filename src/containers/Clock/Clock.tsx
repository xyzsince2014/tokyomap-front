import * as React from 'react';

import Clock from '../../components/Clock/Clock';
import {fetchCurrentDatetime} from '../../utils/dateTime';

const useClock = () => {
  const [datetime, setTime] = React.useState<string>(fetchCurrentDatetime());

  const tick = () => {
    setTime(fetchCurrentDatetime());
  };

  React.useEffect(() => {
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  return datetime;
};

const ClockContainer: React.FC = () => <Clock datetime={useClock()} />;

export default ClockContainer;
