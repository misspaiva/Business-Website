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

/* ═══════════════════════════════════════════════════════════
   ABOUT PAIVA PAGE
   ═══════════════════════════════════════════════════════════ */
export default function About() {
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
                id="about-dots"
                x="0"
                y="0"
                width="48"
                height="48"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="1" cy="1" r="1" fill={P.mauve} />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#about-dots)" />
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
              <span style={{ color: P.mauve }}>About</span>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="text-xs font-medium tracking-[0.25em] uppercase mb-6"
              style={{
                color: P.mauve,
                fontFamily: "var(--font-sans)",
              }}
            >
              About PAIVA
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
              Built in Brasília.{" "}
              <span style={{ color: P.mauve }}>
                Focused on Brazilian capability.
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
              PAIVA is a Brazilian technology company developing trustworthy AI
              infrastructure — evaluation systems, privacy tooling, and
              responsible-AI infrastructure designed for Brazilian contexts.
            </motion.p>
          </RevealGroup>
        </div>
      </section>

      {/* ─── COMPANY STORY ─── */}
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
              The company
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
              PAIVA sits at the intersection of{" "}
              <span style={{ color: P.mauve }}>
                evaluation, security, and Brazilian context.
              </span>
            </motion.h2>

            <div className="space-y-6 max-w-2xl">
              <motion.p
                variants={fadeUp}
                className="text-base lg:text-lg leading-relaxed"
                style={{
                  color: P.plumSoft,
                  fontFamily: "var(--font-sans)",
                  fontWeight: 300,
                  lineHeight: 1.75,
                }}
              >
                AI systems are increasingly deployed inside Brazilian laws,
                institutions, languages, and public services. Yet the
                infrastructure used to evaluate and safeguard them is still
                largely built around other contexts.
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="text-base lg:text-lg leading-relaxed"
                style={{
                  color: P.plumSoft,
                  fontFamily: "var(--font-sans)",
                  fontWeight: 300,
                  lineHeight: 1.75,
                }}
              >
                PAIVA develops technical infrastructure that treats Brazilian
                context as part of the system design — not an afterthought. The
                company's work spans AI evaluation, security and privacy,
                responsible AI, public-sector technology, and developer
                infrastructure.
              </motion.p>
            </div>
          </RevealGroup>
        </div>
      </section>

      {/* ─── WHAT PAIVA BUILDS ─── */}
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
              What PAIVA builds
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-semibold leading-tight mb-10 max-w-3xl"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 500,
                color: P.plum,
              }}
            >
              Two products, one coherent thesis.{" "}
              <span style={{ color: P.mauve }}>More to come.</span>
            </motion.h2>

            <div className="space-y-6 max-w-2xl mb-12">
              <motion.p
                variants={fadeUp}
                className="text-base lg:text-lg leading-relaxed"
                style={{
                  color: P.plumSoft,
                  fontFamily: "var(--font-sans)",
                  fontWeight: 300,
                  lineHeight: 1.75,
                }}
              >
                PAIVA's current product focus is intentionally narrow. AvaliaBR
                represents the evaluation side. pii-br represents the
                security and privacy side. Together they tell a coherent story:
                PAIVA builds the infrastructure needed to evaluate AI and protect
                Brazilian data.
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="text-base lg:text-lg leading-relaxed"
                style={{
                  color: P.plumSoft,
                  fontFamily: "var(--font-sans)",
                  fontWeight: 300,
                  lineHeight: 1.75,
                }}
              >
                Future projects can emerge underneath the same thesis —
                governance tooling, public-sector technology, institutional
                infrastructure — without forcing a redesign every six months.
              </motion.p>
            </div>

            {/* Product links */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/avalibr"
                className="inline-flex items-center px-6 py-3 text-sm font-medium rounded-full transition-all duration-300"
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
                Explore AvaliaBR
              </Link>
              <Link
                to="/pii-br"
                className="inline-flex items-center px-6 py-3 text-sm font-medium rounded-full transition-all duration-300"
                style={{
                  background: "transparent",
                  color: P.plum,
                  border: `1px solid ${P.warm}`,
                  fontFamily: "var(--font-sans)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = P.cream;
                  e.currentTarget.style.borderColor = P.mauve;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = P.warm;
                }}
              >
                Explore pii-br
              </Link>
            </motion.div>
          </RevealGroup>
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <RevealGroup staggerDelay={0.1}>
            <motion.p
              variants={fadeUp}
              className="text-xs font-medium tracking-[0.25em] uppercase mb-6"
              style={{
                color: P.mauve,
                fontFamily: "var(--font-sans)",
              }}
            >
              Principles
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-semibold leading-tight mb-12 max-w-3xl"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 500,
                color: P.plum,
              }}
            >
              How PAIVA approaches{" "}
              <span style={{ color: P.mauve }}>the work.</span>
            </motion.h2>

            <div className="grid sm:grid-cols-2 gap-8">
              {[
                {
                  title: "Brazilian context",
                  description:
                    "Technology designed around the realities where it will actually operate — local laws, institutions, languages, and public services.",
                },
                {
                  title: "Inspectable systems",
                  description:
                    "Explicit criteria, deterministic logic, and reproducible artifacts where the work supports them. Systems should be readable, understandable, and open to verification.",
                },
                {
                  title: "Safety before claims",
                  description:
                    "Evaluate the instrument before trusting the ranking. Evidence before trust.",
                },
                {
                  title: "Open infrastructure",
                  description:
                    "Build tools that others can inspect, test, reproduce, and improve. Infrastructure, not black boxes.",
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
                    className="text-lg font-semibold mb-2"
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

      {/* ─── FOUNDER ─── */}
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
              Founder
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
              Founded by Sauanna Paiva.
            </motion.h2>

            <div className="space-y-6 max-w-2xl">
              <motion.p
                variants={fadeUp}
                className="text-base lg:text-lg leading-relaxed"
                style={{
                  color: P.plumSoft,
                  fontFamily: "var(--font-sans)",
                  fontWeight: 300,
                  lineHeight: 1.75,
                }}
              >
                PAIVA was founded to develop independent technology around AI
                evaluation, security, responsible AI, and Brazilian technological
                capability. The work combines software development, open
                research, and a long-term interest in public-interest
                technology.
              </motion.p>
            </div>

            {/* Mission note */}
            <motion.div
              variants={fadeUp}
              className="mt-10 p-6 rounded-xl max-w-2xl"
              style={{ background: P.cream, border: `1px solid ${P.warm}` }}
            >
              <p
                className="text-sm leading-relaxed"
                style={{
                  color: P.mauve,
                  fontFamily: "var(--font-sans)",
                  fontWeight: 400,
                  lineHeight: 1.7,
                }}
              >
                PAIVA's longer-term mission also includes expanding access to
                technology and AI education for young people in Northeast Brazil.
              </p>
            </motion.div>

            {/* Social links */}
            <motion.div variants={fadeUp} className="flex gap-5 mt-10">
              {[
                { label: "GitHub", href: "#" },
                { label: "LinkedIn", href: "#" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm transition-colors duration-300 hover:opacity-60"
                  style={{
                    color: P.mauve,
                    fontFamily: "var(--font-sans)",
                    fontWeight: 400,
                  }}
                >
                  {link.label} →
                </a>
              ))}
            </motion.div>
          </RevealGroup>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 lg:py-28">
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
              Interested in collaborating?
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
              Whether you are working on AI evaluation, public-sector
              technology, or responsible AI in Brazil, we would like to hear from
              you.
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
