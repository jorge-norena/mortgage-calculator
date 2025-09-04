export interface Thresholds {
  approve: { maxDTI: number; maxLTV: number; minFICO: number };
  refer:   { maxDTI: number; maxLTV: number; minFICO: number };
}

// Custom values
export const DEFAULT_THRESHOLDS: Thresholds = {
  approve: { maxDTI: 0.43, maxLTV: 0.80, minFICO: 680 },
  refer:   { maxDTI: 0.50, maxLTV: 0.95, minFICO: 660 },
};
