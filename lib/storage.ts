import { EvaluationResult } from './types';
const KEY = 'mortages-history';

export function loadHistory(): EvaluationResult[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveToHistory(item: EvaluationResult) {
  if (typeof window === 'undefined') return;
  const prev = loadHistory();
  const next = [item, ...prev].slice(0, 5); // Store only last 5
  localStorage.setItem(KEY, JSON.stringify(next));
}
export function clearHistory() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(KEY);
}