/*
 * Dollars <-> cents at the PSP boundary.
 *
 * The API carries amounts in cents (the minor unit), the way real PSP APIs do: a 3% fee on
 * whole dollars rounds to zero below $34, and float dollars cannot represent money exactly.
 * The payer still types and reads dollars, so the conversion lives here, at the edge.
 */

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
