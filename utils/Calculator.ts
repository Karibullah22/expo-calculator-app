// Simple safe evaluator for calculator input
export function evaluateExpression(expr: string): number {
  // Replace symbols with JS equivalents
  let sanitized = expr.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-");

  // Handle percentage
  sanitized = sanitized.replace(/(\d+)%/g, "($1/100)");

  // Square root
  sanitized = sanitized.replace(/√(\d+)/g, "Math.sqrt($1)");

  // Square (x²)
  sanitized = sanitized.replace(/(\d+)²/g, "Math.pow($1,2)");

  // eslint-disable-next-line no-eval
  return eval(sanitized);
}
