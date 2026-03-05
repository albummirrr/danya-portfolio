export function ScrollIndicator() {
  return (
    <div className="flex flex-col items-center gap-3">
      <span
        className="font-mono-custom text-[9px] tracking-[0.4em] opacity-40"
      >
        SCROLL
      </span>
      <span className="pulse-scroll block text-sm opacity-60">↓</span>
    </div>
  );
}
