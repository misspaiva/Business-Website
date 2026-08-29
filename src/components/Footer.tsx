export function Footer() {
  return (
    <footer className="border-t border-surface-line bg-surface">
      <div className="container-editorial py-12">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2 items-center justify-center">
                <span className="absolute h-2 w-2 rounded-full bg-accent" />
                <span className="absolute h-2 w-2 rounded-full bg-accent animate-pulse-soft" />
              </span>
              <span className="font-sans text-[13px] font-semibold tracking-tight text-ink">
                PAIVA INTELLIGENCE
              </span>
            </div>
            <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-ink-muted">
              Artificial intelligence · Computational science · Intelligent systems
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:items-end">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
                <span className="absolute h-1.5 w-1.5 rounded-full bg-emerald-400/60 animate-pulse-soft" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
                System Online
              </span>
            </div>
            <span className="text-[12px] text-ink-faint">
              © 2026 Paiva Intelligence
            </span>
          </div>
        </div>

        <div className="mt-10 h-px w-full bg-surface-line" />
        <div className="mt-6 flex flex-col gap-2 text-[11px] text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono uppercase tracking-widest">
            Independent · Research-driven · Location-independent
          </span>
          <span className="font-mono uppercase tracking-widest">
            Built with precision
          </span>
        </div>
      </div>
    </footer>
  );
}
