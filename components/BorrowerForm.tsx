'use client';

import { useState } from 'react';
import { BorrowerInput } from '@/lib/types';

interface BorrowerFormProps {
  onSubmit: (data: BorrowerInput) => void;
}

export default function BorrowerForm({ onSubmit }: BorrowerFormProps) {
  const [formData, setFormData] = useState<BorrowerInput>({
    monthlyIncome: 0,
    monthlyDebts: 0,
    loanAmount: 0,
    propertyValue: 0,
    fico: 680,
    occupancy: 'Residencial',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'occupancy' ? value : Number(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 max-w-md">
      <div>
        <label className="block text-sm font-medium">Monthly Income</label>
        <input
          type="number"
          name="monthlyIncome"
          value={formData.monthlyIncome}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Monthly Debts</label>
        <input
          type="number"
          name="monthlyDebts"
          value={formData.monthlyDebts}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Loan Amount</label>
        <input
          type="number"
          name="loanAmount"
          value={formData.loanAmount}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Property Value</label>
        <input
          type="number"
          name="propertyValue"
          value={formData.propertyValue}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Credit Score (FICO)</label>
        <input
          type="number"
          name="fico"
          value={formData.fico}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          min={300}
          max={850}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Occupancy Type</label>
        <select
          name="occupancy"
          value={formData.occupancy}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="Residencial">Residencial</option>
          <option value="Business">Business</option>
          <option value="Educational">Educational</option>
          <option value="Industrial">Industrial</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <button
        type="submit"
        className="rounded bg-indigo-600 text-white py-2 hover:bg-indigo-700"
      >
        Evaluate
      </button>
    </form>
  );
}
