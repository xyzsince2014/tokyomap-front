import {renderHook} from '@testing-library/react-hooks';
import useTimer from '../../../hooks/leafletMap/useTimer';

import {formatDateTime} from '../../../utils/dateTime';

describe('useTimer', () => {
  it('timeRemaining is 5400 sec before the first tick', () => {
    const interval = 1000 * 60 * 90; // milliseconds for 90m
    const timeLag = 1000 * 60 * 60 * 9; // milliseconds for 9h
    // current time + 90 min (JST) in the form of `yyyy-mm-dd hh:mm:ss`
    const disappearAt = formatDateTime(
      new Date(
        new Date(new Date().toLocaleString('en-US', {timeZone: 'Asia/Tokyo'})).getTime() +
          interval +
          timeLag +
          1000, // test processing time
      ).toISOString(),
    );
    const {result} = renderHook(() => useTimer(disappearAt));
    expect(result.current.timeRemaining).toBe(interval / 1000);
  });
});
