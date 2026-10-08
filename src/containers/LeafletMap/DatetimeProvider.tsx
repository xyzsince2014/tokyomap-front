import {useCallback, useEffect, useState} from 'react';

import DatetimeContext from './datetimeContext';
import {fetchCurrentDatetimeJst} from '../../utils/dateTime';

const DatetimeProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  /* local state */
  // useState(initialValue) returns [value, setter]; setter() updates the value and re-renders.
  const [datetime, setDatetime] = useState(fetchCurrentDatetimeJst());

  // useCallback(function, dependencies) caches the function until the dependencies change
  const tick = useCallback(() => {
    setDatetime(fetchCurrentDatetimeJst());
  }, []);

  // tick the clock every second while mounted
  useEffect(() => {
      const timerId = setInterval(tick, 1000);
      return () => clearInterval(timerId); // clear the timer on unmount
    },
    [tick] // the effect uses tick, so re-run if tick changes (runs once as tick is stable)
  );

  return <DatetimeContext.Provider value={{datetime}}>{children}</DatetimeContext.Provider>;
};

export default DatetimeProvider;
