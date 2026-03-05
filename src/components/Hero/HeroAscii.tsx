/* Deterministic ░▒▓ grid — no Math.random(), so SSR and client match */

const COLS = 120;
const ROWS = 38;

function buildPattern(): string {
  const lines: string[] = [];
  for (let r = 0; r < ROWS; r++) {
    let row = "";
    for (let c = 0; c < COLS; c++) {
      // sine-wave field for natural density variation
      const v = (Math.sin(r * 0.52 + c * 0.31) * Math.cos(r * 0.17 - c * 0.43) + 1) / 2;
      if (v < 0.08) row += "▓";
      else if (v < 0.18) row += "▒";
      else if (v < 0.30) row += "░";
      else row += " ";
    }
    lines.push(row);
  }
  return lines.join("\n");
}

const PATTERN = buildPattern();

export function HeroAscii() {
  return (
    <pre
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 select-none overflow-hidden font-['Courier_New',monospace] text-[11px] leading-[1.35] text-white opacity-[0.07]"
    >
      {PATTERN}
    </pre>
  );
}
