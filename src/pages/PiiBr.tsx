import { motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { PAIVA } from "@/lib/paivaPalette";

/* ─── Shared PAIVA palette, adapted to this page's semantic roles ─── */
const P = {
  plum: PAIVA.ink,
  plumSoft: PAIVA.inkSoft,
  mauve: PAIVA.graphite,
  mauveLight: PAIVA.stone,
  cream: PAIVA.pearl,
  blush: PAIVA.paper,
  warm: PAIVA.line,
  rose: PAIVA.lineStrong,
} as const;

/* ─── Animation variants ─── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const stagger = (d = 0.1): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: d } },
});

/* ─── Scroll-triggered reveal wrapper ─── */
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
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
      variants={fadeUp}
      transition={{ delay, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Staggered group ─── */
function RevealGroup({
  children,
  className = "",
  staggerDelay = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
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
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" },
    );
    obs.observe(ref);
    return () => obs.disconnect();
  }, [ref]);

  return (
    <motion.div
      ref={setRef}
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
      variants={stagger(staggerDelay)}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Identifier badge ─── */
function IdentifierBadge({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="flex items-start gap-4 p-5 rounded-xl transition-all duration-300"
      style={{
        background: PAIVA.surface,
        border: `1px solid ${P.warm}`,
      }}
    >
      <div
        className="w-2 h-2 rounded-full mt-2 shrink-0"
        style={{ background: P.mauve }}
      />
      <div>
        <p
          className="text-sm font-semibold mb-0.5"
          style={{
            color: P.plum,
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
          }}
        >
          {name}
        </p>
        <p
          className="text-xs leading-relaxed"
          style={{
            color: P.plumSoft,
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
            lineHeight: 1.6,
          }}
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PII-BR PRODUCT PAGE
   ═══════════════════════════════════════════════════════════ */
export default function PiiBr() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen"
      style={{
        background: P.cream,
        fontFamily: "var(--font-sans)",
        color: P.plum,
      }}
    >
      <SiteHeader />

      {/* ─── HERO ─── */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${P.blush} 0%, ${P.cream} 60%)`,
          }}
        />

        <div className="absolute inset-0 overflow-hidden opacity-[0.12] pointer-events-none">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern
                id="dots"
                x="0"
                y="0"
                width="48"
                height="48"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="1" cy="1" r="1" fill={P.mauve} />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <div className="relative max-w-5xl mx-auto px-6 lg:px-12">
          <RevealGroup staggerDelay={0.12}>
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-2 text-xs mb-8"
              style={{
                color: P.mauveLight,
                fontFamily: "var(--font-sans)",
              }}
            >
              <Link to="/" className="hover:opacity-70 transition-opacity">
                PAIVA
              </Link>
              <span>/</span>
              <span style={{ color: P.mauve }}>pii-br</span>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="text-xs font-medium tracking-[0.25em] uppercase mb-6"
              style={{
                color: P.mauve,
                fontFamily: "var(--font-sans)",
              }}
            >
              Privacy infrastructure
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.08] mb-8 max-w-3xl"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 500,
                color: P.plum,
              }}
            >
              Brazilian PII detection{" "}
              <span style={{ color: P.mauve }}>
                without sending data elsewhere.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg lg:text-xl max-w-2xl mb-10 leading-relaxed"
              style={{
                color: P.plumSoft,
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                lineHeight: 1.7,
              }}
            >
              Deterministic detection and masking for Brazilian personal identifiers.
              It has no required network or AI-service dependency; whether data stays
              local depends on how you integrate and operate it.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-3"
            >
              {[
                "Open source",
                "Deterministic",
                "Zero dependencies",
                "Local-first",
              ].map((tag) => (
                <span
                  key={tag}
                  className="text-xs tracking-wide px-3 py-1.5 rounded-full"
                  style={{
                    color: P.mauve,
                    border: `1px solid ${P.warm}`,
                    fontFamily: "var(--font-sans)",
                    fontWeight: 400,
                  }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </RevealGroup>
        </div>
      </section>

      {/* ─── THE PROBLEM ─── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <RevealGroup staggerDelay={0.12}>
            <motion.p
              variants={fadeUp}
              className="text-xs font-medium tracking-[0.25em] uppercase mb-6"
              style={{
                color: P.mauve,
                fontFamily: "var(--font-sans)",
              }}
            >
              The problem
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-semibold leading-tight mb-8 max-w-3xl"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 500,
                color: P.plum,
              }}
            >
              Brazilian data requires{" "}
              <span style={{ color: P.mauve }}>Brazilian-aware tools.</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-base lg:text-lg leading-relaxed max-w-2xl"
              style={{
                color: P.plumSoft,
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                lineHeight: 1.75,
              }}
            >
              Brazil has its own set of personal identifiers — CPF, CNPJ, PIX keys,
              CEP postal codes — that don't map cleanly to US or European PII
              patterns. Generic NER tools and international privacy libraries often
              miss them entirely, or detect them unreliably. When sensitive Brazilian
              data flows through systems built without this awareness, privacy
              protection can be incomplete.
            </motion.p>
          </RevealGroup>
        </div>
      </section>

      {/* ─── WHAT PII-BR DOES ─── */}
      <section className="py-20 lg:py-28" style={{ background: P.blush }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <RevealGroup staggerDelay={0.12}>
            <motion.p
              variants={fadeUp}
              className="text-xs font-medium tracking-[0.25em] uppercase mb-6"
              style={{
                color: P.mauve,
                fontFamily: "var(--font-sans)",
              }}
            >
              What pii-br does
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-semibold leading-tight mb-8 max-w-3xl"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 500,
                color: P.plum,
              }}
            >
              Detect, mask, and protect{" "}
              <span style={{ color: P.mauve }}>deterministically.</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-base lg:text-lg leading-relaxed max-w-2xl mb-12"
              style={{
                color: P.plumSoft,
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                lineHeight: 1.75,
              }}
            >
              pii-br uses pattern-based, deterministic logic — not machine learning —
              to find and mask Brazilian personal identifiers in text. This means
              predictable rule behavior, no model dependency, and no required network
              calls. With the same version, configuration, and input, it produces the
              same output.
            </motion.p>

            {/* Supported identifiers */}
            <motion.h3
              variants={fadeUp}
              className="text-lg font-semibold mb-6"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 600,
                color: P.plum,
              }}
            >
              Supported identifiers
            </motion.h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              <IdentifierBadge
                name="CPF"
                description="Cadastro de Pessoa Física — individual taxpayer identification number"
              />
              <IdentifierBadge
                name="CNPJ"
                description="Cadastro Nacional da Pessoa Jurídica — corporate taxpayer identification"
              />
              <IdentifierBadge
                name="PIX keys"
                description="Brazilian instant-payment identifiers, including CPF, CNPJ, email, phone, and EVP keys"
              />
              <IdentifierBadge
                name="Telephone numbers"
                description="Brazilian mobile and landline numbers in all common formats"
              />
              <IdentifierBadge
                name="CEP"
                description="Código de Endereçamento Postal — Brazilian postal codes"
              />
              <IdentifierBadge
                name="Email addresses"
                description="Standard email detection across Brazilian and international domains"
              />
            </div>
          </RevealGroup>
        </div>
      </section>

      {/* ─── WHY DETERMINISTIC ─── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <RevealGroup staggerDelay={0.12}>
            <motion.p
              variants={fadeUp}
              className="text-xs font-medium tracking-[0.25em] uppercase mb-6"
              style={{
                color: P.mauve,
                fontFamily: "var(--font-sans)",
              }}
            >
              Why deterministic
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-semibold leading-tight mb-8 max-w-3xl"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 500,
                color: P.plum,
              }}
            >
              No models. No networks.{" "}
              <span style={{ color: P.mauve }}>No surprises.</span>
            </motion.h2>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  title: "Runs offline",
                  description:
                    "No required API calls or cloud dependencies. pii-br can be used in local or air-gapped environments, subject to the surrounding integration and security review.",
                },
                {
                  title: "Fully auditable",
                  description:
                    "Every detection follows explicit, documented rules. You can read the code, understand the logic, and verify the results — no black-box behavior.",
                },
                {
                  title: "Zero external dependencies",
                  description:
                    "No machine-learning models, no third-party services, no runtime network access. The library is self-contained and lightweight.",
                },
                {
                  title: "Predictable performance",
                  description:
                    "Deterministic rules make behavior reproducible: the same version, configuration, and input produce the same output. Rule coverage and integration still need testing.",
                },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="p-6 rounded-xl"
                  style={{
                    background: P.blush,
                    border: `1px solid ${P.warm}`,
                  }}
                >
                  <h4
                    className="text-base font-semibold mb-2"
                    style={{
                      color: P.plum,
                      fontFamily: "var(--font-serif)",
                      fontWeight: 600,
                    }}
                  >
                    {item.title}
                  </h4>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: P.plumSoft,
                      fontFamily: "var(--font-sans)",
                      fontWeight: 300,
                      lineHeight: 1.75,
                    }}
                  >
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </RevealGroup>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 lg:py-28" style={{ background: P.blush }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <RevealGroup staggerDelay={0.1}>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-semibold leading-tight mb-6"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 500,
                color: P.plum,
              }}
            >
              Ready to protect Brazilian data?
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-base max-w-lg mx-auto mb-10 leading-relaxed"
              style={{
                color: P.mauve,
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                lineHeight: 1.7,
              }}
            >
              pii-br is open source and available for use. If you're building
              systems that handle Brazilian personal data, we'd like to hear how
              you're using it.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap justify-center gap-4"
            >
              <a
                href="mailto:hello@paivaintelligence.org"
                className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-medium rounded-full transition-all duration-300"
                style={{
                  background: P.plum,
                  color: P.cream,
                  fontFamily: "var(--font-sans)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = P.mauve;
                  e.currentTarget.style.boxShadow = `0 4px 16px ${P.mauve}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = P.plum;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Get in touch
              </a>
              <Link
                to="/"
                className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-medium rounded-full transition-all duration-300"
                style={{
                  background: "transparent",
                  color: P.plum,
                  border: `1px solid ${P.warm}`,
                  fontFamily: "var(--font-sans)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = P.blush;
                  e.currentTarget.style.borderColor = P.mauve;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = P.warm;
                }}
              >
                Back to PAIVA
              </Link>
            </motion.div>
          </RevealGroup>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer
        className="py-10 border-t"
        style={{ borderColor: P.warm, background: P.blush }}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <Link to="/" className="flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
                <rect width="28" height="28" rx="6" fill={P.plum} />
                <text
                  x="14"
                  y="19"
                  textAnchor="middle"
                  fill={P.cream}
                  fontSize="15"
                  fontFamily="var(--font-serif)"
                  fontWeight="600"
                >
                  P
                </text>
              </svg>
              <span
                className="text-sm tracking-wider"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 500,
                  color: P.plum,
                }}
              >
                PAIVA
              </span>
            </Link>

            <div className="flex items-center gap-6">
              <Link
                to="/"
                className="text-xs transition-colors duration-300 hover:opacity-60"
                style={{
                  color: P.mauve,
                  fontFamily: "var(--font-sans)",
                  fontWeight: 400,
                }}
              >
                Home
              </Link>
              <Link
                to="/avalibr"
                className="text-xs transition-colors duration-300 hover:opacity-60"
                style={{
                  color: P.mauve,
                  fontFamily: "var(--font-sans)",
                  fontWeight: 400,
                }}
              >
                AvaliaBR
              </Link>
            </div>

            <p
              className="text-xs"
              style={{
                color: P.mauveLight,
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
              }}
            >
              © {new Date().getFullYear()} PAIVA
            </p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
