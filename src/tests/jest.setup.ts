// jsdom does not implement window.alert, so any code that calls it during a test (e.g. the
// geolocation failure path, ModalTweet) logs a noisy "Not implemented" error. Stub it here so
// tests stay quiet; a test that needs to assert on it can still spy with jest.spyOn.
window.alert = jest.fn();
