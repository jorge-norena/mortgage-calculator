"use client";

import { useMemo, useState } from "react";
import { BorrowerInput } from "@/lib/types";

interface BorrowerFormProps {
  onSubmit: (data: BorrowerInput) => void;
}

type FieldErrors = Partial<Record<keyof BorrowerInput, string>>;

export default function BorrowerForm({ onSubmit }: BorrowerFormProps) {
  const [formData, setFormData] = useState<BorrowerInput>({
    monthlyIncome: 0,
    monthlyDebts: 0,
    loanAmount: 0,
    propertyValue: 0,
    fico: 680,
    occupancy: "Residencial",
  });

  const [errors, setErrors] = useState<FieldErrors>({});

  // Basic validation function
  const validate = (i: BorrowerInput): FieldErrors => {
    const e: FieldErrors = {};
    if (!(i.monthlyIncome > 0)) e.monthlyIncome = "Income must be > 0";
    if (!(i.monthlyDebts >= 0)) e.monthlyDebts = "Debts must be ≥ 0";
    if (!(i.loanAmount > 0)) e.loanAmount = "Loan must be > 0";
    if (!(i.propertyValue > 0)) e.propertyValue = "Value must be > 0";
    if (!(Number.isFinite(i.fico) && i.fico >= 300 && i.fico <= 850)) {
      e.fico = "FICO must be between 300 and 850";
    }

    return e;
  };

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const next = {
      ...formData,
      [name]: name === "occupancy" ? value : Number(value),
    } as BorrowerInput;

    setFormData(next);
    // Hot validation
    setErrors(validate(next));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate(formData);
    setErrors(v);
    if (Object.keys(v).length) return;
    onSubmit(formData);
  };

  const inputBase =
    "w-full border rounded px-3 py-2 bg-white/20 text-black placeholder-black/40";
  const invalid = "border-red-500 ring-1 ring-red-400";
  const label = "block text-sm font-medium";
  const help = "text-xs text-red-400 mt-1";

  // const err = (k: keyof BorrowerInput) =>
  //   errors[k] ? <p className={help}>{errors[k]}</p> : null;

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 border bg-gray-700 p-5 rounded-3xl text-white/90"
      noValidate
    >
      <div>
        <label htmlFor="monthlyIncome" className={label}>
          Monthly Income
        </label>
        <input
          id="monthlyIncome"
          type="number"
          name="monthlyIncome"
          inputMode="decimal"
          value={formData.monthlyIncome}
          onChange={handleChange}
          className={`${inputBase} ${
            errors.monthlyIncome ? invalid : "border-white/20"
          }`}
          min={0}
          step="500"
          placeholder="e.g., 10000"
        />
        {errors.monthlyIncome && (
          <p id="income-error" className={help}>
            {errors.monthlyIncome}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="monthlyDebts" className={label}>
          Monthly Debts
        </label>
        <input
          id="monthlyDebts"
          type="number"
          name="monthlyDebts"
          inputMode="decimal"
          value={formData.monthlyDebts}
          onChange={handleChange}
          className={`${inputBase} ${
            errors.monthlyDebts ? invalid : "border-white/20"
          }`}
          min={0}
          step="500"
          placeholder="e.g., 3000"
        />
        {errors.monthlyDebts && (
          <p id="debts-error" className={help}>
            {errors.monthlyDebts}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="loanAmount" className={label}>
          Loan Amount
        </label>
        <input
          id="loanAmount"
          type="number"
          name="loanAmount"
          inputMode="decimal"
          value={formData.loanAmount}
          onChange={handleChange}
          className={`${inputBase} ${
            errors.loanAmount ? invalid : "border-white/20"
          }`}
          min={0}
          step="500"
          placeholder="e.g., 250000"
        />
        {errors.loanAmount && (
          <p id="loan-error" className={help}>
            {errors.loanAmount}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="propertyValue" className={label}>
          Property Value
        </label>
        <input
          id="propertyValue"
          type="number"
          name="propertyValue"
          inputMode="decimal"
          value={formData.propertyValue}
          onChange={handleChange}
          className={`${inputBase} ${
            errors.propertyValue ? invalid : "border-white/20"
          }`}
          min={0}
          step="500"
          placeholder="e.g., 320000"
        />
        {errors.propertyValue && (
          <p id="value-error" className={help}>
            {errors.propertyValue}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="fico" className={label}>
          Credit Score (FICO)
        </label>
        <input
          id="fico"
          type="number"
          name="fico"
          value={formData.fico}
          onChange={handleChange}
          className={`${inputBase} ${
            errors.fico ? invalid : "border-white/20"
          }`}
          min={300}
          max={850}
          step={1}
          placeholder="300–850"
        />
        {errors.fico && (
          <p id="fico-error" className={help}>
            {errors.fico}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="occupancy" className={label}>
          Occupancy Type
        </label>
        <select
          id="occupancy"
          name="occupancy"
          value={formData.occupancy}
          onChange={handleChange}
          className={`${inputBase} ${
            errors.occupancy ? invalid : "border-white/20"
          }`}
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
        className="rounded bg-indigo-600 text-white py-2 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={hasErrors}
      >
        Evaluate
      </button>
    </form>
  );
}
