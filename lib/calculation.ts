// Calculates Debt-to-Income (DTI) and Loan-to-Value (LTV)

export function calculateDTI(monthlyDebts: number, monthlyIncome: number): number {
  if (monthlyIncome <= 0) return Infinity; // Avoid division by zero
  return monthlyDebts / monthlyIncome; // DTI Formula: monthlyDebts / monthlyIncome
}


export function calculateLTV(loanAmount: number, propertyValue: number): number {
  if (propertyValue <= 0) return Infinity; // Avoid division by zero
  return loanAmount / propertyValue; // LTV Formula: loanAmount / propertyValue
}
