import type { ReactNode } from 'react';
import { useReveal } from '@/hooks/useReveal';

interface SectionHeaderProps {
  eyebrow: string;
  title: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({ eyebrow, title, align = 'left', className = '' }: SectionHeaderProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`${className} ${visible ? 'animate-fade-up' : 'opacity-0'} ${
        align === 'center' ? 'text-center' : 'text-left'
      }`}
    >
      <div className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
        <span className="h-px w-6 bg-surface-line" />
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <h2 className="heading-display mt-5 text-3xl sm:text-4xl lg:text-5xl text-balance">
        {title}
      </h2>
    </div>
  );
}
