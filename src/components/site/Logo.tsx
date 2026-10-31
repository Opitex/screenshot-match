export function Logo() {
  return (
    <span className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight">
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden>
        <defs>
          <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--cyan)" />
            <stop offset="0.5" stopColor="var(--primary)" />
            <stop offset="1" stopColor="var(--violet)" />
          </linearGradient>
        </defs>
        <circle cx="16" cy="16" r="12" fill="none" stroke="url(#lg)" strokeWidth="3" />
        <path d="M16 4 L28 16 L16 28 L4 16 Z" fill="none" stroke="url(#lg)" strokeWidth="1.2" opacity="0.7" />
        <circle cx="16" cy="16" r="3" fill="var(--cyan)" />
      </svg>
      Opitex
    </span>
  );
}
