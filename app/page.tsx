'use client';

import { useState } from 'react';
import BorrowerForm from '@/components/BorrowerForm';
import { BorrowerInput, EvaluationResult } from '@/lib/types';
import { evaluate } from '@/lib/calculationRules';

export default function HomePage() {
  const [result, setResult] = useState<EvaluationResult | null>(null);

  const handleFormSubmit = (data: BorrowerInput) => {
    const evaluation = evaluate(data); // Use rules to evaluate
    setResult(evaluation);
  };

  return (
    <main className="p-6 max-w-3xl mx-auto grid gap-6">
      <h1 className="text-2xl font-bold">Mortgage Underwriting Form</h1>

      <BorrowerForm onSubmit={handleFormSubmit} />

      {result && (
        <div className="p-4 border rounded-lg">
          <h2 className="font-semibold mb-2">Evaluation Result:</h2>
          <p><strong>Decision:</strong> {result.decision}</p>
          <p><strong>DTI:</strong> {result.dti.toFixed(2)}</p>
          <p><strong>LTV:</strong> {result.ltv.toFixed(2)}</p>
          {result.reasons.length > 0 && (
            <ul className="list-disc ml-5">
              {result.reasons.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          )}
        </div>
      )}
    </main>
  );
}
