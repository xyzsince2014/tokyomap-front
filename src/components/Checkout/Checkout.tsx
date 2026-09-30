import {Order} from '../../services/payment/payment';
import CheckoutComplete from './CheckoutComplete';
import PaymentForm from './PaymentForm';

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

// the payer is done once the payment is authorised (manual capture) or already captured (automatic).
// the `order is Order` return type narrows order to non-null for the branch below.
const isComplete = (order: Order | null): order is Order =>
  !!order && (order.status === 'authorised' || order.status === 'captured');

/**
 * Presentational checkout for the payer: once the payment is complete it shows the completion
 * screen, otherwise the payment form. Both children are dumb views; all state lives in the
 * container. Capturing funds is a merchant back-office action, so the payer never captures here.
 */
const Checkout: React.FC<CheckoutProps> = ({
  form = EMPTY_FORM,
  status = EMPTY_STATUS,
  onFormChange = () => {},
  onPay = () => {},
  onDone = () => {},
}) =>
  isComplete(status.order) ? (
    <CheckoutComplete order={status.order} onDone={onDone} />
  ) : (
    <PaymentForm form={form} status={status} onFormChange={onFormChange} onPay={onPay} />
  );

export default Checkout;
