import {Order} from '../../services/payment/payment';
import type {CheckoutForm, CheckoutStatus} from './Checkout';

export interface PaymentFormProps {
  form: CheckoutForm;
  status: CheckoutStatus;
  onFormChange: (patch: Partial<CheckoutForm>) => void;
  onPay: () => void;
}

const payLabel = (sdkReady: boolean, order: Order | null): string => {
  if (!sdkReady) {
    return 'loading SDK…';
  }
  if (order && order.status === 'pending_authorisation') {
    return 'processing…';
  }
  return 'Pay';
};

/**
 * The payer's card form: amount + card fields, the Pay button, and the in-flight/declined notices.
 */
const PaymentForm: React.FC<PaymentFormProps> = ({form, status, onFormChange, onPay}) => {
  const {amount, number, expMonth, expYear, cvc} = form;
  const {sdkReady, message, order, canPay} = status;

  return (
    <div className="p-checkout">
      <header className="p-checkout__header">
        <span className="p-checkout__brand">pseudo-paidy</span>
        <span className="p-checkout__tagline">Secure checkout</span>
      </header>

      <div className="p-checkout__card">
        <label className="p-checkout__field" htmlFor="checkout-amount">
          Amount
          <span className="p-checkout__amount">
            <span className="p-checkout__currency" aria-hidden="true">
              $
            </span>
            <input
              id="checkout-amount"
              className="p-checkout__input"
              type="number"
              min={0.01}
              step={0.01}
              placeholder="0.00"
              value={amount}
              onChange={e => onFormChange({amount: Number(e.target.value)})}
            />
          </span>
        </label>
        <label className="p-checkout__field" htmlFor="checkout-number">
          Card number
          <input
            id="checkout-number"
            className="p-checkout__input"
            inputMode="numeric"
            value={number}
            onChange={e => onFormChange({number: e.target.value.replace(/\s/g, '')})}
          />
        </label>
        <div className="p-checkout__row">
          <label className="p-checkout__field" htmlFor="checkout-exp-month">
            Exp month
            <input
              id="checkout-exp-month"
              className="p-checkout__input"
              type="number"
              value={expMonth}
              onChange={e => onFormChange({expMonth: Number(e.target.value)})}
            />
          </label>
          <label className="p-checkout__field" htmlFor="checkout-exp-year">
            Exp year
            <input
              id="checkout-exp-year"
              className="p-checkout__input"
              type="number"
              value={expYear}
              onChange={e => onFormChange({expYear: Number(e.target.value)})}
            />
          </label>
          <label className="p-checkout__field" htmlFor="checkout-cvc">
            CVC
            <input
              id="checkout-cvc"
              className="p-checkout__input"
              value={cvc}
              onChange={e => onFormChange({cvc: e.target.value})}
            />
          </label>
        </div>
      </div>

      <button type="button" className="p-checkout__button" onClick={onPay} disabled={!canPay}>
        {payLabel(sdkReady, order)}
      </button>

      {order && (
        <div className="p-checkout__result">
          <div>
            <strong>paymentId:</strong> {order.paymentId}
          </div>
          <div>
            <strong>status:</strong> {order.status}
          </div>
          {order.status === 'pending_authorisation' && (
            <p className="p-checkout__message">authorising…</p>
          )}
          {order.status === 'declined' && (
            <p className="p-checkout__done p-checkout__done--declined">✗ Payment declined.</p>
          )}
        </div>
      )}

      {message && <p className="p-checkout__message">{message}</p>}
    </div>
  );
};

export default PaymentForm;
