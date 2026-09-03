import { useReveal } from '@/hooks/useReveal';

export function BrandFilm() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section
      aria-label="PAIVA"
      className="border-t border-surface-line py-16 sm:py-20 lg:py-24"
    >
      <div className="container-editorial">
        <div
          ref={ref}
          className={`overflow-hidden rounded-sm border border-surface-line bg-black ${
            visible ? 'animate-fade-up' : 'opacity-0'
          }`}
        >
          <video
            className="block h-auto w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src="/media/paiva-brand-film.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}