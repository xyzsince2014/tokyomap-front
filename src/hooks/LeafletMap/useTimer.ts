import {useState, useEffect, useCallback, useRef} from 'react';

import {formatDateTime, fetchCurrentTime} from '../../utils/dateTime';

const useTimer = (disappearAt: string) => {
  // memorise the callback to calculate the tweet's remaining time to display
  const getTimeRemaining = useCallback(
    () =>
      Math.floor(
        (new Date(formatDateTime(disappearAt)).getTime() - fetchCurrentTime().getTime()) / 1000,
      ),
    [disappearAt],
  );

  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());
  const timerId = useRef<NodeJS.Timeout>(); // memorise the tweet's timer id

  const tick = useCallback(() => {
    setTimeRemaining(getTimeRemaining());
  }, [getTimeRemaining]);

  useEffect(() => {
    timerId.current = setInterval(tick, 1000 * 5);
    return () => {
      if (timerId.current) {
        clearInterval(timerId.current);
      }
    };
  }, [tick]);

  return timeRemaining;
};

export default useTimer;
