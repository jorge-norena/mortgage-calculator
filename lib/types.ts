// --- Domain Types for the Underwriting Challenge ---

export type OccupancyType =
  | "Residencial"
  | "Business"
  | "Educational"
  | "Industrial"
  | "Other";

export interface BorrowerInput {
  monthlyIncome: number; // > 0
  monthlyDebts: number; // >= 0
  loanAmount: number; // > 0
  propertyValue: number; // > 0
  fico: number; // 300..850
  occupancy: OccupancyType;
}

export interface Calculations {
  // Debt-to-Income ratio = monthlyDebts / monthlyIncome
  dti: number;
  // Loan-to-Value ratio = loanAmount / propertyValue
  ltv: number;
}

export type Decision = "Approve" | "Refer" | "Decline";

export interface EvaluationResult extends Calculations {
  decision: Decision;
  reasons: string[];
  timestamp: string;
  input: BorrowerInput;
}

// For API requests/responses
export type EvaluateRequest = BorrowerInput;
export type EvaluateResponse = EvaluationResult | { error: string };
