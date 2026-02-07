/**
 * @param {string} datetime string in the form of `yyyy-mm-ddThh:mm:ss.sssZ`
 * @returns {string} datetime string in JST in the form of `yyyy/mm/dd hh:mm:ss`
 */
export const formatDateTime = (datetime: string): string => {
  const date = new Date(datetime);
  const jstOffset = 9 * 60 * 60 * 1000; // 9 hours in milliseconds
  const jstDate = new Date(date.getTime() + jstOffset);

  const year = jstDate.getUTCFullYear();
  const month = String(jstDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(jstDate.getUTCDate()).padStart(2, '0');
  const hours = String(jstDate.getUTCHours()).padStart(2, '0');
  const minutes = String(jstDate.getUTCMinutes()).padStart(2, '0');
  const seconds = String(jstDate.getUTCSeconds()).padStart(2, '0');

  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
};

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
