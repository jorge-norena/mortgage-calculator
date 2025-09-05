'use client';

import { useState } from 'react';
import AppHeader from '@/components/AppHeader';
import BorrowerForm from '@/components/BorrowerForm';
import HelpPanel from '@/components/HelpPanel';
import Modal from '@/components/Modal';
import DecisionBadge from '@/components/Badge';
import { BorrowerInput, EvaluationResult, EvaluateResponse } from '@/lib/types';

export default function HomePage() {
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [open, setOpen] = useState(false);
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
        setOpen(true); // ⬅️ abrir modal al recibir resultado
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
          </section>

          <HelpPanel />
        </div>
      </div>

      {/* Results Modal */}
      <Modal
        open={open && !!result}
        title="Evaluation Result"
        onClose={() => setOpen(false)}
      >
        {result && (
          <div className="grid gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm opacity-70">Decision</span>
              <DecisionBadge value={result.decision} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-black/10 bg-black/5 px-3 py-2">
                <div className="text-xs opacity-70">DTI</div>
                <div className="text-base font-semibold">{result.dti.toFixed(2)}</div>
              </div>
              <div className="rounded-lg border border-black/10 bg-black/5 px-3 py-2">
                <div className="text-xs opacity-70">LTV</div>
                <div className="text-base font-semibold">{result.ltv.toFixed(2)}</div>
              </div>
            </div>

            {result.reasons.length > 0 && (
              <div className="grid gap-1">
                <div className="text-sm font-medium">Reasons</div>
                <ul className="list-disc ml-5 text-sm">
                  {result.reasons.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="text-xs opacity-70">
              Evaluated at {new Date(result.timestamp).toLocaleString()}
            </div>

            <div className="mt-2 flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="btn"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
}
