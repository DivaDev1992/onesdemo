import { getDemoAccount } from './modules/digital-banking.js';
import { previewPayment } from './modules/payments.js';
import { getDemoLoanApplication } from './modules/lending.js';
import { getDemoComplianceCase } from './modules/risk.js';

console.log(JSON.stringify({
  bank: 'Rio Plata Demo Bank',
  environment: 'demo',
  account: getDemoAccount(),
  payment: previewPayment({ amountMinor: 125000 }),
  loanApplication: getDemoLoanApplication(),
  complianceCase: getDemoComplianceCase(),
}, null, 2));
