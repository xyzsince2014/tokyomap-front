import {renderHook} from '@testing-library/react-hooks';
import useTimer from '../../../hooks/leafletMap/useTimer';

describe('useTimer', () => {
  it('timeRemaining is 5400 sec before the first tick', () => {
    const duration = 1000 * 60 * 90; // msec for 90min

    // 90 min from now, as `yyyy-mm-ddThh:mm:ss.sssZ`. Both getTime() and toISOString() work in
    // absolute time, and so does useTimer — there is no local-time conversion to compensate for.
    // add 1000 to absorb the test's own processing time
    const disappearAt = new Date(new Date().getTime() + duration + 1000).toISOString();

    const {result} = renderHook(() => useTimer(disappearAt));
    expect(result.current.timeRemaining).toBe(duration / 1000);
  });
});
