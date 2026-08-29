import { ArrowUpRight } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

interface Entry {
  title: string;
  description: string;
  tag: string;
}

const ENTRIES: Entry[] = [
  {
    title: 'Intelligence as Architecture',
    description:
      'Exploring intelligence as a property of systems rather than simply a model capability.',
    tag: 'Theory',
  },
  {
    title: 'Memory & Computation',
    description:
      'Investigating how computational systems can represent, retrieve, and reason over longitudinal information.',
    tag: 'Research',
  },
  {
    title: 'Human–Machine Systems',
    description:
      'Exploring the boundary between human cognition, software, and adaptive computational environments.',
    tag: 'Systems',
  },
];

function ResearchEntry({ entry, index }: { entry: Entry; index: number }) {
  const { ref, visible } = useReveal<HTMLLIElement>();
  return (
    <li
      ref={ref}
      className={`group relative border-t border-surface-line py-8 transition-all duration-700 ease-precise ${
        visible ? 'animate-fade-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <a href="#contact" className="block">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <span className="font-mono text-[11px] uppercase tracking-widest text-ink-faint">
              {entry.tag} · {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-3 text-lg font-medium tracking-tight text-ink transition-colors duration-300 group-hover:text-ink sm:text-xl">
              {entry.title}
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted text-pretty">
              {entry.description}
            </p>
          </div>
          <ArrowUpRight
            size={16}
            strokeWidth={1.5}
            className="mt-1 shrink-0 text-ink-faint transition-all duration-300 ease-precise group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
          />
        </div>
      </a>
    </li>
  );
}

export function Research() {
  return (
    <section id="research" className="border-t border-surface-line py-24 sm:py-32 lg:py-40">
      <div className="container-editorial">
        <div className="flex items-center gap-3">
          <span className="h-px w-6 bg-surface-line" />
          <span className="eyebrow">Research / Thinking</span>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <h2 className="heading-display text-2xl font-medium tracking-tighter text-ink sm:text-3xl text-balance">
              Notes on intelligence, computation, and systems.
            </h2>
          </div>
          <div className="lg:col-span-8">
            <ul>
              {ENTRIES.map((entry, i) => (
                <ResearchEntry key={entry.title} entry={entry} index={i} />
              ))}
              <li className="border-t border-surface-line" />
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
