const ASCII_FOOTER = `
╔══════════════════════════════════════════╗
║  LET'S BUILD SOMETHING TOGETHER          ║
╚══════════════════════════════════════════╝
`.trim();

const LINKS = [
  { label: "EMAIL", value: "hello@danyamirzoev.com", href: "mailto:hello@danyamirzoev.com" },
  { label: "TELEGRAM", value: "@danyamirzoev", href: "https://t.me/danyamirzoev" },
  { label: "INSTAGRAM", value: "@danyamirzoev", href: "https://instagram.com/danyamirzoev" },
  { label: "BEHANCE", value: "danyamirzoev", href: "https://behance.net/danyamirzoev" },
];

export function Contact() {
  return (
    <section className="px-4 py-24 md:px-8">
      {/* Section label */}
      <p className="mb-16 font-mono-custom text-[10px] tracking-[0.4em] opacity-40">
        [ CONTACT ]
      </p>

      {/* ASCII header */}
      <pre className="ascii-art mb-16 text-[7px] opacity-25 md:text-[9px]" aria-hidden="true">
        {ASCII_FOOTER}
      </pre>

      {/* Links grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
        {LINKS.map(({ label, value, href }) => (
          <a
            key={label}
            href={href}
            className="group flex flex-col gap-2 border-t border-white/10 pt-4 transition-opacity hover:opacity-100"
            rel="noopener noreferrer"
            target={href.startsWith("mailto") ? undefined : "_blank"}
          >
            <span className="font-mono-custom text-[9px] tracking-[0.3em] opacity-40 transition-opacity group-hover:opacity-60">
              {label}
            </span>
            <span className="font-mono-custom text-[10px] tracking-widest opacity-80">
              {value}
            </span>
          </a>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-24 flex items-center justify-between border-t border-white/10 pt-6">
        <p className="font-mono-custom text-[9px] tracking-widest opacity-20">
          © 2026 DANYA MIRZOEV — ALL RIGHTS RESERVED
        </p>
        <p className="font-mono-custom text-[9px] tracking-widest opacity-20">
          DESIGNED & BUILT FROM SCRATCH
        </p>
      </div>
    </section>
  );
}
