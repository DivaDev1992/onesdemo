# Rio Plata Demo Bank

A small, runnable banking project for the **ONES Desk + ONES Project** demo.
Use this repository to demonstrate how customer tickets connect to requirements,
bugs, branches, commits and pull requests.

> Fictional bank. Synthetic data only. This project does not process payments,
> authenticate customers or implement production banking controls.

## Product modules

| Module | Example scope | Source |
| --- | --- | --- |
| Digital Banking | Account dashboard and secure messaging | `src/modules/digital-banking.js` |
| Payments & Transfers | Payment previews and transfer tracking | `src/modules/payments.js` |
| Lending & Credit | Loan applications and offer review | `src/modules/lending.js` |
| Risk & Compliance | Review queues and case monitoring | `src/modules/risk.js` |

## Run locally

Requires Node.js 22 or newer. No dependencies or installation step required.

```sh
npm run demo
npm test
```

The demo prints a synthetic account summary, payment preview, loan application
and compliance case. Money uses integer minor units: `125000` represents
ARS 1,250.00. The payment preview never moves funds.

## Repository structure

```text
src/
  demo.js                     # Runnable example
  modules/
    digital-banking.js
    payments.js
    lending.js
    risk.js
test/
  banking.test.js             # Built-in Node.js test runner
.github/workflows/
  ci.yml                      # Tests on pushes and pull requests
```

## Code link demo conventions

Once the ONES GitHub integration is configured, use the relevant issue key in
branch names, commit messages and pull request titles. For example:

```text
Branch: feature/RND-7-secure-message-search
Commit: RND-7 add secure message search
PR:     RND-7 Add a searchable secure message inbox
```

These names are examples only. This bootstrap does not implement or complete
those ONES requirements, and issue keys alone do not configure the integration.
Create actual changes against the matching issue when demonstrating code links.

## Suggested next changes

- Add secure message search and permission checks.
- Add card freeze confirmation and verification flows.
- Add signed payment webhooks with retry history.

Keep real credentials, customer details and production transaction data out of
this repository. Automated tests validate only this demonstration code.
