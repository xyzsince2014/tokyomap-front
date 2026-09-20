import { AxiosResponse } from 'axios';

import axiosInstanceFactory, { ApiConfig } from '../auth/axiosInstanceFactory';

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

const paymentApiFactory = (optionalConfig: ApiConfig = {}) => {
  const axiosInstance = axiosInstanceFactory(optionalConfig);

  /**
   * Fetches what the browser needs to bootstrap paidy.js (script URL + publishable key).
   *
   * @returns the payment config
   */
  const getConfig = async (): Promise<PaymentConfig> => {
    const response: AxiosResponse<PaymentConfig> = await axiosInstance.get('/payments/config', {
      withCredentials: true,
    });
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
  const createOrder = async (token: string, amount: number): Promise<Order> => {
    const response: AxiosResponse<Order> = await axiosInstance.post(
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
  const getOrder = async (paymentId: string): Promise<Order> => {
    const response: AxiosResponse<Order> = await axiosInstance.get(`/payments/${paymentId}`, {
      withCredentials: true,
    });
    return response.data;
  };

  /**
   * Captures an authorised payment — full, or partial when {@link amount} is given.
   *
   * @param paymentId the payment to capture
   * @param amount optional partial amount in cents; omit to capture the full amount
   * @returns the updated order (status captured)
   */
  const capture = async (paymentId: string, amount?: number): Promise<Order> => {
    const response: AxiosResponse<Order> = await axiosInstance.post(
      `/payments/${paymentId}/capture`,
      amount != null ? { amount } : {},
      { withCredentials: true },
    );
    return response.data;
  };

  return { getConfig, createOrder, getOrder, capture };
};

export default paymentApiFactory;
