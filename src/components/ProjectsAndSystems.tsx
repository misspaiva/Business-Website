import { ArrowUpRight } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

interface Project {
  name: string;
  category: string;
  status: string;
  description: string;
  href: string;
}

const PROJECTS: Project[] = [
  {
    name: 'AvaliaBR',
    category: 'AI Evaluation',
    status: 'MVP / PILOTO',
    description:
      'Benchmark em português para avaliar modelos de IA em contextos brasileiros, começando por saúde e SUS, com métricas de factualidade, alucinação, protocolo, linguagem e equidade.',
    href: 'https://github.com/misspaiva',
  },
  {
    name: 'PII-BR',
    category: 'Security',
    status: 'OPEN SOURCE',
    description:
      'Biblioteca determinística para detectar e validar PII brasileira como CPF, CNPJ, e-mail, telefone e CEP, com execução offline e integração a CI.',
    href: 'https://github.com/misspaiva/pii-br',
  },
  {
    name: 'Radar PL 2338',
    category: 'Policy Infrastructure',
    status: 'EM DESENVOLVIMENTO',
    description:
      'Monitoramento estruturado da evolução regulatória de IA no Brasil para conectar mudanças normativas a requisitos técnicos e de governança.',
    href: 'https://github.com/misspaiva',
  },
  {
    name: 'Paiva Computational Lab',
    category: 'Research & Development',
    status: 'LAB',
    description:
      'Ambiente independente de pesquisa e desenvolvimento para experimentos em IA, sistemas computacionais, segurança, ferramentas para desenvolvedores e tecnologia pública.',
    href: 'https://github.com/misspaiva',
  },
];

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const { ref, visible } = useReveal<HTMLLIElement>();
  return (
    <li
      ref={ref}
      className={`group relative transition-all duration-700 ease-precise ${visible ? 'animate-fade-up' : 'opacity-0'}`}
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-start gap-5 border-t border-surface-line py-7 transition-all duration-500 ease-precise group-hover:translate-x-2 sm:items-center sm:py-8"
      >
        <span className="mt-1 font-mono text-[11px] tracking-widest text-ink-faint sm:mt-0">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6">
            <h3 className="text-xl font-medium tracking-tight text-ink sm:text-2xl">{project.name}</h3>
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">{project.status}</span>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted text-pretty">{project.description}</p>
        </div>
        <div className="hidden shrink-0 items-center gap-5 lg:flex">
          <span className="text-[11px] uppercase tracking-widest text-ink-faint">{project.category}</span>
          <ArrowUpRight size={16} strokeWidth={1.5} className="text-ink-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" />
        </div>
      </a>
    </li>
  );
}

export function ProjectsAndSystems() {
  return (
    <section id="projetos" className="border-t border-surface-line py-24 sm:py-32 lg:py-40">
      <div className="container-editorial">
        <div className="flex items-center gap-3">
          <span className="h-px w-6 bg-surface-line" />
          <span className="eyebrow">Trabalho selecionado</span>
        </div>

        <h2 className="heading-display mt-5 max-w-3xl text-3xl sm:text-4xl lg:text-5xl text-balance">
          Pesquisa que vira ferramenta. Ferramenta que vira infraestrutura.
        </h2>

        <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted text-pretty sm:text-lg">
          Os projetos abaixo estão em diferentes estágios de desenvolvimento. A PAIVA publica trabalho técnico cedo, mede o que funciona e evolui a partir de evidência real.
        </p>

        <ul className="mt-14 space-y-2">
          {PROJECTS.map((project, i) => (
            <ProjectRow key={project.name} project={project} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
