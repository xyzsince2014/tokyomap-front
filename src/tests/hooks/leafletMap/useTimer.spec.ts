import {renderHook} from '@testing-library/react-hooks';
import useTimer from '../../../hooks/leafletMap/useTimer';

describe('useTimer', () => {
  it('timeRemaining is 5400 sec before the first tick', () => {
    const duration = 1000 * 60 * 90; // msec for 90min
    const jstTimelagFromUtc = 1000 * 60 * 60 * 9; // msec for 9h

    // the current time in JST + 90 min in the form of `yyyy-mm-ddThh:mm:ss.sssZ`
    const disappearAt = new Date(
      // add 1000 to adjust test processing time
      new Date().getTime() + duration + jstTimelagFromUtc + 1000,
    ).toISOString();

    const {result} = renderHook(() => useTimer(disappearAt));
    expect(result.current.timeRemaining).toBe(duration / 1000);
  });
});
