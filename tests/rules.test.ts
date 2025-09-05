import { evaluate } from '@/lib/rules';
import { BorrowerInput } from '@/lib/types';


// Tests for rules
const base: BorrowerInput = {
  monthlyIncome: 10000,
  monthlyDebts: 3000,
  loanAmount: 200000,
  propertyValue: 300000,
  fico: 700,
  occupancy: 'Residencial',
};

describe('underwriting rules', () => {
  test('Approve path', () => {
    const r = evaluate({ ...base, monthlyDebts: 3500, loanAmount: 200000, propertyValue: 300000, fico: 720 });
    expect(r.decision).toBe('Approve'); // Expected DTI ~0.35, LTV ~0.67, FICO 720
  });

  test('Refer path', () => {
    const r = evaluate({ ...base, monthlyIncome: 8000, monthlyDebts: 3800, loanAmount: 260000, propertyValue: 280000, fico: 665 });
    expect(r.decision).toBe('Refer');   // Expec DTI ~0.475, LTV ~0.93, FICO 665
  });

  test('Decline path', () => {
    const r = evaluate({ ...base, monthlyIncome: 6000, monthlyDebts: 4000, loanAmount: 290000, propertyValue: 300000, fico: 640 });
    expect(r.decision).toBe('Decline'); // Fail limits.
  });
});
