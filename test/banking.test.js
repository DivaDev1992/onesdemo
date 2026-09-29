import test from 'node:test';
import assert from 'node:assert/strict';
import { previewPayment } from '../src/modules/payments.js';
import { getDemoAccount } from '../src/modules/digital-banking.js';

test('payment previews preserve amount and currency without changing the account', () => {
  const before = getDemoAccount();
  for (const currency of ['ARS', 'USD']) {
    assert.deepEqual(previewPayment({ amountMinor: 125000, currency }), {
      amountMinor: 125000, currency, feeMinor: 0, status: 'preview',
    });
  }
  assert.deepEqual(getDemoAccount(), before);
});

test('payment previews reject invalid amounts rather than silently rounding', () => {
  for (const amountMinor of [0, -1, 1.5, NaN, Infinity, '100', undefined, Number.MAX_SAFE_INTEGER + 1]) {
    assert.throws(() => previewPayment({ amountMinor }), RangeError);
  }
  assert.equal(previewPayment({ amountMinor: Number.MAX_SAFE_INTEGER }).amountMinor, Number.MAX_SAFE_INTEGER);
});

test('payment previews reject unsupported currencies', () => {
  assert.throws(() => previewPayment({ amountMinor: 100, currency: 'XYZ' }), RangeError);
});
