/** Synthetic application fixture; not a lending decision. */
export function getDemoLoanApplication() {
  return {
    reference: 'DEMO-LOAN-104',
    requestedAmountMinor: 500000000,
    currency: 'ARS',
    termMonths: 24,
    status: 'manual_review',
  };
}
