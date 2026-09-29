import test from 'node:test';
import assert from 'node:assert/strict';
import { saveSupplierTemplate, prepareSupplierPayment, submitDemoPayment } from '../src/modules/payment-templates.js';

const supplier = { name: 'Monthly office supplies', beneficiary: 'DEMO-SUPPLIER-001', currency: 'ARS', reference: 'Office supplies' };

test('save a named template and reuse it for different payment amounts', () => {
  const template = saveSupplierTemplate(supplier);
  assert.equal(template.beneficiary, 'DEMO-SUPPLIER-001');
  assert.equal(prepareSupplierPayment(template, 125000).amountMinor, 125000);
  assert.equal(prepareSupplierPayment(template, 150000).amountMinor, 150000);
  assert.equal(template.amountMinor, undefined);
});

test('operator can review and edit amount before demo submission', () => {
  const draft = prepareSupplierPayment(supplier, 125000);
  draft.amountMinor = 130000;
  const submitted = submitDemoPayment(draft);
  assert.equal(submitted.amountMinor, 130000);
  assert.equal(submitted.status, 'submitted-demo');
  assert.equal(submitted.fundsMoved, false);
});

test('template edits and draft edits do not change submitted payments', () => {
  const template = saveSupplierTemplate(supplier);
  const draft = prepareSupplierPayment(template, 125000);
  const submitted = submitDemoPayment(draft);
  const updated = saveSupplierTemplate({ ...template, reference: 'Next month' });
  draft.amountMinor = 99900;
  assert.equal(updated.reference, 'Next month');
  assert.equal(submitted.reference, 'Office supplies');
  assert.equal(submitted.amountMinor, 125000);
  assert.ok(Object.isFrozen(submitted));
});

test('reject invalid templates and revalidate edited amounts at submission', () => {
  assert.throws(() => saveSupplierTemplate({ ...supplier, name: ' ' }));
  assert.throws(() => saveSupplierTemplate({ ...supplier, currency: 'INVALID' }));
  for (const amount of [0, -1, 1.5, NaN, Number.MAX_SAFE_INTEGER + 1]) {
    assert.throws(() => prepareSupplierPayment(supplier, amount));
    assert.throws(() => submitDemoPayment({ ...supplier, amountMinor: amount }));
  }
});
