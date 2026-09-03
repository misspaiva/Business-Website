import { ArrowUpRight } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

export function About() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="border-t border-surface-line py-24 sm:py-32 lg:py-40">
      <div className="container-editorial">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-6 bg-surface-line" />
              <span className="eyebrow">Fundadora</span>
            </div>
            <h2 className="heading-display mt-5 text-2xl font-medium tracking-tighter text-ink sm:text-3xl">
              Sauanna Paiva
            </h2>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              <a href="https://www.linkedin.com/in/sauannapaiva" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-[12px] font-medium text-ink-muted transition-colors hover:text-ink">
                LinkedIn
                <ArrowUpRight size={12} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a href="https://github.com/misspaiva" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-[12px] font-medium text-ink-muted transition-colors hover:text-ink">
                GitHub
                <ArrowUpRight size={12} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          <div ref={ref} className={`lg:col-span-8 ${visible ? 'animate-fade-up' : 'opacity-0'}`}>
            <p className="max-w-prose text-lg leading-relaxed text-ink-soft text-pretty">
              Minha formação começou em linguagem e educação. A tecnologia veio depois, por uma trajetória autodidata orientada por projetos, sistemas reais e pesquisa aplicada.
            </p>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink-soft text-pretty">
              Hoje construo na interseção entre inteligência artificial, segurança, soberania digital e setor público. Meu interesse central é como o Brasil pode deixar de ser apenas consumidor de infraestrutura estrangeira e desenvolver capacidade própria de avaliar, proteger e operar tecnologia crítica.
            </p>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink-soft text-pretty">
              A PAIVA nasce dessa direção: pequenos sistemas verificáveis primeiro, evidência antes de escala e uma visão de longo prazo para infraestrutura tecnológica brasileira.
            </p>

            <div className="mt-10 grid gap-8 border-t border-surface-line pt-8 sm:grid-cols-3">
              <div>
                <span className="eyebrow">Base</span>
                <p className="mt-2 text-sm text-ink-soft">Brasília, DF</p>
              </div>
              <div>
                <span className="eyebrow">Estrutura</span>
                <p className="mt-2 text-sm text-ink-soft">Empresa independente · R&amp;D</p>
              </div>
              <div>
                <span className="eyebrow">Direção</span>
                <p className="mt-2 text-sm text-ink-soft">Segurança · Soberania · Governo · IA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
