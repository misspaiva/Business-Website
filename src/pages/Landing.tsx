import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { BrazilField } from "@/components/BrazilField";
import { SiteHeader } from "@/components/SiteHeader";
import { PAIVA } from "@/lib/paivaPalette";

/* ─── PAIVA neutral palette ─── */
const H = {
  paper: PAIVA.pearl,
  ink: PAIVA.ink,
  pearl: PAIVA.pearl,
  textPrimary: "#201f1c",
  textSecondary: PAIVA.graphite,
  textMuted: "#858078",
  borderSubtle: "rgba(32,31,28,0.10)",
  borderDefault: "rgba(32,31,28,0.18)",
  accent: PAIVA.accent,
  accentSoft: PAIVA.accentSoft,
  ctaBg: PAIVA.ink,
  ctaText: PAIVA.pearl,
  glass: "rgba(255,255,255,0.64)",
} as const;

/* ─── Scroll-triggered reveal ─── */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    obs.observe(ref);
    return () => obs.disconnect();
  }, [ref]);

  return (
    <motion.div
      ref={setRef}
      initial={{ opacity: 0, y: 24 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ delay, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   LANDING PAGE
   ═══════════════════════════════════════════════════════════ */
export default function Landing() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroVisualY = useTransform(scrollY, [0, 500], [0, 30]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen"
      style={{ background: H.paper, fontFamily: "var(--font-sans)", color: H.textPrimary }}
    >
      <SiteHeader tone="dark" />

      {/* ═══ SECTION A — HERO ═══ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden" style={{ background: H.ink, color: H.pearl }}>
        <div className="absolute inset-0 pointer-events-none opacity-40" style={{ backgroundImage: "radial-gradient(circle at 78% 48%, rgba(246,243,237,0.06), transparent 31%)" }} />

        <motion.div className="absolute right-0 top-1/2 -translate-y-1/2 w-[min(56vw,650px)] pointer-events-none hidden lg:block" style={{ y: heroVisualY }}>
          <BrazilField />
        </motion.div>

        <div className="relative z-10 max-w-6xl mx-auto w-full px-6 lg:px-12 pt-32 pb-20">
          <div className="max-w-2xl">
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xs font-semibold tracking-[0.3em] uppercase mb-8" style={{ color: H.accentSoft }}>
              Infraestrutura de IA brasileira
            </motion.p>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-8">
              Tecnologia pública para{" "}
              <span style={{ color: H.accentSoft }}>realidades brasileiras.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35 }}
              className="text-lg lg:text-xl max-w-xl mb-12 leading-relaxed" style={{ color: "rgba(246,241,232,0.72)", lineHeight: 1.7 }}>
              Avaliação, privacidade e infraestrutura de IA responsável para a
              linguagem, as instituições, os dados públicos e os contextos brasileiros.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-3">
              {["avaliação de IA", "privacidade", "dados públicos", "feito no Brasil"].map((tag) => (
                <span key={tag} className="text-[11px] tracking-wide px-3 py-1.5 rounded-full"
                  style={{ color: "rgba(246,241,232,0.72)", border: "1px solid rgba(246,241,232,0.2)" }}>
                  {tag}
                </span>
              ))}
            </motion.div>
            <div className="lg:hidden mt-10 max-w-[350px] mx-auto">
              <BrazilField />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION B — VISION STATEMENT ═══ */}
      <section className="py-20 lg:py-32" style={{ borderTop: `1px solid ${H.borderSubtle}` }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <Reveal>
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase mb-8" style={{ color: H.accent }}>
              Vision
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] max-w-3xl">
              Brazilian technology sovereignty requires{" "}
              <span style={{ color: H.accent }}>infrastructure built for Brazilian contexts.</span>
            </h2>
            <p className="text-base lg:text-lg mt-8 max-w-2xl leading-relaxed" style={{ color: H.textSecondary, lineHeight: 1.8 }}>
              PAIVA develops the technical layer that makes AI systems evaluate, operate,
              and protect data within Brazilian laws, languages, and institutions —
              not as an afterthought, but as a design requirement.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══ SECTION C — PRODUCTS ═══ */}
      <section id="products" className="py-20 lg:py-32" style={{ background: "rgba(0,0,0,0.02)", borderTop: `1px solid ${H.borderSubtle}`, borderBottom: `1px solid ${H.borderSubtle}` }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <Reveal>
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase mb-16" style={{ color: H.accent }}>
              Current work
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            {/* AvaliaBR */}
            <Reveal delay={0.1}>
              <Link to="/avalibr" className="block group rounded-2xl p-10 transition-all duration-500 min-h-[320px] flex flex-col"
                style={{ background: H.glass, backdropFilter: "blur(20px)", border: `1px solid ${H.borderSubtle}`, boxShadow: "0 8px 32px rgba(0,0,0,0.04)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = H.accent; e.currentTarget.style.boxShadow = "0 16px 48px rgba(23,23,22,0.08)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = H.borderSubtle; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.04)"; }}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full"
                    style={{ color: H.accent, background: "rgba(118,113,104,0.08)", border: "1px solid rgba(118,113,104,0.18)" }}>
                    AI evaluation
                  </span>
                  <span className="text-[10px] tracking-wide font-medium" style={{ color: H.textMuted }}>MVP / Pilot</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-3 group-hover:translate-x-0.5 transition-transform duration-300">
                  AvaliaBR
                </h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: H.textSecondary, lineHeight: 1.75 }}>
                  An early Brazilian-context LLM evaluation pilot. It explores structured
                  criteria for testing model responses across health, public-sector, and language contexts.
                </p>
                <div className="mt-6 flex items-center text-sm font-semibold transition-all duration-300 group-hover:translate-x-1"
                  style={{ color: H.accent }}>
                  Explore AvaliaBR <span className="ml-1.5">→</span>
                </div>
              </Link>
            </Reveal>

            {/* pii-br */}
            <Reveal delay={0.2}>
              <Link to="/pii-br" className="block group rounded-2xl p-10 transition-all duration-500 min-h-[320px] flex flex-col"
                style={{ background: H.glass, backdropFilter: "blur(20px)", border: `1px solid ${H.borderSubtle}`, boxShadow: "0 8px 32px rgba(0,0,0,0.04)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = H.accentSoft; e.currentTarget.style.boxShadow = "0 16px 48px rgba(23,23,22,0.08)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = H.borderSubtle; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.04)"; }}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full"
                    style={{ color: H.accent, background: "rgba(118,113,104,0.08)", border: "1px solid rgba(118,113,104,0.18)" }}>
                    Privacy infrastructure
                  </span>
                  <span className="text-[10px] tracking-wide font-medium" style={{ color: H.textMuted }}>Prototype</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-3 group-hover:translate-x-0.5 transition-transform duration-300">
                  pii-br
                </h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: H.textSecondary, lineHeight: 1.75 }}>
                  Deterministic Brazilian PII detection and masking. Identifies CPF, CNPJ,
                  phone, email, and CEP patterns — runs locally, no AI dependencies.
                </p>
                <div className="mt-6 flex items-center text-sm font-semibold transition-all duration-300 group-hover:translate-x-1"
                  style={{ color: H.accent }}>
                  Explore pii-br <span className="ml-1.5">→</span>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ SECTION D — ABOUT (compressed) ═══ */}
      <section className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <Reveal>
            <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.3em] uppercase mb-6" style={{ color: H.accent }}>
                  About PAIVA
                </p>
                <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
                  Built in Brasília.
                </h2>
                <h2 className="text-3xl lg:text-4xl font-bold leading-tight mt-1" style={{ color: H.accent }}>
                  Focused on capability.
                </h2>
              </div>
              <div>
                <p className="text-base leading-relaxed mb-6" style={{ color: H.textSecondary, lineHeight: 1.8 }}>
                  PAIVA was founded by Sauanna Paiva to develop independent technology
                  around AI evaluation, security, and responsible AI. The work combines
                  software development, open research, and a long-term interest in
                  public-interest technology.
                </p>
                <p className="text-sm leading-relaxed mb-8" style={{ color: H.textMuted, lineHeight: 1.8 }}>
                  PAIVA's longer-term mission includes expanding access to technology
                  and AI education for young people in Northeast Brazil.
                </p>
                <Link to="/about" className="inline-flex items-center text-sm font-semibold transition-all duration-300 hover:translate-x-1"
                  style={{ color: H.accent }}>
                  Learn more about PAIVA <span className="ml-1.5">→</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ SECTION E — CONTACT ORIENTATION ═══ */}
      <section id="contact" className="py-20 lg:py-32" style={{ background: "rgba(0,0,0,0.02)", borderTop: `1px solid ${H.borderSubtle}`, borderBottom: `1px solid ${H.borderSubtle}` }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <Reveal>
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase mb-8" style={{ color: H.accent }}>
              Collaborate
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Build, test, or collaborate.
            </h2>
            <p className="text-base max-w-lg mx-auto mb-12 leading-relaxed" style={{ color: H.textSecondary, lineHeight: 1.7 }}>
              Whether you are evaluating AI for Brazilian contexts, protecting
              sensitive data, or building open-source infrastructure.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {[
                { label: "Evaluate AI", href: "/avalibr" },
                { label: "Protect data", href: "/pii-br" },
                { label: "Open source", href: "mailto:hello@paivaintelligence.org" },
                { label: "Research", href: "mailto:hello@paivaintelligence.org" },
              ].map((a) => (
                <Link key={a.label} to={a.href}
                  className="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: H.paper, color: H.textPrimary, border: `1px solid ${H.borderDefault}` }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = H.accent; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = H.borderDefault; }}>
                  {a.label}
                </Link>
              ))}
            </div>

            <a href="mailto:hello@paivaintelligence.org"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold rounded-full transition-all duration-300"
              style={{ background: H.ctaBg, color: H.ctaText }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.15)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}>
              hello@paivaintelligence.org
            </a>
          </Reveal>
        </div>
      </section>

      {/* ═══ SECTION F — FOOTER ═══ */}
      <footer className="py-10" style={{ borderTop: `1px solid ${H.borderSubtle}` }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <Link to="/" className="flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
                <rect width="28" height="28" rx="6" fill={H.ctaBg} />
                <text x="14" y="19" textAnchor="middle" fill={H.ctaText} fontSize="15" fontFamily="var(--font-sans)" fontWeight="700">P</text>
              </svg>
              <span className="text-sm tracking-wider font-bold" style={{ color: H.textPrimary }}>PAIVA</span>
            </Link>
            <div className="flex items-center gap-6">
              <a href="#products" className="text-xs hover:opacity-60 transition-opacity" style={{ color: H.textSecondary }}>Current work</a>
              <Link to="/ecosystem" className="text-xs hover:opacity-60 transition-opacity" style={{ color: H.textSecondary }}>Ecosystem</Link>
              <Link to="/about" className="text-xs hover:opacity-60 transition-opacity" style={{ color: H.textSecondary }}>About</Link>
              <Link to="/datasets" className="text-xs hover:opacity-60 transition-opacity" style={{ color: H.textSecondary }}>Datasets</Link>
              <a href="#contact" className="text-xs hover:opacity-60 transition-opacity" style={{ color: H.textSecondary }}>Contact</a>
            </div>
            <p className="text-xs" style={{ color: H.textMuted }}>© {new Date().getFullYear()} PAIVA</p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
