import {useCallback, useEffect, useState} from 'react';

import Context from './datetime-context';
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

  return <Context.Provider value={{datetime}}>{children}</Context.Provider>;
};

export default DatetimeProvider;
