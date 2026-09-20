import axios from 'axios';

/*
 * Turns a failed payment request into what the payer should read.
 *
 * The PSP answers with RFC 6749-shaped `{error, error_description}`. Two transports reach us:
 * paidy.js rejects with an Error carrying `.status` / `.error`, and the BFF is called through
 * axios, which forwards the PSP body as the response data. Both are normalised here.
 *
 * A declined card never arrives on this path — the authorisation outcome is delivered by webhook
 * and shown from `order.status`. Everything handled here is a failed *request*, so telling the
 * payer to check their card details is wrong for most of these cases.
 */

interface PspErrorShape {
  status?: number;
  code?: string;
}

const GENERIC = 'Payment could not be completed. Please try again.';

/**
 * Pulls the HTTP status and the PSP error code out of whichever error shape we were handed.
 *
 * @param e the caught error
 * @returns the status and PSP error code, where they could be determined
 */
const normalise = (e: unknown): PspErrorShape => {
  if (axios.isAxiosError(e)) {
    const data = e.response?.data as { error?: string } | undefined;
    return { status: e.response?.status, code: data?.error };
  }
  // paidy.js attaches the PSP response to the Error it rejects with
  const fromSdk = e as { status?: number; error?: string };
  return { status: fromSdk?.status, code: fromSdk?.error };
};

/**
 * The payer-facing message for a failed payment request.
 *
 * @param e the caught error
 * @returns a message safe to show the payer
 */
const paymentErrorMessage = (e: unknown): string => {
  const { status, code } = normalise(e);

  // the payer can fix these
  if (code === 'card_expired') {
    return 'Your card has expired. Please use a different card.';
  }
  if (code === 'invalid_request') {
    return 'Please check your card details and try again.';
  }

  // the payer cannot fix these — do not send them back to the card form
  if (code === 'invalid_api_key' || status === 401 || status === 403) {
    return 'Payment is temporarily unavailable. Please try again later.';
  }
  if (code === 'server_error' || (status != null && status >= 500)) {
    return 'Something went wrong on our side. Please try again in a moment.';
  }
  if (status == null) {
    return 'Network error. Please check your connection and try again.';
  }

  return GENERIC;
};

export default paymentErrorMessage;
