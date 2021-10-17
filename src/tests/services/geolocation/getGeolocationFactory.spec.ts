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
      getCurrentPosition: jest
        .fn()
        .mockImplementation((success, error) =>
          Promise.reject(error(new Error('failed to get geolocation'))),
        ),
    };
    Object.assign(navigator, {geolocation: mockGeolocation});

    try {
      void (await getGeolocation());
    } catch (err) {
      expect(err).toStrictEqual(Error('failed to get geolocation'));
    }
  });
});
