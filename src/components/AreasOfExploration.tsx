import { useReveal } from '@/hooks/useReveal';

interface Area {
  index: string;
  title: string;
  description: string;
  tag: string;
}

const AREAS: Area[] = [
  {
    index: '01',
    title: 'Avaliação de IA',
    tag: 'EVALUATION',
    description:
      'Benchmarks e métodos de avaliação para medir factualidade, alucinação, aderência ao contexto brasileiro, robustez linguística e riscos em aplicações críticas.',
  },
  {
    index: '02',
    title: 'Segurança & Privacidade',
    tag: 'SECURITY',
    description:
      'Ferramentas determinísticas e verificáveis para identificar dados pessoais, segredos, riscos de exposição e problemas de governança diretamente no fluxo de desenvolvimento.',
  },
  {
    index: '03',
    title: 'Infraestrutura Pública',
    tag: 'PUBLIC DATA',
    description:
      'Camadas de acesso e abstração sobre dados públicos brasileiros para tornar sistemas governamentais, pesquisa e aplicações institucionais mais interoperáveis.',
  },
  {
    index: '04',
    title: 'Tecnologia para Governo',
    tag: 'GOVTECH',
    description:
      'Pesquisa e desenvolvimento de sistemas voltados a políticas públicas, conformidade, processos administrativos e uso responsável de IA em contextos institucionais.',
  },
];

function AreaCard({ area, delay }: { area: Area; delay: number }) {
  const { ref, visible } = useReveal<HTMLLIElement>();
  return (
    <li
      ref={ref}
      className={`group relative border-t border-surface-line pt-6 transition-all duration-700 ease-precise ${
        visible ? 'animate-fade-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-[11px] tracking-widest text-ink-faint transition-colors duration-500 group-hover:text-accent">
          {area.index}
        </span>
        <span className="font-mono text-[10px] tracking-widest text-ink-faint">{area.tag}</span>
      </div>
      <h3 className="mt-4 text-lg font-medium tracking-tight text-ink">{area.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-ink-muted text-pretty">{area.description}</p>
      <span className="mt-6 block h-px w-0 bg-accent transition-all duration-500 ease-precise group-hover:w-full" />
    </li>
  );
}

export function AreasOfExploration() {
  return (
    <section id="atuacao" className="border-t border-surface-line py-24 sm:py-32 lg:py-40">
      <div className="container-editorial">
        <div className="flex items-center gap-3">
          <span className="h-px w-6 bg-surface-line" />
          <span className="eyebrow">Áreas de atuação</span>
        </div>

        <h2 className="heading-display mt-5 max-w-3xl text-3xl sm:text-4xl lg:text-5xl text-balance">
          Construindo as camadas de confiança que faltam à tecnologia brasileira.
        </h2>

        <ul className="mt-14 grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10">
          {AREAS.map((area, i) => (
            <AreaCard key={area.index} area={area} delay={i * 0.08} />
          ))}
        </ul>
      </div>
    </section>
  );
}
