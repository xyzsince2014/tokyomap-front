/**
 * Console.error only in development.
 *
 * @param message
 * @param error
 */
export const logError = (message: string, error?: unknown): void => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.error(message, error);
  }
};
