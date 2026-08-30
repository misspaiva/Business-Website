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
              <span className="eyebrow">Quem está por trás</span>
            </div>
            <h2 className="heading-display mt-5 text-2xl font-medium tracking-tighter text-ink sm:text-3xl">
              Sauanna Paiva
            </h2>
          </div>

          <div
            ref={ref}
            className={`lg:col-span-8 ${visible ? 'animate-fade-up' : 'opacity-0'}`}
          >
            <p className="max-w-prose text-lg leading-relaxed text-ink-soft text-pretty">
              Sua equipe usa IA para programar todos os dias. Quem ensinou o time
              a usá-la com segurança? Quase ninguém.
            </p>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink-soft text-pretty">
              Essa lacuna é o que me trouxe até aqui. Minha trajetória combina
              educação e engenharia. Trabalhei seis anos nos Estados Unidos,
              onde construí competências práticas em desenvolvimento de software,
              GitHub, APIs e automação — e hoje uso sistemas de IA diariamente
              para construir e analisar software, de agentes a pipelines de CI.
            </p>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink-soft text-pretty">
              A minha diferença vem de onde a maioria não olha: formação profunda
              em educação — em como pessoas aprendem, mudam comportamento e
              incorporam processos. Porque o problema real da governança de IA não
              é jurídico. As empresas adotaram as ferramentas em 2023 e nunca
              ensinaram o time a usá-las.
            </p>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink-soft text-pretty">
              Por isso meu trabalho tem três camadas: educação (regras que devs
              entendem e conseguem seguir), processo (revisão e rastreabilidade de
              código IA dentro do fluxo real) e controle (verificação automatizada
              no pipeline — segredos, dados pessoais e proveniência em cada PR).
            </p>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink-soft text-pretty">
              Estou em Brasília, acompanhando de perto ANPD, PL 2338 e os movimentos
              do TCU — onde a regulação de IA do Brasil está sendo escrita. Fui para
              Brasília do interior do Piauí em janeiro de 2016, fiz minha formação
              aqui e morei seis anos nos EUA antes de voltar em 2025.
            </p>

            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-surface-line pt-8">
              <div>
                <span className="eyebrow">Estrutura</span>
                <p className="mt-2 text-sm text-ink-soft">Empresa independente</p>
              </div>
              <div>
                <span className="eyebrow">Localização</span>
                <p className="mt-2 text-sm text-ink-soft">Brasília, DF</p>
              </div>
              <div>
                <span className="eyebrow">Foco</span>
                <p className="mt-2 text-sm text-ink-soft">
                  Governança de IA · Educação · Processo · Controle
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
