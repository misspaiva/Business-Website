import { useReveal } from '@/hooks/useReveal';

export function Philosophy() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="border-t border-surface-line py-24 sm:py-32 lg:py-40">
      <div className="container-editorial">
        <div
          ref={ref}
          className={`max-w-4xl ${visible ? 'animate-fade-up' : 'opacity-0'}`}
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-6 bg-surface-line" />
            <span className="eyebrow">Philosophy</span>
          </div>

          <blockquote className="heading-display mt-8 text-2xl font-medium leading-snug tracking-tighter text-ink sm:text-3xl lg:text-[2.75rem] text-balance">
            Intelligence is not simply computation. It is the ability to understand
            systems, recognize patterns, and act within complexity.
          </blockquote>

          <div className="mt-10 h-px w-16 bg-surface-line" />

          <p className="mt-8 max-w-prose text-base leading-relaxed text-ink-muted text-pretty sm:text-lg">
            Paiva Intelligence is an independent technology enterprise focused on
            computational research and intelligent systems. We work at the
            intersection of artificial intelligence, mathematical modeling, and
            software — building tools and investigating ideas that expand what
            intelligent software can become.
          </p>
        </div>
      </div>
    </section>
  );
}
