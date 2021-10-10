import {useState, useEffect, useCallback, useRef} from 'react';

/** @param {string} disappearAt "yyyy-mm-dd hh:mm:ss" */
const useTimer = (disappearAt: string) => {
  // memorise the callback to calculate the tweet's remaining time to display
  const getTimeRemaining = useCallback(
    () => Math.floor((new Date(disappearAt).getTime() - new Date().getTime()) / 1000),
    [disappearAt],
  );

  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());
  const timerId = useRef<ReturnType<typeof setTimeout>>(); // memorise the tweet's timer id

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

  return {getTimeRemaining, timeRemaining, tick};
};

export default useTimer;
