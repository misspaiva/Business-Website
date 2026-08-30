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
            <span className="eyebrow">O problema real</span>
          </div>

          <blockquote className="heading-display mt-8 text-2xl font-medium leading-snug tracking-tighter text-ink sm:text-3xl lg:text-[2.75rem] text-balance">
            Empresas adotaram IA em 2023. Ninguém ensinou o time a usar com
            segurança. Política em PDF não muda o comportamento de um dev com
            pressa na quarta-feira à noite.
          </blockquote>

          <div className="mt-10 h-px w-16 bg-surface-line" />

          <p className="mt-8 max-w-prose text-base leading-relaxed text-ink-muted text-pretty sm:text-lg">
            O gap entre o que o compliance espera e o que acontece no repositório
            não é problema de jurídico — é problema de educação, processo e
            controle. Três camadas que se sustentam: regras que devs entendem e
            conseguem seguir, rastreabilidade de código IA dentro do fluxo real
            de desenvolvimento, e verificação automatizada no pipeline. Governa
            quem consegue transformar princípio abstrato em prática diária.
          </p>
        </div>
      </div>
    </section>
  );
}
