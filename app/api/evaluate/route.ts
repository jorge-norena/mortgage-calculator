import { NextRequest, NextResponse } from "next/server";
import { EvaluateRequest, EvaluateResponse } from "@/lib/types";
import { evaluate } from "@/lib/rules";

// Disallow GET
export async function GET() {
  return NextResponse.json(
    { error: "Evaluate route working!!" },
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
