import { ArrowUpRight, Mail } from 'lucide-react';
import { ComputationalField } from '@/components/ComputationalField';

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden pt-16 lg:pt-18">
      {/* faint top hairline */}
      <div className="pointer-events-none absolute inset-x-0 top-16 h-px bg-surface-line lg:top-18" />

      <div className="container-editorial grid min-h-[calc(100vh-4rem)] grid-cols-1 items-center gap-12 py-20 lg:grid-cols-12 lg:gap-8 lg:py-0">
        {/* Left — copy */}
        <div className="lg:col-span-7 lg:pr-8">
          <div className="animate-fade-up" style={{ animationDelay: '0.05s' }}>
            <div className="flex items-center gap-3">
              <span className="h-px w-6 bg-surface-line" />
              <span className="eyebrow">Paiva Intelligence</span>
            </div>
          </div>

          <h1
            className="heading-display mt-6 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-balance animate-fade-up"
            style={{ animationDelay: '0.12s' }}
          >
            Building intelligence
            <br />
            for complex systems.
          </h1>

          <p
            className="mt-7 max-w-prose text-base leading-relaxed text-ink-muted sm:text-lg animate-fade-up text-pretty"
            style={{ animationDelay: '0.2s' }}
          >
            Research, computation, and intelligent software at the intersection of
            artificial intelligence and systems thinking.
          </p>

          <div
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center animate-fade-up"
            style={{ animationDelay: '0.28s' }}
          >
            <a
              href="#projects"
              className="group inline-flex items-center justify-center gap-2 border border-surface-line bg-surface-raised px-6 py-3.5 text-[13px] font-medium tracking-wide text-ink transition-all duration-300 ease-precise hover:border-ink-faint"
            >
              Explore the work
              <ArrowUpRight
                size={15}
                strokeWidth={1.75}
                className="text-ink-muted transition-all duration-300 ease-precise group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
              />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[13px] font-medium tracking-wide text-ink-muted transition-colors duration-300 hover:text-ink"
            >
              <Mail size={15} strokeWidth={1.75} />
              Contact
            </a>
          </div>
        </div>

        {/* Right — abstract computational visual */}
        <div
          className="relative h-72 sm:h-96 lg:col-span-5 lg:h-[calc(100vh-7rem)] animate-fade-in"
          style={{ animationDelay: '0.35s' }}
        >
          <div className="absolute inset-0 lg:inset-y-0 lg:right-0 lg:left-[-2rem]">
            <ComputationalField />
          </div>
          {/* subtle left fade on large screens to blend into background */}
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-surface to-transparent lg:block" />
        </div>
      </div>

      {/* scroll cue */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
        <span className="eyebrow text-[10px]">Scroll</span>
        <span className="h-10 w-px bg-gradient-to-b from-surface-line to-transparent" />
      </div>
    </section>
  );
}
