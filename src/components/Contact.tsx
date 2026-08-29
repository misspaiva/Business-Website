import { ArrowUpRight, Mail } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Email', href: 'mailto:hello@paivaintelligence.com' },
] as const;

export function Contact() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section
      id="contact"
      className="relative border-t border-surface-line py-28 sm:py-36 lg:py-48"
    >
      <div className="container-editorial">
        <div
          ref={ref}
          className={`flex flex-col items-start ${visible ? 'animate-fade-up' : 'opacity-0'}`}
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-6 bg-surface-line" />
            <span className="eyebrow">Contact</span>
          </div>

          <h2 className="heading-display mt-6 text-4xl font-medium tracking-tighter text-ink sm:text-5xl lg:text-6xl text-balance">
            Let&apos;s explore what comes next.
          </h2>

          <a
            href="mailto:hello@paivaintelligence.com"
            className="group mt-8 inline-flex items-center gap-2 text-lg text-ink-soft transition-colors duration-300 hover:text-ink sm:text-xl"
          >
            <Mail size={18} strokeWidth={1.5} className="text-ink-muted" />
            hello@paivaintelligence.com
          </a>

          <a
            href="mailto:hello@paivaintelligence.com"
            className="group mt-10 inline-flex items-center justify-center gap-2 border border-surface-line bg-surface-raised px-7 py-4 text-[13px] font-medium tracking-wide text-ink transition-all duration-300 ease-precise hover:border-ink-faint"
          >
            Start a conversation
            <ArrowUpRight
              size={15}
              strokeWidth={1.75}
              className="text-ink-muted transition-all duration-300 ease-precise group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
            />
          </a>

          <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-surface-line pt-8">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-muted transition-colors duration-300 hover:text-ink"
              >
                {social.label}
                <ArrowUpRight
                  size={13}
                  strokeWidth={1.5}
                  className="opacity-0 transition-all duration-300 ease-precise group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
