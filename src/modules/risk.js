/** Synthetic review fixture; no screening or risk scoring is performed. */
export function getDemoComplianceCase() {
  return {
    reference: 'DEMO-CASE-001',
    category: 'customer_due_diligence',
    status: 'awaiting_review',
    evidence: ['synthetic-identity-record', 'synthetic-address-record'],
  };
}
