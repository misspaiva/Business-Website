import { Mail, CheckCircle } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { useState } from 'react';

export function Isca() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('E-mail inválido.');
      return;
    }
    setEmailError('');
    setSubmitted(true);
  }

  return (
    <section
      id="isca"
      className="border-t border-surface-line py-24 sm:py-32 lg:py-40"
    >
      <div className="container-editorial">
        <div
          ref={ref}
          className={`max-w-2xl ${visible ? 'animate-fade-up' : 'opacity-0'}`}
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-6 bg-surface-line" />
            <span className="eyebrow">Recurso gratuito</span>
          </div>

          <h2 className="heading-display mt-5 text-3xl sm:text-4xl lg:text-5xl text-balance">
            Os 15 riscos de IA no desenvolvimento
            <br />
            que sua empresa não vê.
          </h2>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-muted text-pretty sm:text-lg">
            PDF gratuito. Sem pitch. Os riscos reais que times brasileiros estão
            correndo agora — dados em prompts, segredos em chats de terceiros,
            código IA sem rastreio, contaminação de licença — e como começar a
            mitigá-los esta semana.
          </p>

          {submitted ? (
            <div
              className="mt-8 flex items-start gap-4 border border-surface-line bg-surface-raised rounded-lg px-6 py-8"
            >
              <CheckCircle
                size={20}
                strokeWidth={1.5}
                className="mt-0.5 text-accent shrink-0"
              />
              <div>
                <p className="text-ink font-medium">Enviamos para {email}</p>
                <p className="mt-2 text-sm text-ink-muted">
                  Se não aparecer em até 24 horas, cheque a spam. Ou me manda um
                  e-mail para{' '}
                  <a
                    href="mailto:hello@paivaintelligence.org"
                    className="text-accent hover:text-accent/80 transition-colors"
                  >
                    hello@paivaintelligence.org
                  </a>{' '}
                  que eu reenvio.
                </p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col gap-4 border border-surface-line bg-surface-raised rounded-lg px-6 py-8"
            >
              <label htmlFor="isca-email" className="sr-only">
                Seu e-mail
              </label>
              <input
                id="isca-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError('');
                }}
                placeholder="seu@email.com"
                className={`w-full bg-surface border ${
                  emailError ? 'border-accent' : 'border-surface-line'
                } rounded-md px-4 py-3 text-ink placeholder-ink-faint outline-none focus:border-accent transition-colors text-sm`}
                autoComplete="email"
              />
              {emailError && (
                <p className="text-sm text-accent font-medium">{emailError}</p>
              )}
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 border border-accent bg-accent/10 px-6 py-3 text-[13px] font-medium tracking-wide text-accent transition-all duration-300 ease-precise hover:bg-accent hover:text-surface"
              >
                <Mail size={14} strokeWidth={1.75} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
                Receber o PDF
              </button>
              <p className="text-xs text-ink-faint">
                Sem spam. Apenas o PDF e, se quiser depois, conteúdo sobre
                governança de IA. Pode cancelar a qualquer momento.
              </p>
            </form>
          )}

          <div className="mt-12 flex flex-wrap gap-x-6 gap-y-3 text-sm text-ink-muted">
            <p>✓ 15 riscos reais, não ameaças genéricas</p>
            <p>✓ Mitigações concretas para cada um</p>
            <p>✓ Escrito para CTOs e heads de engenharia</p>
          </div>
        </div>
      </div>
    </section>
  );
}
