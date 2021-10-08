import {useCallback, useEffect, useState} from 'react';

import DatetimeContext from './datetimeContext';
import {fetchCurrentDatetime} from '../../utils/dateTime';

const DatetimeProvider: React.FC = ({children}) => {
  const [datetime, setDatetime] = useState(fetchCurrentDatetime());

  const tick = useCallback(() => {
    setDatetime(fetchCurrentDatetime());
  }, []);

  useEffect(() => {
    const timerId = setInterval(tick, 1000);
    return () => clearInterval(timerId);
  }, [tick]);

  return <DatetimeContext.Provider value={{datetime}}>{children}</DatetimeContext.Provider>;
};

export default DatetimeProvider;
