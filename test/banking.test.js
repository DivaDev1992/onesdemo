import test from 'node:test';
import assert from 'node:assert/strict';
import { previewPayment } from '../src/modules/payments.js';
import { getDemoAccount } from '../src/modules/digital-banking.js';

test('payment previews preserve amount and currency without changing the account', () => {
  const before = getDemoAccount();
  for (const currency of ['ARS', 'USD']) {
    assert.deepEqual(previewPayment({ amountMinor: 125000, currency }), {
      amountMinor: 125000, currency, feeMinor: 1250, status: 'preview',
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

for (const currency of ['ARS', 'USD']) {
  test(`payment previews round the 1% fee up for ${currency}`, () => {
    for (const [amountMinor, feeMinor] of [
      [1, 1], [99, 1], [100, 1], [101, 2], [125000, 1250],
      [Number.MAX_SAFE_INTEGER, 90071992547410],
    ]) {
      assert.deepEqual(previewPayment({ amountMinor, currency }), {
        amountMinor, currency, feeMinor, status: 'preview',
      });
    }
  });
}

test('payment previews default to ARS and apply the fee', () => {
  assert.deepEqual(previewPayment({ amountMinor: 101 }), {
    amountMinor: 101, currency: 'ARS', feeMinor: 2, status: 'preview',
  });
});
