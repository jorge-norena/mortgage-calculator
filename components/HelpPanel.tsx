// components/HelpPanel.tsx
'use client';

export default function HelpPanel() {
  return (
    <aside className="card text-white/80">
      <h2 className="text-base font-semibold mb-2">How it works?</h2>
      <p className="text-sm mb-3">
        ENter data to evaluate a mortgage application based on common
        underwriting criteria. The system uses three key metrics:
      </p>
      <ul className="list-disc ml-5 text-sm space-y-1">
        <li><strong>DTI</strong>: Debt-to-Income </li>
        <li><strong>LTV</strong>: Loan-to-Value</li>
        <li><strong>FICO</strong>: Credit Score (Fair Isaac Corporation) (300–850)</li>
      </ul>

      <div className="mt-4 text-sm">
        <p className="mb-1"><strong>Results:</strong></p>
        
      </div>
    </aside>
  );
}
