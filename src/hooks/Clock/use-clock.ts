import {useState, useEffect} from 'react';

import {fetchCurrentDatetime} from '../../utils/dateTime';

const useClock = () => {
  const [datetime, setDatetime] = useState(fetchCurrentDatetime());

  const tick = () => {
    setDatetime(fetchCurrentDatetime());
  };

  useEffect(() => {
    const timerId = setInterval(tick, 1000);
    return () => clearInterval(timerId);
  }, []);

  return datetime;
};

export default useClock;
