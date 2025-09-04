import { BorrowerInput, EvaluationResult } from './types';
import { calculateDTI, calculateLTV } from './calculation';
import { DEFAULT_THRESHOLDS } from './thresholds';

// Evaluates borrower input against thresholds to return decision and calculations
export function evaluate(input: BorrowerInput): EvaluationResult {
  const dti = calculateDTI(input.monthlyDebts, input.monthlyIncome);
  const ltv = calculateLTV(input.loanAmount, input.propertyValue);
  const reasons: string[] = [];

  let decision: 'Approve' | 'Refer' | 'Decline';

  
  if (
    dti <= DEFAULT_THRESHOLDS.approve.maxDTI &&
    ltv <= DEFAULT_THRESHOLDS.approve.maxLTV &&
    input.fico >= DEFAULT_THRESHOLDS.approve.minFICO
  ) {
    decision = 'Approve';
  } else if (
    dti <= DEFAULT_THRESHOLDS.refer.maxDTI &&
    ltv <= DEFAULT_THRESHOLDS.refer.maxLTV &&
    input.fico >= DEFAULT_THRESHOLDS.refer.minFICO
  ) {
    decision = 'Refer';
    reasons.push('Needs manual review');
  } else {
    decision = 'Decline';
    reasons.push('Failed thresholds');
  }

  return {
    decision,
    dti,
    ltv,
    reasons,
    timestamp: new Date().toISOString(),
    input,
  };
}
