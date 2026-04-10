
/**
 * @param {string} datetime string in the form of `yyyy-mm-ddThh:mm:ss.sss` (JST)
 * @returns {string} datetime string in JST in the form of `yyyy/mm/dd hh:mm:ss`
 */
export const formatDateTime = (datetime: string): string => {
  const date = new Date(datetime);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
};

export const fetchCurrentJst = (): Date => new Date();

/**
 * @param {string} datetime JST string
 * @returns {string} time string in JST in the form of `HH:mm`
 */
export const formatTimeJst = (datetime: string): string =>
  new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date(datetime));

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
