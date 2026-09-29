/** Synthetic fixture only; not an authenticated account lookup. */
export function getDemoAccount() {
  return {
    id: 'DEMO-ACCOUNT-001',
    holder: 'Rio Plata Demo Customer',
    currency: 'ARS',
    balanceMinor: 12500000,
    status: 'active',
  };
}
