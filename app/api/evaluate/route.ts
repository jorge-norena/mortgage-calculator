import { NextRequest, NextResponse } from "next/server";
import { BorrowerInput, EvaluateRequest, EvaluateResponse } from "@/lib/types";
import { calculateDTI, calculateLTV } from "@/lib/calculation";
import { DEFAULT_THRESHOLDS } from "@/lib/thresholds";

// Evaluates borrower input against thresholds to return decision and calculations
function evaluate(input: BorrowerInput) {
  const dti = calculateDTI(input.monthlyDebts, input.monthlyIncome);
  const ltv = calculateLTV(input.loanAmount, input.propertyValue);
  const reasons: string[] = [];

  let decision: "Approve" | "Refer" | "Decline";
  if (
    dti <= DEFAULT_THRESHOLDS.approve.maxDTI &&
    ltv <= DEFAULT_THRESHOLDS.approve.maxLTV &&
    input.fico >= DEFAULT_THRESHOLDS.approve.minFICO
  ) {
    decision = "Approve";
  } else if (
    dti <= DEFAULT_THRESHOLDS.refer.maxDTI &&
    ltv <= DEFAULT_THRESHOLDS.refer.maxLTV &&
    input.fico >= DEFAULT_THRESHOLDS.refer.minFICO
  ) {
    decision = "Refer";
    reasons.push("Needs manual review");
  } else {
    decision = "Decline";
    reasons.push("Failed thresholds");
  }

  return {
    decision,
    dti,
    ltv,
    reasons,
    timestamp: new Date().toISOString(),
    input,
  };
}

export async function GET() {
  return NextResponse.json(
    { error: 'Evaluate route working!!' },
    { status: 405 }
  );
}

// Receives borrower data, evaluates, and returns result or error json
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as EvaluateRequest;

    // Simple validation
    if (
      !body ||
      body.monthlyIncome <= 0 ||
      body.monthlyDebts < 0 ||
      body.loanAmount <= 0 ||
      body.propertyValue <= 0 ||
      body.fico < 300 || //TODO: Use external constant
      body.fico > 850 //TODO: Use external constant
    ) {
      return NextResponse.json<EvaluateResponse>(
        { error: "Invalid data" },
        { status: 400 }
      );
    }

    // All good, evaluate and return
    const result = evaluate(body);
    return NextResponse.json(result, { status: 200 });
  } catch {
    return NextResponse.json<EvaluateResponse>(
      { error: "Malformed request body" },
      { status: 400 }
    );
  }
}
