import {useState, useEffect, useCallback, useRef} from 'react';
import {JST_OFFSET_MS} from '../../utils/dateTime';

/**
 * @param {string} disappearAt `yyyy-mm-ddThh:mm:ss.sssZ` where the time value is JST encoded as UTC (fake-UTC, i.e. the backend sets the Z suffix but the value is actually JST)
 */
const useTimer = (disappearAt: string) => {
  /* the callback to calculate the tweet's remaining time to display */
  const getTimeRemaining = useCallback(
    () => {
      const remaining = Math.floor((new Date(disappearAt).getTime() - JST_OFFSET_MS - Date.now()) / 1000);
      return remaining;
    },
    [disappearAt],
  );

  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());
  const timerId = useRef<ReturnType<typeof setTimeout>>(); // memorise the tweet's timer id

  const tick = useCallback(() => {
    setTimeRemaining(getTimeRemaining());
  }, [getTimeRemaining]);

  useEffect(() => {
    timerId.current = setInterval(tick, 1000);
    return () => {
      if (timerId.current) {
        clearInterval(timerId.current);
      }
    };
  }, [tick]);

  return {getTimeRemaining, timeRemaining, tick};
};

export default useTimer;
