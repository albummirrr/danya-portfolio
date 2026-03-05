const ASCII_PATTERN = `
██████╗  █████╗ ███╗   ██╗██╗   ██╗ █████╗
██╔══██╗██╔══██╗████╗  ██║╚██╗ ██╔╝██╔══██╗
██║  ██║███████║██╔██╗ ██║ ╚████╔╝ ███████║
██║  ██║██╔══██║██║╚██╗██║  ╚██╔╝  ██╔══██║
██████╔╝██║  ██║██║ ╚████║   ██║   ██║  ██║
╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝
`.trim();

export function HeroAscii() {
  return (
    <pre
      className="ascii-art select-none text-[4px] leading-tight opacity-10 sm:text-[6px] md:text-[8px]"
      aria-hidden="true"
    >
      {ASCII_PATTERN}
    </pre>
  );
}
