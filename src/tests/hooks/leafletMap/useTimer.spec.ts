import {renderHook, act} from '@testing-library/react';
import useTimer from '../../../hooks/leafletMap/useTimer';

// fake timers freeze the clock so the assertions are exact instead of racing the real wall-clock.
describe('useTimer', () => {
  const duration = 1000 * 60 * 90; // 90 min in msec
  const now = new Date('2026-01-01T00:00:00.000Z');

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(now);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('timeRemaining is the full duration before the first tick', () => {
    // disappears 90 min from the (frozen) now
    const disappearAt = new Date(now.getTime() + duration).toISOString();

    const {result} = renderHook(() => useTimer(disappearAt));
    expect(result.current.timeRemaining).toBe(duration / 1000); // 5400 sec
  });

  it('tick recomputes the remaining time against the current clock', () => {
    const disappearAt = new Date(now.getTime() + duration).toISOString();
    const {result} = renderHook(() => useTimer(disappearAt));

    // advance the frozen clock by 60s, then tick: remaining should drop by exactly 60s
    act(() => {
      jest.setSystemTime(new Date(now.getTime() + 1000 * 60));
      result.current.tick();
    });

    expect(result.current.timeRemaining).toBe(duration / 1000 - 60); // 5340 sec
  });
});
