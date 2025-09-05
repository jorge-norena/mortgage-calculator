# Mortgage Underwriting – React/TypeScript (Next.js)

A small front-end app that evaluates a mortgage application by calculating **DTI** (Debt-to-Income) and **LTV** (Loan-to-Value) from user inputs and returns a decision: **Approve / Refer / Decline** with reasons.  
Built with **Next.js + TypeScript**, styled with **Tailwind**, using a **Next.js API Route** for the evaluation logic and **localStorage** to persist a simple history.

---

##  What this implements

- Input form: monthly income, monthly debts, loan amount, property value, credit score (FICO), occupancy.
- Calculates **DTI** and **LTV** and returns **Approve / Refer / Decline** with reasons.
- Clean, inline **validation** and user feedback.
- **API integration** via `/api/evaluate` (mock backend inside the app).
- **Results in a modal**, plus a **History** panel persisted in `localStorage`.
- At least **1–2 frontend tests** (Jest + Testing Library).

> Rules used:
> - **Approve** if: DTI ≤ 0.43, LTV ≤ 0.80, FICO ≥ 680  
> - **Refer** if: DTI ≤ 0.50, LTV ≤ 0.95, FICO ≥ 660  
> - **Decline** otherwise

---

## Tech Stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS
- **Forms & Validation:** Custom inline validation (no libraries)
- **API:** Next.js Route Handler (`/app/api/evaluate/route.ts`)
- **State/Persistence:** React state + `localStorage` for history
- **Tests:** Jest + @testing-library/react

---

## Project Structure

```
app/
  page.tsx                # Main page (layout, modal, history wiring)
  api/
    evaluate/
      route.ts            # POST /api/evaluate (runs the rules)
components/
  AppHeader.tsx
  BorrowerForm.tsx        # Form with inline validation
  HelpPanel.tsx
  HistoryList.tsx         # Shows persisted evaluations; clearable
  Modal.tsx               # Accessible modal (Esc & backdrop)
  DecisionBadge.tsx
lib/
  types.ts                # Core types (BorrowerInput, EvaluationResult, etc.)
  calc.ts                 # computeDTI, computeLTV
  thresholds.ts           # Default thresholds (fixed)
  validation.ts           # Simple field validation helpers
  storage.ts              # loadHistory / saveToHistory / clearHistory
tests/
  calc.test.ts            # Unit tests for calc helpers
  BorrowerForm.test.tsx   # Basic validation/submit test
styles/
  globals.css             # Theme vars + light/“dark” background
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm (or pnpm/yarn)

### Install & Run
```bash
npm install
npm run dev
# open http://localhost:3000
```

### Build
```bash
npm run build
npm start
```

---

## Testing

Install (already in devDeps if you followed setup):
```bash
npm i -D jest @types/jest jest-environment-jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom
```

Run tests:
```bash
npm test
# or watch:
npm run test:watch
```

What’s covered:
- `calc.test.ts`: unit tests for `computeDTI` and `computeLTV`
- `BorrowerForm.test.tsx`: validation prevents submit when invalid; submits when valid

---

##  API

### `POST /api/evaluate`
**Request body**
```json
{
  "monthlyIncome": 10000,
  "monthlyDebts": 3000,
  "loanAmount": 200000,
  "propertyValue": 300000,
  "fico": 700,
  "occupancy": "Residencial"
}
```

**Response (200)**
```json
{
  "decision": "Approve",
  "dti": 0.3,
  "ltv": 0.67,
  "reasons": [],
  "timestamp": "2025-09-05T12:34:56.000Z",
  "input": { "monthlyIncome": 10000, "monthlyDebts": 3000, "loanAmount": 200000, "propertyValue": 300000, "fico": 700, "occupancy": "Residencial" }
}
```

**Response (400)**
```json
{ "error": "Invalid payload" }
```

---

## Domain Notes

- **DTI** = `monthlyDebts / monthlyIncome`
- **LTV** = `loanAmount / propertyValue`
- **FICO** range: 300–850

---

##  UI/UX

- Light gray background (CSS vars) and simple card layout.
- Header with logo + title, then two columns:
  - Left: Form + loading/error feedback.
  - Right: Help panel + History list.
- Results display in a **modal** with color-coded decision badge (green/yellow/red).
- History items clickable to reopen result modal.
- “Clear History” button to purge persisted items.

---

## Validation

Constraints applied before calling the API:
- `monthlyIncome > 0`
- `monthlyDebts ≥ 0`
- `loanAmount > 0`
- `propertyValue > 0`
- `300 ≤ fico ≤ 850`
- `occupancy` must be selected

Each field shows a concise error message and the submit button is disabled when invalid.

---

## Implementation Highlights

- **Pure functions** (`lib/calc.ts`, `lib/thresholds.ts`) keep business logic simple & testable.
- **API route** isolates evaluation from UI, matching the “API integration” requirement.
- **LocalStorage** provides a lightweight persistence path for history—no DB needed.

---

## Sample Scenarios

**Approve**
- income: 10000, debts: 3000, loan: 200000, value: 300000, fico: 720 → DTI 0.30, LTV 0.67

**Refer**
- income: 8000, debts: 3800, loan: 260000, value: 280000, fico: 665 → DTI 0.475, LTV 0.93

**Decline**
- income: 6000, debts: 4000, loan: 290000, value: 300000, fico: 640 → DTI 0.67, LTV 0.97

---

## Deployment

- Works out of the box on **Vercel**.
- No environment variables required (thresholds are fixed in code).

---

## Assumptions & Trade-offs

- Thresholds are **fixed** in code to keep things simple (no env/config UI).
- No accessibility audit beyond keyboard/esc close in modal and basic labels.
- Validation is minimalistic (no schema lib) to match the “simple” constraint.
- Persistence via `localStorage` (fits the brief, avoids DB complexity).

---

