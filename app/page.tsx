// app/page.tsx
'use client';

import { useState } from 'react';
import AppHeader from '@/components/AppHeader';
import BorrowerForm from '@/components/BorrowerForm';
import HelpPanel from '@/components/HelpPanel';
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
    } catch {
      setErrorMsg('Network or server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen grid place-items-center px-4 border">

      <div className="w-full max-w-5xl border p-3 bg-gray-800 rounded-3xl shadow-4xl">

        <AppHeader />


        <div className="grid gap-6 md:grid-cols-2 pt-5">
          <section className="card">
            <BorrowerForm onSubmit={handleFormSubmit} />

            {loading && <p className="text-sm mt-3 opacity-80">Evaluating…</p>}
            {errorMsg && (
              <p className="text-sm mt-3 text-red-700 border border-red-200 bg-red-50 rounded p-2">
                {errorMsg}
              </p>
            )}
            {/* TODO: Show results IN MODAL */}
            {result && (
              <div className="mt-4 rounded-xl border border-black/10 bg-white p-3">
                <h3 className="font-semibold mb-2">Resultado</h3>
                <div className="text-sm space-y-1">
                  <div><strong>Decision:</strong> {result.decision}</div>
                  <div><strong>DTI:</strong> {result.dti.toFixed(2)}</div>
                  <div><strong>LTV:</strong> {result.ltv.toFixed(2)}</div>
                  {result.reasons.length > 0 && (
                    <ul className="list-disc ml-5">
                      {result.reasons.map((r, i) => <li key={i}>{r}</li>)}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </section>

          <HelpPanel />
        </div>
      </div>
    </main>
  );
}
