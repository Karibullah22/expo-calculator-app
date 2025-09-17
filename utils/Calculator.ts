// utils/calculator.ts
// Lightweight, safer parser via controlled string transforms — returns number or throws.

export function evaluateExpression(input: string): number {
  if (typeof input !== "string") throw new Error("Invalid expression");

  let s = input.trim();

  if (s.length === 0) return 0;

  // Normalize common operator characters
  s = s.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-");

  // Remove spaces
  s = s.replace(/\s+/g, "");

  // --- Handle sqrt
  // 1) √( ...  => Math.sqrt( ...
  s = s.replace(/√\s*\(/g, "Math.sqrt(");
  // 2) √NUMBER  => Math.sqrt(NUMBER)
  s = s.replace(/√\s*([0-9]+(?:\.[0-9]+)?)/g, "Math.sqrt($1)");

  // --- Handle square tokens (²)
  // 1) (expr)² => Math.pow((expr), 2)
  //    handle non-nested parentheses (most common use)
  s = s.replace(/\(([^()]+)\)²/g, "Math.pow(($1),2)");
  // 2) number² => Math.pow(number,2)
  s = s.replace(/([0-9]+(?:\.[0-9]+)?)²/g, "Math.pow($1,2)");

  // --- Handle percentage (postfix)
  // number% => (number/100)
  s = s.replace(/([0-9]+(?:\.[0-9]+)?)%/g, "($1/100)");

  // For safety: disallow characters that are not digits, operators, parentheses, dot, Math, pow, sqrt, and commas
  // Allowed letters come from Math, pow, sqrt
  const safePattern = /^[0-9+\-*/().,Mathpowsqrt\s]+$/;
  // However the string contains letters like 'Math' and 'pow' and 'sqrt'. To keep validation simple:
  if (!safePattern.test(s)) {
    // try a slightly more permissive check but still block suspicious tokens
    // disallow letters other than m,a,t,h,p,o,w,s,q,r (letters in "Mathpowsqrt")
    if (/[^0-9+\-*/().,A-Za-z0-9\s]/.test(s)) {
      throw new Error("Invalid characters in expression");
    }
    // disallow usage of suspicious globals like "console", "window", "__", etc.
    const forbidden = [
      "console",
      "window",
      "global",
      "process",
      "__proto__",
      "eval",
      "Function",
    ];
    const lower = s.toLowerCase();
    for (const f of forbidden) {
      if (lower.includes(f.toLowerCase()))
        throw new Error("Invalid expression");
    }
  }

  // At this point s should be mostly numeric JS expression using Math.sqrt and Math.pow.
  // Evaluate using Function constructor (local app, controlled content).
  try {
    // eslint-disable-next-line no-new-func
    const fn = new Function(`return (${s});`);
    const val = fn();
    if (typeof val !== "number" || !isFinite(val))
      throw new Error("Invalid result");
    return val;
  } catch (e) {
    throw new Error("Could not evaluate expression");
  }
}
