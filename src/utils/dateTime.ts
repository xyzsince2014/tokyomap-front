/**
 * @param {string} datetime string in the form of `yyyy-mm-ddThh:mm:ss.sssZ`
 * @returns {string} datetime string in the form of `yyyy/mm/dd hh:mm:ss`
 */
export const formatDateTime = (datetime: string): string =>
  datetime
    .replace(/-/g, '/')
    .replace(/T/g, ' ')
    .replace(/\.\d{3}Z$/g, '');

/**
 * @returns {Date} the current time in jst in the form of `yyyy-mm-ddThh:mm:ss.sssZ`
 */
export const fetchCurrentJst = (): Date => {
  const localUnixTime = Date.now(); // msec
  const jstTimelag = 9 * 60; // jst timelag from utc in min
  const timezoneOffset = new Date().getTimezoneOffset(); // @utc → 0, @jst → -540(min)
  const clientTimelagFromJst = (timezoneOffset + jstTimelag) * 60 * 1000; // msec
  return new Date(localUnixTime + clientTimelagFromJst);
};

/**
 * @returns {string} the current time string in the form of `1 Jan 12:00`
 */
export const fetchCurrentDatetimeJst = (): string =>
  fetchCurrentJst()
    .toLocaleString('en-GB', {
      hour12: false,
      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: 'numeric',
    })
    .replace(',', '');
