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

/* ─── Feature card ─── */
function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="p-6 rounded-xl transition-all duration-300"
      style={{
        background: PAIVA.surface,
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
        {title}
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
        {description}
      </p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   AVALIABR PRODUCT PAGE
   ═══════════════════════════════════════════════════════════ */
export default function AvaliaBr() {
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
        {/* Background gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${P.blush} 0%, ${P.cream} 60%)`,
          }}
        />

        {/* Decorative dots */}
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
            {/* Breadcrumb */}
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
              <span style={{ color: P.mauve }}>AvaliaBR</span>
            </motion.div>

            {/* Eyebrow */}
            <motion.p
              variants={fadeUp}
              className="text-xs font-medium tracking-[0.25em] uppercase mb-6"
              style={{
                color: P.mauve,
                fontFamily: "var(--font-sans)",
              }}
            >
              AI evaluation
            </motion.p>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.08] mb-8 max-w-3xl"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 500,
                color: P.plum,
              }}
            >
              Evaluate AI in{" "}
              <span style={{ color: P.mauve }}>Brazilian contexts.</span>
            </motion.h1>

            {/* Subheading */}
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
              An open evaluation framework for studying how language models respond to
              structured criteria across Brazilian language, public-sector contexts,
              safety requirements, and communication standards.
            </motion.p>

            {/* Status tags */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-3 mb-6"
            >
              {[
                "MVP / pilot",
                "Healthcare (SUS)",
                "v0.3 in development",
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
              Most AI evaluation tools{" "}
              <span style={{ color: P.mauve }}>weren't built for Brazil.</span>
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
              Existing benchmarks and evaluation suites are largely designed around
              English-language contexts, foreign regulatory frameworks, and assumptions
              about how language models should behave. When those tools are applied to
              Brazilian Portuguese, public-sector institutions, or local safety
              requirements, the results often miss what matters most.
            </motion.p>
          </RevealGroup>
        </div>
      </section>

      {/* ─── WHAT AVALIABR DOES ─── */}
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
              What AvaliaBR does
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
              Structured evaluation against{" "}
              <span style={{ color: P.mauve }}>criteria that matter.</span>
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
              AvaliaBR is being developed as a framework for defining, running, and
              analyzing evaluations against explicit criteria rooted in Brazilian context.
              Rather than treating "good performance" as a universal constant, it asks:
              how does a model behave when the context is a SUS hospital, a municipal
              government, or a Brazilian user writing in colloquial Portuguese?
            </motion.p>

            {/* Feature cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <FeatureCard
                title="Open and reproducible"
                description="The pilot is being organized around inspectable criteria and result artifacts. Public coverage will expand with each validated release."
              />
              <FeatureCard
                title="Structured criteria"
                description="Define what 'good' means for your use case. Evaluated against explicit, documented rubrics rather than vague quality scores."
              />
              <FeatureCard
                title="Brazilian language"
                description="Evaluation material is being developed in Brazilian Portuguese, with room to examine language variation rather than simply translating English benchmarks."
              />
              <FeatureCard
                title="Public-sector focus"
                description="The initial work focuses on SUS contexts; public-sector scenarios are a direction for later, evidence-backed expansion."
              />
              <FeatureCard
                title="Safety evaluation"
                description="The pilot can support structured safety analysis, but it is not a substitute for clinical, legal, or regulatory review."
              />
              <FeatureCard
                title="Version-controlled"
                description="Versioned criteria and results are a goal of the evaluation workflow; public comparison history will be published only when it exists."
              />
            </div>
          </RevealGroup>
        </div>
      </section>

      {/* ─── CURRENT STATUS ─── */}
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
              Current status
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
              Early-stage.{" "}
              <span style={{ color: P.mauve }}>Intentionally narrow.</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-base lg:text-lg leading-relaxed max-w-2xl mb-10"
              style={{
                color: P.plumSoft,
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                lineHeight: 1.75,
              }}
            >
              AvaliaBR is currently in its pilot phase, with the healthcare domain
              (SUS contexts) as its first focus area. The framework is being developed
              to support additional Brazilian public-sector domains as it matures.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="grid sm:grid-cols-3 gap-5"
            >
              {[
                {
                  label: "Phase",
                  value: "MVP / pilot",
                },
                {
                  label: "Focus domain",
                  value: "Healthcare (SUS)",
                },
                {
                  label: "Version",
                  value: "v0.3 in development",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-5 rounded-xl"
                  style={{
                    background: P.blush,
                    border: `1px solid ${P.warm}`,
                  }}
                >
                  <p
                    className="text-xs tracking-wider uppercase mb-1"
                    style={{
                      color: P.mauveLight,
                      fontFamily: "var(--font-sans)",
                      fontWeight: 500,
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="text-base font-medium"
                    style={{
                      color: P.plum,
                      fontFamily: "var(--font-serif)",
                      fontWeight: 600,
                    }}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </motion.div>
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
              Interested in evaluating AI for Brazilian contexts?
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
              AvaliaBR is in its early stages. If you're working on AI evaluation,
              public-sector technology, or responsible AI in Brazil, we'd like to hear
              from you.
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
                to="/pii-br"
                className="text-xs transition-colors duration-300 hover:opacity-60"
                style={{
                  color: P.mauve,
                  fontFamily: "var(--font-sans)",
                  fontWeight: 400,
                }}
              >
                pii-br
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
