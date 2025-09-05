'use client';

import { useState } from 'react';
import BorrowerForm from '@/components/BorrowerForm';
import { BorrowerInput, EvaluationResult, EvaluateResponse } from '@/lib/types';

export default function HomePage() {
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFormSubmit = async (data: BorrowerInput) => {
    setLoading(true);
    setErrorMsg(null);
    setResult(null);

    try {
      const res = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });

      const payload: EvaluateResponse = await res.json();

      if (!res.ok || 'error' in payload) {
        setErrorMsg((payload as any).error ?? 'Unable to evaluate');
      } else {
        setResult(payload as EvaluationResult);
      }
    } catch (e) {
      setErrorMsg('Network or server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 max-w-3xl mx-auto grid gap-6 border">
      <h1 className="text-2xl font-bold">Mortgage Underwriting</h1>

      <BorrowerForm onSubmit={handleFormSubmit} />

      {loading && <div className="text-sm opacity-80">Evaluating...</div>}
      {errorMsg && (
        <div className="p-3 border border-red-300 text-red-700 rounded">
          {errorMsg}
        </div>
      )}

      {result && (
        <div className="p-4 border rounded-lg">
          <h2 className="font-semibold mb-2">Evaluation Result</h2>
          <p><strong>Decision:</strong> {result.decision}</p>
          <p><strong>DTI:</strong> {result.dti.toFixed(2)}</p>
          <p><strong>LTV:</strong> {result.ltv.toFixed(2)}</p>
          {result.reasons.length > 0 && (
            <ul className="list-disc ml-5">
              {result.reasons.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          )}
          <div className="text-xs opacity-70 mt-2">
            Evaluated at {new Date(result.timestamp).toLocaleString()}
          </div>
        </div>
      )}
    </main>
  );
}
