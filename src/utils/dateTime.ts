/** @param {string} datetime string in simplified extended ISO format */
export const formatDateTime = (datetime: string): string =>
  datetime.replace('T', ' ').replace(/\.\d{3}Z$/g, '');

export const fetchCurrentDatetime = () =>
  new Date()
    .toLocaleString('en-GB', {
      hour12: false,
      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: 'numeric',
    })
    .replace(',', '');
