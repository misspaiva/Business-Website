import { useReveal } from '@/hooks/useReveal';

interface Area {
  index: string;
  title: string;
  description: string;
}

const AREAS: Area[] = [
  {
    index: '01',
    title: 'Diagnóstico',
    description:
      'Mapeamento de uma semana do uso real de IA no seu time — dados em prompts, segredos no repo, código IA sem rastreio, contaminação de licença. Entrego inventário + matriz de riscos + plano de remediação.',
  },
  {
    index: '02',
    title: 'Política de Uso de IA',
    description:
      'Política escrita em linguagem de engenharia — não jurídica — que o seu time consegue seguir no dia a dia. Regras claras para prompts, código gerado por IA, ferramentas permitidas e fluxo de revisão.',
  },
  {
    index: '03',
    title: 'Ferramenta no CI',
    description:
      'Verificação automatizada no pipeline: segredos, dados pessoais e proveniência de código IA em cada PR. Nada que retire o código do ambiente do cliente — roda dentro do repo.',
  },
  {
    index: '04',
    title: 'Workshop para Devs',
    description:
      '3 horas que mudam como o time usa IA — e o que nunca vai num prompt. Para times que adotaram as ferramentas e querem fazer isso com segurança, sem depender de política que ninguém lê.',
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
      <span className="font-mono text-[11px] tracking-widest text-ink-faint transition-colors duration-500 group-hover:text-accent">
        {area.index}
      </span>
      <h3 className="mt-4 text-lg font-medium tracking-tight text-ink">{area.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-ink-muted text-pretty">
        {area.description}
      </p>
      <span className="mt-6 block h-px w-0 bg-accent transition-all duration-500 ease-precise group-hover:w-full" />
    </li>
  );
}

export function AreasOfExploration() {
  return (
    <section id="exploration" className="border-t border-surface-line py-24 sm:py-32 lg:py-40">
      <div className="container-editorial">
        <div className="flex items-center gap-3">
          <span className="h-px w-6 bg-surface-line" />
          <span className="eyebrow">Três camadas</span>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-x-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10">
          {AREAS.map((area, i) => (
            <AreaCard key={area.index} area={area} delay={i * 0.08} />
          ))}
        </ul>
      </div>
    </section>
  );
}
