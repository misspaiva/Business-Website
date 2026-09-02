import { ArrowUpRight } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

// Projects
interface Project {
  name: string;
  category: string;
  description: string;
}

const PROJECTS: Project[] = [
  {
    name: 'Paiva Computational Lab',
    category: 'Research & Development',
    description:
      'Computational Research · Artificial Intelligence · Experimental Systems. The research and development environment within Paiva Intelligence, focused on artificial intelligence, computational science, intelligent systems, and experimental software.',
  },
];

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const { ref, visible } = useReveal<HTMLLIElement>();
  return (
    <li
      ref={ref}
      className={`group relative transition-all duration-700 ease-precise ${
        visible ? 'animate-fade-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <a
        href="#contact"
        className="flex items-center gap-6 border-t border-surface-line py-7 transition-all duration-500 ease-precise group-hover:translate-x-2 sm:py-8"
      >
        <span className="font-mono text-[11px] tracking-widest text-ink-faint">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-8">
          <h3 className="text-xl font-medium tracking-tight text-ink transition-colors duration-300 group-hover:text-ink sm:text-2xl">
            {project.name}
          </h3>
          <span className="hidden text-[12px] uppercase tracking-widest text-ink-faint sm:inline">
            {project.category}
          </span>
        </div>
        <p className="hidden max-w-xs flex-1 text-sm leading-relaxed text-ink-muted text-pretty lg:block">
          {project.description}
        </p>
        <span className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-widest text-ink-faint transition-colors duration-300 group-hover:text-ink">
          <span className="sm:hidden">{project.category}</span>
          <ArrowUpRight
            size={16}
            strokeWidth={1.5}
            className="transition-all duration-300 ease-precise group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </a>
    </li>
  );
}

export function ProjectsAndSystems() {
  return (
    <section id="projetos" className="border-t border-surface-line py-24 sm:py-32 lg:py-40">
      <div className="container-editorial">
        {/* Header */}
        <div className="flex items-center gap-3">
          <span className="h-px w-6 bg-surface-line" />
          <span className="eyebrow">Projects and Systems in Development</span>
        </div>

        <h2 className="heading-display mt-5 text-3xl sm:text-4xl lg:text-5xl text-balance">
          Projects and systems in development.
        </h2>

        <div className="mt-14">
          <span className="font-mono text-[11px] tracking-widest text-ink-faint">01 · Projects</span>
          <h3 className="mt-2 text-lg font-medium tracking-tight text-ink">Selected work</h3>
          <ul className="mt-6 space-y-2">
            {PROJECTS.map((project, i) => (
              <ProjectRow key={project.name} project={project} index={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
