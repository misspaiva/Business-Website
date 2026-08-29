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
              <span className="eyebrow">About</span>
            </div>
            <h2 className="heading-display mt-5 text-2xl font-medium tracking-tighter text-ink sm:text-3xl">
              Paiva Intelligence
            </h2>
          </div>

          <div
            ref={ref}
            className={`lg:col-span-8 ${visible ? 'animate-fade-up' : 'opacity-0'}`}
          >
            <p className="max-w-prose text-lg leading-relaxed text-ink-soft text-pretty">
              Paiva Intelligence is an independent technology enterprise focused on
              artificial intelligence, computational systems, research, and
              experimental software.
            </p>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink-soft text-pretty">
              We build systems, investigate ideas, and explore technologies that
              expand what intelligent software can become.
            </p>

            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-surface-line pt-8">
              <div>
                <span className="eyebrow">Structure</span>
                <p className="mt-2 text-sm text-ink-soft">Independent enterprise</p>
              </div>
              <div>
                <span className="eyebrow">Focus</span>
                <p className="mt-2 text-sm text-ink-soft">
                  AI · Computation · Systems
                </p>
              </div>
              <div>
                <span className="eyebrow">Location</span>
                <p className="mt-2 text-sm text-ink-soft">Location-independent</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
