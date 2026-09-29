/** Preview only. No funds are moved. */
export function previewPayment({ amountMinor, currency = 'ARS' }) {
  if (!Number.isSafeInteger(amountMinor) || amountMinor <= 0) {
    throw new RangeError('Amount must be a positive safe integer in minor units.');
  }
  if (!['ARS', 'USD'].includes(currency)) {
    throw new RangeError('Supported demo currencies are ARS and USD.');
  }
  return { amountMinor, currency, feeMinor: 0, status: 'preview' };
}
