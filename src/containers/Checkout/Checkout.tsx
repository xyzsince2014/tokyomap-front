import {useCallback, useEffect, useState} from 'react';
import {useNavigate} from 'react-router';

import Checkout, {CheckoutForm, EMPTY_FORM} from '../../components/Checkout/Checkout';
import loadPaidy from '../../services/payment/paidyLoader';
import {logError} from '../../utils/devLog';
import {toCents} from '../../utils/money';
import paymentErrorMessage from '../../utils/paymentErrorMessage';
import {getConfig, getOrder, createOrder, Order} from '../../services/payment/payment';

/*
 * Checkout container — owns all state and side effects for the PSP flow:
 *   1. load paidy.js (URL + publishable key come from the BFF)
 *   2. tokenise the card in the browser (card number never hits our BFF)
 *   3. create a payment via the BFF (server-to-server, secret key)
 *   4. poll for the async authorisation outcome (delivered to the BFF by webhook)
 *   5. show the completion screen once the payment is authorised/captured
 * Capturing funds is a merchant back-office action (POST /payments/:id/capture), not the payer's.
 * The presentational form lives in components/Checkout.
 */
const EnhancedCheckout: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<CheckoutForm>(EMPTY_FORM);
  const [sdkReady, setSdkReady] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string>('');

  const onFormChange = useCallback(
    (patch: Partial<CheckoutForm>) => setForm(current => ({...current, ...patch})),
    [],
  );

  /**
   * Loads and configures paidy.js on mount (URL + publishable key fetched from the BFF).
   */
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const cfg = await getConfig();
        await loadPaidy(cfg.paidyJsUrl, cfg.publishableKey);
        if (!cancelled) {
          setSdkReady(true);
        }
      } catch (e) {
        if (!cancelled) {
          setMessage('failed to initialise the payment SDK');
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  /**
   * While the payment is authorising, polls the BFF for the webhook-driven outcome.
   */
  useEffect(() => {
    if (!order || order.status !== 'pending_authorisation') {
      return undefined;
    }
    const timer = setInterval(() => {
      void (async () => {
        try {
          const latest = await getOrder(order.paymentId);
          setOrder(latest);
        } catch {
          /* keep polling */
        }
      })();
    }, 1000);
    return () => clearInterval(timer);
  }, [order]);

  /**
   * Tokenises the card in the browser, then creates the payment via the BFF.
   */
  const onPay = useCallback(async () => {
    if (!window.Paidy) {
      return;
    }
    setBusy(true);
    setMessage('');
    setOrder(null);
    try {
      const {number, expMonth, expYear, cvc, amount} = form;
      const token = await window.Paidy.tokenize({number, expMonth, expYear, cvc});
      // the payer types dollars; the API carries cents
      const created = await createOrder(token.tokenId, toCents(amount));
      setOrder(created);
    } catch (e) {
      logError('checkout payment failed', e);
      setMessage(paymentErrorMessage(e));
    } finally {
      setBusy(false);
    }
  }, [form]);

  /**
   * Leaves the completed checkout for the index (map) page.
   */
  const onDone = useCallback(() => navigate('/'), [navigate]);

  // a payment is in flight (authorising) or already placed (authorised) — block re-paying;
  // only a declined payment can be retried
  const settledOrInFlight = !!order && order.status !== 'declined';

  const status = {
    sdkReady,
    message,
    order,
    // amount is dollars as typed by the payer, minimum one cent
    canPay: sdkReady && !busy && !settledOrInFlight && toCents(form.amount) >= 1,
  };

  return (
    <Checkout
      form={form}
      status={status}
      onFormChange={onFormChange}
      onPay={onPay}
      onDone={onDone}
    />
  );
};

export default EnhancedCheckout;
