import {toDollars} from '../../utils/money';
import {Order} from '../../services/payment/payment';

export interface CheckoutCompleteProps {
  order: Order;
  onDone?: () => void;
}

/**
 * The post-payment screen: a green check, the order summary, and a way back to the top.
 */
const CheckoutComplete: React.FC<CheckoutCompleteProps> = ({order, onDone = () => {}}) => (
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

export default CheckoutComplete;
