const DIVIDER_CHARS =
  "▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░▓░";

export function AsciiDivider() {
  return (
    <div className="overflow-hidden py-2 px-4 md:px-8">
      <p className="ascii-art text-[8px] md:text-[10px] tracking-widest">
        {DIVIDER_CHARS}
      </p>
    </div>
  );
}
