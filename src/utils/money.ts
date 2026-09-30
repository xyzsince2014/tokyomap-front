/**
 * Converts the dollars the payer typed into the cents the API expects.
 *
 * @param dollars the amount in dollars, e.g. 19.99
 * @returns the amount in whole cents, e.g. 1999
 */
export const toCents = (dollars: number): number => Math.round(dollars * 100);

/**
 * Formats an API amount for display.
 *
 * @param cents the amount in cents, e.g. 1999
 * @returns the amount in dollars, always with 2 decimals, e.g. '19.99'
 */
export const toDollars = (cents: number): string => (cents / 100).toFixed(2);
