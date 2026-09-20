import { AxiosError, AxiosResponse } from 'axios';

import paymentErrorMessage from '../../../services/payment/paymentErrorMessage';

/** an error shaped the way paidy.js rejects: a plain Error carrying the PSP response. */
const sdkError = (status: number, error: string): Error => {
  const e = new Error('tokenisation failed') as Error & { status: number; error: string };
  e.status = status;
  e.error = error;
  return e;
};

/** an error shaped the way axios rejects when the BFF forwards the PSP body. */
const bffError = (status: number, error?: string): AxiosError => {
  const e = new AxiosError('request failed');
  e.response = { status, data: error ? { error } : {} } as AxiosResponse;
  return e;
};

describe('paymentErrorMessage', () => {
  it('tells the payer to change card when the card has expired', () => {
    expect(paymentErrorMessage(sdkError(400, 'card_expired'))).toMatch(/expired/i);
  });

  it('tells the payer to check their details on invalid_request', () => {
    expect(paymentErrorMessage(sdkError(400, 'invalid_request'))).toMatch(/card details/i);
  });

  it('does not blame the card when the API key is rejected', () => {
    const message = paymentErrorMessage(sdkError(401, 'invalid_api_key'));
    expect(message).toMatch(/temporarily unavailable/i);
    expect(message).not.toMatch(/card/i);
  });

  it('does not blame the card on a server error', () => {
    const message = paymentErrorMessage(bffError(500, 'server_error'));
    expect(message).toMatch(/our side/i);
    expect(message).not.toMatch(/card/i);
  });

  it('reports a network failure when there is no response at all', () => {
    expect(paymentErrorMessage(new Error('Network Error'))).toMatch(/network/i);
  });

  it('falls back to a generic message for an unmapped status', () => {
    expect(paymentErrorMessage(bffError(418))).toMatch(/could not be completed/i);
  });
});
