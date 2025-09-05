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
      <hr className="my-4" />
      <div className="mt-4 text-sm">
        <h2 className="mb-1"><strong>Candidate:</strong></h2>
        <p>Jorge Norena G.</p>
        <ul className="list-disc ml-5 text-sm space-y-1">
        <li><a className="text-indigo-200 hover:text-indigo-500" target="_blank" href="https://jorgenorena.com">https://jorgenorena.com</a> </li>
        <li><a className="text-indigo-200 hover:text-indigo-500" target="_blank" href="https://github.com/jorge-norena">https://github.com/jorge-norena</a></li>
        <li><a className="text-indigo-200 hover:text-indigo-500"  target="_blank" href="https://www.linkedin.com/in/jorge-norena-full-stack/">LinkedIn Profile</a></li>
      </ul>
      </div>
    </aside>
  );
}
