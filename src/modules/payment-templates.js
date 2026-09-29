// Synthetic demo only: drafts never execute a payment.
export function saveSupplierTemplate({ name, beneficiary, currency, reference }) {
  for (const value of [name, beneficiary, reference]) {
    if (typeof value !== 'string' || !value.trim()) {
      throw new TypeError('Template name, beneficiary and reference are required');
    }
  }
  if (!['ARS', 'USD'].includes(currency)) throw new RangeError('Unsupported currency');
  return Object.freeze({ name: name.trim(), beneficiary: beneficiary.trim(), currency, reference: reference.trim() });
}

export function prepareSupplierPayment(template, amountMinor) {
  if (!Number.isSafeInteger(amountMinor) || amountMinor <= 0) {
    throw new RangeError('Amount must be a positive integer in minor units');
  }
  return { ...saveSupplierTemplate(template), amountMinor, status: 'draft' };
}

export function submitDemoPayment(draft) {
  const validated = prepareSupplierPayment(draft, draft.amountMinor);
  return Object.freeze({ ...validated, status: 'submitted-demo', fundsMoved: false });
}
