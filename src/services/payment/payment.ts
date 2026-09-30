import { AxiosResponse } from 'axios';

import axiosFactory from '../axiosFactory';

export interface PaymentConfig {
  paidyJsUrl: string;
  publishableKey: string;
}

export interface Order {
  paymentId: string;
  amount: number;
  status: string;
  capturedAmount: number | null;
  updatedAt: string;
}

// one shared axios instance for all payment calls
const axios = axiosFactory({});

/**
 * Fetches what the browser needs to bootstrap paidy.js (script URL + publishable key).
 *
 * @returns the payment config
 */
export const getConfig = async (): Promise<PaymentConfig> => {
  const response: AxiosResponse<PaymentConfig> = await axios.get(
    '/payments/config',
    { withCredentials: true }
  );
  return response.data;
};

/**
 * Creates a payment from a browser-issued token. The BFF returns immediately; the
 * authorisation outcome arrives asynchronously (poll {@link getOrder} for it).
 *
 * @param token the opaque token from paidy.js
 * @param amount the amount to charge, in cents (the minor unit)
 * @returns the created order (status pending_authorisation)
 */
export const createOrder = async (token: string, amount: number): Promise<Order> => {
  const response: AxiosResponse<Order> = await axios.post(
    '/payments',
    { token, amount },
    { withCredentials: true },
  );
  return response.data;
};

/**
 * The merchant's current view of a payment (status kept current by the webhook).
 *
 * @param paymentId the payment to look up
 * @returns the order
 */
export const getOrder = async (paymentId: string): Promise<Order> => {
  const response: AxiosResponse<Order> = await axios.get(
    `/payments/${paymentId}`,
    { withCredentials: true }
  );
  return response.data;
};

/**
 * Captures an authorised payment — full, or partial when {@link amount} is given.
 * (Merchant/back-office API; the payer checkout does not call it.)
 *
 * @param paymentId the payment to capture
 * @param amount optional partial amount in cents; omit to capture the full amount
 * @returns the updated order (status captured)
 */
export const capture = async (paymentId: string, amount?: number): Promise<Order> => {
  const response: AxiosResponse<Order> = await axios.post(
    `/payments/${paymentId}/capture`,
    amount != null ? { amount } : {},
    { withCredentials: true }
  );
  return response.data;
};
