import {useCallback, useEffect, useState} from 'react';

import DatetimeContext from './datetimeContext';
import {fetchCurrentDatetimeJst} from '../../utils/dateTime';

const DatetimeProvider: React.FC = ({children}) => {
  const [datetime, setDatetime] = useState(fetchCurrentDatetimeJst());

  const tick = useCallback(() => {
    setDatetime(fetchCurrentDatetimeJst());
  }, []);

  useEffect(() => {
    const timerId = setInterval(tick, 1000);
    return () => clearInterval(timerId);
  }, [tick]);

  return <DatetimeContext.Provider value={{datetime}}>{children}</DatetimeContext.Provider>;
};

export default DatetimeProvider;
