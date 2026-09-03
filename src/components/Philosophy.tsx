import { useReveal } from '@/hooks/useReveal';

export function Philosophy() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="visao" className="border-t border-surface-line py-24 sm:py-32 lg:py-40">
      <div className="container-editorial">
        <div ref={ref} className={`max-w-4xl ${visible ? 'animate-fade-up' : 'opacity-0'}`}>
          <div className="flex items-center gap-3">
            <span className="h-px w-6 bg-surface-line" />
            <span className="eyebrow">Visão</span>
          </div>

          <blockquote className="heading-display mt-8 text-2xl font-medium leading-snug tracking-tighter text-ink sm:text-3xl lg:text-[2.75rem] text-balance">
            O Brasil não precisa apenas consumir infraestrutura tecnológica estrangeira.
            Precisa construir capacidade própria para avaliar, proteger e operar sistemas digitais
            no seu próprio contexto.
          </blockquote>

          <div className="mt-10 h-px w-16 bg-surface-line" />

          <p className="mt-8 max-w-prose text-base leading-relaxed text-ink-muted text-pretty sm:text-lg">
            A PAIVA trabalha na interseção entre inteligência artificial, segurança, dados públicos,
            soberania digital e tecnologia para governo. Nosso foco é transformar necessidades
            brasileiras em infraestrutura, ferramentas e métodos que possam ser testados, auditados
            e utilizados no mundo real.
          </p>
        </div>
      </div>
    </section>
  );
}
