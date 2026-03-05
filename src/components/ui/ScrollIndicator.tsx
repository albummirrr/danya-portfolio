export function ScrollIndicator() {
  return (
    <div className="flex flex-col items-center gap-3">
      <span className="font-body text-[10px] tracking-[0.4em] text-white/40">
        SCROLL
      </span>
      <span className="pulse-scroll block text-sm text-white/50">↓</span>
    </div>
  );
}
