import getGeolocationFactory from '../../../services/geolocation/getGeolocationFactory';

describe('getGeolocation()', () => {
  const testOptions: PositionOptions = {
    enableHighAccuracy: true,
    timeout: 1000 * 20,
    maximumAge: 1000 * 60,
  };

  const getGeolocation = getGeolocationFactory(testOptions);

  beforeEach(() => {
    Object.assign(navigator, {geolocation: jest.fn()});
  });

  it('should succeed', async () => {
    const mockGeolocation = {
      getCurrentPosition: jest.fn().mockImplementation((success, error) =>
        Promise.resolve(
          success({
            coords: {
              latitude: 10,
              longitude: 10,
            },
          }),
        ),
      ),
    };
    Object.assign(navigator, {geolocation: mockGeolocation});

    const geolocation = await getGeolocation();
    expect(geolocation).toStrictEqual([10, 10]);
  });

  it('should fail', async () => {
    const mockGeolocation = {
      // invoke the error callback only — wrapping it in a rejected promise leaves that promise
      // unhandled, which kills the jest worker on Node >= 15
      getCurrentPosition: jest.fn().mockImplementation((success, error) => error(new Error('failed to get geolocation'))),
    };
    Object.assign(navigator, {geolocation: mockGeolocation});

    await expect(getGeolocation()).rejects.toThrow('failed to get geolocation');
  });
});
