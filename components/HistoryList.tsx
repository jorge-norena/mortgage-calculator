"use client";

import { EvaluationResult } from "@/lib/types";

export default function HistoryList({
  items,
  onSelect,
  onClear,
}: {
  items: EvaluationResult[];
  onSelect: (r: EvaluationResult) => void;
  onClear: () => void;
}) {
  const disabled = items.length === 0;
  return (
    <aside className="rounded-2xl border border-black/10 bg-white/80 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold mb-2">History</h3>
        <button
          type="button"
          onClick={onClear}
          disabled={disabled}
          className={`text-xs rounded px-2 py-1 border transition
            ${
              disabled
                ? "opacity-40 cursor-not-allowed border-black/10"
                : "hover:text-red-700 hover:border-red-300 border-black/20"
            }`}
          aria-disabled={disabled}
          aria-label="Clear history list"
          title="Clear History"
        >
          Clear History
        </button>
      </div>
      {disabled && (
        <p className="text-sm opacity-70">No history yet.</p>
      )}

      <ul className="grid gap-2">
        {items.map((r, i) => (
          <li
            key={r.timestamp + i}
            className="rounded-lg border border-black/10 px-3 py-2 bg-black/5 hover:bg-black/10 cursor-pointer"
            onClick={() => onSelect(r)}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{r.decision}</span>
              <span className="text-xs opacity-70">
                {new Date(r.timestamp).toLocaleString()}
              </span>
            </div>
            <div className="text-xs opacity-80">
              DTI {r.dti.toFixed(2)} • LTV {r.ltv.toFixed(2)} • FICO{" "}
              {r.input.fico}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
