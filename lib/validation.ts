import { BorrowerInput } from "./types";

export type FieldErrors = Partial<Record<keyof BorrowerInput, string>>;

// Minimal validation function
export function validateBorrower(i: BorrowerInput): FieldErrors {
  const errors: FieldErrors = {};
  if (!(i.monthlyIncome > 0)) errors.monthlyIncome = "Income must be > 0";
  if (!(i.monthlyDebts >= 0)) errors.monthlyDebts = "Debts must be ≥ 0";
  if (!(i.loanAmount > 0)) errors.loanAmount = "Loan must be > 0";
  if (!(i.propertyValue > 0)) errors.propertyValue = "Value must be > 0";
  if (!(Number.isFinite(i.fico) && i.fico >= 300 && i.fico <= 850)) {
    errors.fico = "FICO must be between 300 and 850";
  }

  return errors;
}

export function hasErrors(e: FieldErrors) {
  return Object.keys(e).length > 0;
}
