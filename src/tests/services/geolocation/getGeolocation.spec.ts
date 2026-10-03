import getGeolocation from '../../../services/geolocation/getGeolocation';

describe('getGeolocation()', () => {
  const testOptions: PositionOptions = {
    enableHighAccuracy: true,
    timeout: 1000 * 20,
    maximumAge: 1000 * 60,
  };

  // typed stubs so the mock callbacks are not `any` (keeps no-unsafe-* happy)
  const positionAt = (latitude: number, longitude: number): GeolocationPosition =>
    ({coords: {latitude, longitude}}) as GeolocationPosition;
  const geolocationError = (): GeolocationPositionError =>
    ({code: 1, message: 'failed to get geolocation'}) as unknown as GeolocationPositionError;

  beforeEach(() => {
    Object.assign(navigator, {geolocation: jest.fn()});
  });

  it('should succeed', async () => {
    const mockGeolocation = {
      getCurrentPosition: jest
        .fn()
        .mockImplementation((success: PositionCallback) => success(positionAt(10, 10))),
    };
    Object.assign(navigator, {geolocation: mockGeolocation});

    const geolocation = await getGeolocation(testOptions);
    expect(geolocation).toStrictEqual([10, 10]);
  });

  it('uses the default options when none are given', async () => {
    const mockGeolocation = {
      getCurrentPosition: jest
        .fn()
        .mockImplementation((success: PositionCallback) => success(positionAt(10, 10))),
    };
    Object.assign(navigator, {geolocation: mockGeolocation});

    const geolocation = await getGeolocation();
    expect(geolocation).toStrictEqual([10, 10]);
  });

  it('should fail', async () => {
    const mockGeolocation = {
      // invoke the error callback only — wrapping it in a rejected promise leaves that promise
      // unhandled, which kills the jest worker on Node >= 15
      getCurrentPosition: jest
        .fn()
        .mockImplementation((_success: PositionCallback, error: PositionErrorCallback) =>
          error(geolocationError()),
        ),
    };
    Object.assign(navigator, {geolocation: mockGeolocation});

    await expect(getGeolocation(testOptions)).rejects.toThrow('failed to get geolocation');
  });
});
