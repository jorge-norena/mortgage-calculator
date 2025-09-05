import { calculateDTI, calculateLTV } from '@/lib/calculation';

// Tests for calculation helpers
describe('calc helpers', () => {
  test('calculateDTI divides debts by income', () => {
    expect(calculateDTI(3000, 10000)).toBeCloseTo(0.3);
  });
  
  test('calculateDTI returns Infinity when income <= 0', () => {
    expect(calculateDTI(1000, 0)).toBe(Infinity);
  });

  test('calculateLTV divides loan by value', () => {
    expect(calculateLTV(200000, 300000)).toBeCloseTo(0.666666, 3);
  });


  test('calculateLTV returns Infinity when propertyValue <= 0', () => {
    expect(calculateLTV(100000, 0)).toBe(Infinity);
  });
});
