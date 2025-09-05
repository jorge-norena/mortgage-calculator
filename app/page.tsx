"use client";

import { useEffect, useState } from "react";
import AppHeader from "@/components/AppHeader";
import BorrowerForm from "@/components/BorrowerForm";
import HelpPanel from "@/components/HelpPanel";
import Credits from "@/components/Credits";
import Modal from "@/components/Modal";
import DecisionBadge from "@/components/Badge";
import HistoryList from "@/components/HistoryList";
import { BorrowerInput, EvaluationResult, EvaluateResponse } from "@/lib/types";
import { loadHistory, saveToHistory, clearHistory } from "@/lib/storage";

export default function HomePage() {
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [history, setHistory] = useState<EvaluationResult[]>([]);

  useEffect(() => {
    // Load history once on mount from localStorage
    setHistory(loadHistory());
    console.log("Loaded history", loadHistory());
  }, []);

  const handleFormSubmit = async (data: BorrowerInput) => {
    setLoading(true);
    setErrorMsg(null);
    setResult(null);
    try {
      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload: EvaluateResponse = await res.json();
      if (!res.ok || "error" in payload) {
        setErrorMsg((payload as any).error ?? "Unable to evaluate");
      } else {
        const r = payload as EvaluationResult;
        setResult(r);
        setOpen(true);
        saveToHistory(r);
        setHistory((prev) => [r, ...prev]); // Update en UI
      }
    } catch {
      setErrorMsg("Network or server error");
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = () => {
    // Confirm before clearing Basic.
    if (!history.length) return;
    const ok = window.confirm('Clear all saved evaluations?');
    if (!ok) return;
    clearHistory();
    setHistory([]);
    // Close the modal just in case
    setOpen(false);
  };

  return (
    <main className="min-h-screen grid place-items-center px-4 border border-amber-500">
      <div className="w-full max-w-5xl border p-3 bg-gray-800 rounded-3xl">
        <AppHeader />
        <div className="grid gap-6 md:grid-cols-2 pt-5">
          <section className="card">
            <BorrowerForm onSubmit={handleFormSubmit} />
            <Credits/>
            {loading && <p className="text-sm mt-3 opacity-80">Evaluating…</p>}
            {errorMsg && (
              <p className="text-sm mt-3 text-red-700 border border-red-200 bg-red-50 rounded p-2">
                {errorMsg}
              </p>
            )}
          </section>

          <div className=" gap-6">
            <HelpPanel />
            <HistoryList
              items={history}
              onSelect={(r) => {
                setResult(r);
                setOpen(true);
              }}
              onClear={handleClearHistory}
            />
          </div>
        </div>
      </div>

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
                <div className="text-base font-semibold">
                  {result.dti.toFixed(2)}
                </div>
              </div>
              <div className="rounded-lg border border-black/10 bg-black/5 px-3 py-2">
                <div className="text-xs opacity-70">LTV</div>
                <div className="text-base font-semibold">
                  {result.ltv.toFixed(2)}
                </div>
              </div>
            </div>
            {result.reasons.length > 0 && (
              <ul className="list-disc ml-5 text-sm">
                {result.reasons.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            )}
            <div className="text-xs opacity-70">
              Evaluated at {new Date(result.timestamp).toLocaleString()}
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
}
