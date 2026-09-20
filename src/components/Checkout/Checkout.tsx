import {toDollars} from '../../services/payment/money';
import {Order} from '../../services/payment/paymentApiFactory';

export interface CheckoutForm {
  amount: number;
  number: string;
  expMonth: number;
  expYear: number;
  cvc: string;
}

export interface CheckoutStatus {
  sdkReady: boolean;
  message: string;
  order: Order | null;
  canPay: boolean;
}

export interface CheckoutProps {
  form?: CheckoutForm;
  status?: CheckoutStatus;
  onFormChange?: (patch: Partial<CheckoutForm>) => void;
  onPay?: () => void;
  onDone?: () => void;
}

export const EMPTY_FORM: CheckoutForm = {amount: 0, number: '', expMonth: 0, expYear: 0, cvc: ''};
const EMPTY_STATUS: CheckoutStatus = {sdkReady: false, message: '', order: null, canPay: false};

const payLabel = (sdkReady: boolean, order: Order | null): string => {
  if (!sdkReady) {
    return 'loading SDK…';
  }
  if (order && order.status === 'pending_authorisation') {
    return 'processing…';
  }
  return 'Pay';
};

// the payer is done once the payment is authorised (manual capture) or already captured (automatic)
const isComplete = (order: Order | null): boolean =>
  !!order && (order.status === 'authorised' || order.status === 'captured');

/**
 * Presentational checkout form for the payer, styled after Paidy's own checkout (light ground,
 * white rounded card, pill gradient button, green completion screen). The payer only tokenises
 * and pays; the payment ends at `authorised` (order placed). Capturing the funds is a merchant
 * back-office action done server-side at fulfilment, so it deliberately has no button here.
 */
const Checkout: React.FC<CheckoutProps> = ({
  form = EMPTY_FORM,
  status = EMPTY_STATUS,
  onFormChange = () => {},
  onPay = () => {},
  onDone = () => {},
}) => {
  const {amount, number, expMonth, expYear, cvc} = form;
  const {sdkReady, message, order, canPay} = status;

  // payment complete — the payer's job is done, so show a dedicated completion screen
  if (order && isComplete(order)) {
    return (
      <div className="p-checkout">
        <div className="p-checkout__complete">
          <p className="p-checkout__complete-mark">✓</p>
          <h1 className="p-checkout__complete-title">Payment complete</h1>
          <p className="p-checkout__complete-lead">Your order has been placed.</p>
          <dl className="p-checkout__complete-detail">
            <dt>paymentId</dt>
            <dd>{order.paymentId}</dd>
            <dt>amount</dt>
            <dd>{toDollars(order.amount)} USD</dd>
          </dl>
          <button type="button" className="p-checkout__button" onClick={onDone}>
            Back to Top
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-checkout">
      <header className="p-checkout__header">
        <span className="p-checkout__brand">sudo-paidy</span>
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

export default Checkout;
