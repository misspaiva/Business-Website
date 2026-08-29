import { useReveal } from '@/hooks/useReveal';

interface Area {
  index: string;
  title: string;
  description: string;
}

const AREAS: Area[] = [
  {
    index: '01',
    title: 'Artificial Intelligence',
    description:
      'Machine intelligence, reasoning systems, AI-assisted software, and emerging computational methods.',
  },
  {
    index: '02',
    title: 'Computational Science',
    description:
      'Mathematical modeling, simulation, algorithms, and computational approaches to complex problems.',
  },
  {
    index: '03',
    title: 'Intelligent Systems',
    description:
      'Systems designed to observe, adapt, organize information, and support complex decision-making.',
  },
  {
    index: '04',
    title: 'Experimental Technology',
    description:
      'Prototypes, interfaces, tools, and unconventional applications of emerging technology.',
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
          <span className="eyebrow">Areas of Exploration</span>
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
