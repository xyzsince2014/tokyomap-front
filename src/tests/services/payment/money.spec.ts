import {toCents, toDollars} from '../../../services/payment/money';

describe('toCents', () => {
  it('converts whole dollars', () => {
    expect(toCents(3)).toBe(300);
  });

  it('converts dollars with cents', () => {
    expect(toCents(19.99)).toBe(1999);
  });

  it('rounds away binary float error', () => {
    // 1.1 * 100 is 110.00000000000001 in IEEE 754
    expect(toCents(1.1)).toBe(110);
    expect(toCents(8.2)).toBe(820);
  });

  it('keeps one cent representable', () => {
    expect(toCents(0.01)).toBe(1);
  });
});

describe('toDollars', () => {
  it('always shows 2 decimals', () => {
    expect(toDollars(300)).toBe('3.00');
    expect(toDollars(1999)).toBe('19.99');
    expect(toDollars(5)).toBe('0.05');
  });
});
