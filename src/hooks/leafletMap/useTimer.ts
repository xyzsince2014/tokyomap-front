import {useState, useEffect, useCallback, useRef} from 'react';

const useTimer = (disappearAt: string) => {
  /* the callback to calculate the tweet's remaining time to display */
  const getTimeRemaining = useCallback(
    () => {
      const remaining = Math.floor((new Date(disappearAt).getTime() - Date.now()) / 1000)
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
