import { useState } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { RecursoGratuito } from '@/components/RecursoGratuito';

const STEPS = [
  {
    title: 'Kickoff (30 min)',
    description:
      'Alinhamos escopo e enviamos o survey anônimo para o time de desenvolvimento responder no seu ritmo.',
  },
  {
    title: 'Análise técnica',
    description:
      'Varredura de segredos e dados sensíveis executada no ambiente de vocês. Código nunca sai do seu repositório.',
  },
  {
    title: 'Entrevista com a liderança',
    description:
      'Conversa de 60 minutos com você e quem lidera engenharia sobre processo, ferramentas e lacunas de governança.',
  },
  {
    title: 'Entrega',
    description:
      'Relatório com matriz de riscos priorizada (LGPD, segurança, licenças), Política de Uso de IA pronta, checklist de revisão de código IA e plano 30/60/90 dias.',
  },
];

const RISKS = [
  {
    title: 'Dados de clientes em prompts',
    description:
      'Dev com pressa cola query com dados reais no ChatGPT para debugar. Ninguém registra. Ninguém sabe. A LGPD, porém, já se aplica — hoje.',
  },
  {
    title: 'Segredos expostos',
    description:
      'Chaves de API, tokens e connection strings colados em chats de IA — retidos em logs de terceiros, fora de qualquer inventário de segurança.',
  },
  {
    title: 'Código IA em produção sem rastreio',
    description:
      'Código gerado por IA entra em produção sem revisão diferenciada e sem registro. Quando o incidente chegar, ninguém sabe responder pelo quê.',
  },
  {
    title: 'Contaminação de licença',
    description:
      'Código sugerido por IA pode carregar licenças copyleft (GPL) — e contaminar o produto fechado que a sua empresa vende.',
  },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <details
      className="border-b border-surface-line py-5 first:border-t first:border-surface-line"
      open={open}
      onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
    >
      <summary className="flex cursor-pointer items-center justify-between list-none text-ink font-medium">
        {question}
        <ArrowRight
          size={15}
          strokeWidth={1.75}
          className={`shrink-0 text-ink-muted transition-transform duration-300 ease-precise ${
            open ? 'rotate-90' : ''
          }`}
        />
      </summary>
      <p className="mt-3 text-sm leading-relaxed text-ink-muted text-pretty">
        {answer}
      </p>
    </details>
  );
}

export function Diagnostico() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="diagnostico" className="border-t border-surface-line py-24 sm:py-32 lg:py-40">
      <div className="container-editorial">
        <div
          ref={ref}
          className={`${visible ? 'animate-fade-up' : 'opacity-0'}`}
        >
          {/* Cabeçalho da seção */}
          <div className="flex items-center gap-3">
            <span className="h-px w-6 bg-surface-line" />
            <span className="eyebrow">Diagnóstico de Governança de IA</span>
          </div>

          <h2 className="heading-display mt-5 text-3xl sm:text-4xl lg:text-5xl text-balance">
            Seus devs estão usando IA.
            <br />
            Ninguém definiu as regras.
          </h2>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-muted text-pretty sm:text-lg">
            Ferramentas de IA chegaram nos repositórios em 2023. Governança nunca
            acompanhou. O diagnóstico é uma análise técnica de {' '}
            <strong className="text-ink">5 dias úteis</strong> do seu time: o que
            está acontecendo, o que pode virar problema, e o que fazer antes que
            vire.
          </p>

          {/* Riscos */}
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {RISKS.map((risk) => (
              <div
                key={risk.title}
                className="flex gap-4 rounded-lg border border-surface-line bg-surface-raised p-5"
              >
                <CheckCircle
                  size={18}
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0 text-accent"
                />
                <div>
                  <h3 className="text-base font-medium tracking-tight text-ink">
                    {risk.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted text-pretty">
                    {risk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* O que analiso */}
          <div className="mt-14 border-t border-surface-line pt-10">
            <h3 className="heading-display text-2xl sm:text-3xl font-medium tracking-tighter text-ink">
              O que eu analiso no seu time
            </h3>
            <ul className="mt-6 space-y-4 text-ink-soft">
              {[
                'Prompts com dados sensíveis — identifico padrões de uso que podem expor dados pessoais ou informações confidenciais em ferramentas de IA.',
                'Secrets e dados no repo — verifico se o histórico do repositório contém credenciais, chaves, ou dados que não deveriam estar lá.',
                'Código de origem desconhecida em produção — avalio se há código gerado por IA em produção sem rastreabilidade de origem ou revisão adequada.',
                'Contaminação de licença — verifico se o uso de IA no fluxo de desenvolvimento introduz risco de violação de licença em código que vai para produção.',
                'Políticas e fluxos existentes — mapeio o que o seu time já tem (ou não tem) para governar o uso de IA, e onde as lacunas são.',
              ].map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-relaxed text-pretty"
                >
                  <span className="mt-1.5 shrink-0 text-accent">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* O que recebe */}
          <div className="mt-14 border-t border-surface-line pt-10">
            <h3 className="heading-display text-2xl sm:text-3xl font-medium tracking-tighter text-ink">
              O que você recebe ao final
            </h3>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-muted text-pretty sm:text-lg">
              Não fico só no diagnóstico. Entrego o que fazer depois — tudo isso
              é feito com as ferramentas e acesso que você autoriza, e o código do
              seu time não sai do seu ambiente.
            </p>
            <ul className="mt-6 space-y-4 text-ink-soft">
              {[
                'Relatório de achados — o que existe, o que é risco, o que é apenas prática normal que pode ser documentada.',
                'Plano de remediação — ações concretas, priorizadas, com estimativa de esforço.',
                'Sessão de alinhamento de 30 min — eu explico os achados e respondo perguntas do seu time.',
              ].map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-relaxed text-pretty"
                >
                  <span className="mt-1.5 shrink-0 text-accent">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Passos */}
          <div className="mt-14 border-t border-surface-line pt-10">
            <h3 className="heading-display text-2xl sm:text-3xl font-medium tracking-tighter text-ink">
              Como funciona
            </h3>
            <ol className="mt-8 space-y-0">
              {STEPS.map((step, i) => (
                <li
                  key={step.title}
                  className="flex gap-5 py-6 border-b border-surface-line last:border-b-0"
                >
                  <span className="font-mono text-[11px] tracking-widest text-ink-faint shrink-0 w-8">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h4 className="text-base font-medium tracking-tight text-ink">
                      {step.title}
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-ink-muted text-pretty">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Preço */}
          <div className="mt-14 border-t border-surface-line pt-10">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-ink-muted">Investimento</p>
                <div className="mt-2 flex items-baseline gap-4">
                  <span className="text-4xl font-medium tracking-tight text-accent">
                    R$ 6.000
                  </span>
                  <span className="text-lg text-ink-muted line-through">
                    R$ 12.000
                  </span>
                </div>
                <p className="mt-2 text-sm text-ink-muted">
                  Condição de lançamento — primeiro diagnóstico a R$ 6.000 em
                  troca de depoimento e citação anonimizada do caso.
                </p>
              </div>
              <a
                href="https://calendly.com/paivasauanna/conversa-de-15-min-governanca-de-ia"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 border border-surface-line bg-surface-raised px-6 py-3.5 text-[13px] font-medium tracking-wide text-ink transition-all duration-300 ease-precise hover:border-ink-faint whitespace-nowrap"
              >
                Agendar conversa
                <ArrowRight
                  size={15}
                  strokeWidth={1.75}
                  className="text-ink-muted transition-all duration-300 ease-precise group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
                />
              </a>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-14 border-t border-surface-line pt-10">
            <h3 className="heading-display text-2xl sm:text-3xl font-medium tracking-tighter text-ink mb-2">
              Perguntas frequentes
            </h3>
            <div className="mt-4 max-w-lg">
              <FaqItem
                question="Isso é parecer jurídico?"
                answer="Não. O diagnóstico é técnico: levanto o que está acontecendo no seu time e sugiro o que fazer. Quando algo precisar de orientação jurídica — por exemplo, uma análise específica de impacto de LGPD — eu indico e você trata com quem tem a função jurídica. Eu não emito pareceres."
              />
              <FaqItem
                question="O código do meu time sai do meu ambiente?"
                answer="Não. Nada de código, prompt, ou dado do seu time vai para qualquer ambiente meu. O diagnóstico usa ferramentas no seu ambiente ou acesso que você concede — e eu documento tudo que analisei para você confirmar."
              />
              <FaqItem
                question="Quanto tempo leva?"
                answer="5 dias úteis, começando na data que a gente fecha após o depósito. Leva kickoff de 30 min no início e entrega dos achados ao final."
              />
              <FaqItem
                question="Faz sentido para empresa pequena?"
                answer="O diagnóstico foi desenhado para times de 10+ devs. Para times menores, o workshop 'IA Segura para Devs' é mais adequado. Se você é menor que isso e tem dúvida, me manda um e-mail e eu te digo honestamente se vale a pena agora."
              />
            </div>
          </div>

          {/* Recurso gratuito */}
          <div className="mt-14 border-t border-surface-line pt-10">
            <RecursoGratuito />
          </div>
        </div>
      </div>
    </section>
  );
}
