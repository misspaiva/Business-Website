import { ArrowUpRight } from 'lucide-react';

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
              <span className="font-sans text-[13px] font-semibold tracking-[0.08em] text-ink">PAIVA</span>
            </div>
            <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-ink-muted">
              Tecnologia brasileira para sistemas digitais seguros, confiáveis e soberanos.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:items-end">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
                <span className="absolute h-1.5 w-1.5 rounded-full bg-emerald-400/60 animate-pulse-soft" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">Brasília, DF</span>
            </div>
            <a href="mailto:hello@paivaintelligence.org" className="text-[12px] text-ink-soft transition-colors hover:text-ink">hello@paivaintelligence.org</a>
            <div className="flex items-center gap-5">
              <a href="https://www.linkedin.com/in/sauannapaiva" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1 text-[11px] text-ink-muted transition-colors hover:text-ink">
                LinkedIn <ArrowUpRight size={11} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a href="https://github.com/misspaiva" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1 text-[11px] text-ink-muted transition-colors hover:text-ink">
                GitHub <ArrowUpRight size={11} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 h-px w-full bg-surface-line" />
        <div className="mt-6 flex flex-col gap-2 text-[11px] text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono uppercase tracking-widest">© 2026 Paiva Intelligence · Brasília, DF</span>
          <span className="font-mono uppercase tracking-widest">Segurança · Soberania · Governo · IA</span>
        </div>
      </div>
    </footer>
  );
}
