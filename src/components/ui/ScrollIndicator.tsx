export function ScrollIndicator() {
  return (
    <div className="flex flex-col items-center gap-2 font-pixel text-[8px] tracking-widest opacity-60">
      <span>SCROLL</span>
      <span className="bounce-down text-base">▼</span>
    </div>
  );
}
