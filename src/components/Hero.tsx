import { BrasiliaField } from '@/components/BrasiliaField';
>>>>>>> 8849f31 (Site completo: home, lab, recurso, contato e nav)
export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-surface">
      {/* Brasília: fundo absoluto, dona do show */}
      <div className="absolute inset-0">
        <BrasiliaField />
      </div>
      {/* Véu escuro à esquerda para o texto respirar */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#0a0a0b_25%,transparent_60%)]" />
      {/* Véu nas bordas */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,#0a0a0b_95%)]" />
<div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-6 pt-24">
        <div className="mt-auto max-w-2xl pb-32">
          <p
            className="font-mono text-xs tracking-[0.3em] text-[#d0bcff] animate-fade-in"
          >
            FOUNDER
          </p>
>>>>>>> 8849f31 (Site completo: home, lab, recurso, contato e nav)

          <h1
            className="heading-display mt-6 animate-fade-up text-5xl tracking-[0.08em] text-ink sm:text-6xl lg:text-7xl"
            style={{ animationDelay: '0.12s' }}
          >
              SAUANNA PAIVA
          </h1>

          <p
            className="mt-6 max-w-md text-lg leading-relaxed text-ink-muted text-pretty animate-fade-up"
            style={{ animationDelay: '0.28s' }}
          >
           Baseada em Brasília, onde a regulação de IA do Brasil está sendo escrita: ANPD, PL 2338, TCU.
          </p>
>>>>>>> 8849f31 (Site completo: home, lab, recurso, contato e nav)

          <p
            className="mt-12 font-mono text-xs tracking-widest text-ink-faint animate-fade-in"
            style={{ animationDelay: '0.45s' }}
          >
            LAT -15.79 / LON -47.88 — BRASÍLIA, DF
          </p>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-fade-in"
        style={{ animationDelay: '0.7s' }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] tracking-widest text-ink-faint">
            SCROLL
          </span>
          <div className="h-10 w-px bg-gradient-to-b from-[#7c3aed] to-transparent" />
        </div>
      </div>
    </section>
  );
}

// Re-export para manter o import no App.tsx funcionando
import { ComputationalField } from '@/components/ComputationalField';
