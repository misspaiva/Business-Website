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

const DOMAINS = [
  "All",
  "Health / SUS",
  "Privacy",
  "Evaluation",
  "Language",
  "Public sector",
] as const;

type Dataset = {
  _id: string;
  slug: string;
  title: string;
  description: string;
  domain: string;
  format: string;
  version: string;
};

/**
 * This public catalog intentionally starts empty. Entries belong here only
 * after their source, licence, version, and validation boundary are ready to
 * be shown publicly. The original export depended on an unavailable Convex
 * deployment, which made the catalog misleading outside Freebuff.
 */
const PUBLISHED_DATASETS: Dataset[] = [];

/* ─── Animation variants ─── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const stagger = (d = 0.08): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: d } },
});

/* ─── Scroll reveal ─── */
function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
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
      { threshold: 0.1 },
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
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Domain badge ─── */
function DomainBadge({ domain }: { domain: string }) {
  const color = P.mauve;

  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wide"
      style={{
        color,
        border: `1px solid ${color}30`,
        background: `${color}0a`,
        fontFamily: "var(--font-sans)",
      }}
    >
      {domain}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════
   DATASETS CATALOG PAGE
   ═══════════════════════════════════════════════════════════ */
export default function Datasets() {
  const datasets = PUBLISHED_DATASETS;
  const [search, setSearch] = useState("");
  const [activeDomain, setActiveDomain] = useState("All");

  const filtered = (datasets ?? []).filter((d: { title: string; description: string; domain: string }) => {
    const matchesSearch =
      search === "" ||
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.description.toLowerCase().includes(search.toLowerCase()) ||
      d.domain.toLowerCase().includes(search.toLowerCase());
    const matchesDomain =
      activeDomain === "All" || d.domain === activeDomain;
    return matchesSearch && matchesDomain;
  });

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
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${P.blush} 0%, ${P.cream} 60%)`,
          }}
        />

        <div className="relative max-w-5xl mx-auto px-6 lg:px-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs font-medium tracking-[0.25em] uppercase mb-6"
            style={{ color: P.mauve }}
          >
            Datasets
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.08] mb-6 max-w-3xl"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}
          >
            Datasets for{" "}
            <span style={{ color: P.mauve }}>Brazilian AI.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg max-w-2xl mb-10 leading-relaxed"
            style={{ color: P.plumSoft, fontWeight: 300, lineHeight: 1.7 }}
          >
            A public registry for evaluation datasets, test fixtures, and reference
            materials used to build and validate AI systems in Brazilian contexts.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-xl"
          >
            <input
              type="text"
              aria-label="Search datasets"
              placeholder="Search datasets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-5 py-3.5 rounded-xl text-sm outline-none transition-all duration-300"
              style={{
                background: PAIVA.surface,
                border: `1px solid ${P.warm}`,
                color: P.plum,
                fontFamily: "var(--font-sans)",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = P.mauve;
                e.currentTarget.style.boxShadow = `0 4px 16px ${P.plum}0a`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = P.warm;
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* ─── DOMAIN FILTERS ─── */}
      <section className="pb-8">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-2"
          >
            {DOMAINS.map((domain) => (
              <button
                key={domain}
                onClick={() => setActiveDomain(domain)}
                className="px-4 py-2 rounded-full text-xs font-medium transition-all duration-300"
                style={{
                  background:
                    activeDomain === domain ? P.plum : "transparent",
                  color: activeDomain === domain ? P.cream : P.mauve,
                  border: `1px solid ${
                    activeDomain === domain ? P.plum : P.warm
                  }`,
                  fontFamily: "var(--font-sans)",
                }}
              >
                {domain}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── DATASET GRID ─── */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p style={{ color: P.mauveLight }}>
                {search || activeDomain !== "All"
                  ? "No datasets match your search."
                  : "The public catalog is being prepared. Datasets will appear here only with their provenance, licence, version, and validation boundary."}
              </p>
            </div>
          ) : (
            <motion.div
              variants={stagger(0.06)}
              initial="hidden"
              animate="visible"
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filtered.map((dataset: { _id: string; slug: string; title: string; description: string; domain: string; format: string; version: string }) => (
                <motion.div key={dataset._id} variants={fadeUp}>
                  <Link
                    to={`/datasets/${dataset.slug}`}
                    className="block group rounded-xl p-6 transition-all duration-400 h-full"
                    style={{
                      background: PAIVA.surface,
                      border: `1px solid ${P.warm}`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = P.mauve;
                      e.currentTarget.style.boxShadow = `0 8px 30px ${P.plum}0a`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = P.warm;
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <DomainBadge domain={dataset.domain} />
                      <span
                        className="text-[10px] tracking-wide"
                        style={{ color: P.mauveLight }}
                      >
                        {dataset.format}
                      </span>
                    </div>

                    <h3
                      className="text-lg font-semibold mb-2 group-hover:translate-x-0.5 transition-transform duration-300"
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontWeight: 600,
                        color: P.plum,
                      }}
                    >
                      {dataset.title}
                    </h3>

                    <p
                      className="text-sm leading-relaxed mb-4 line-clamp-3"
                      style={{
                        color: P.plumSoft,
                        fontWeight: 300,
                        lineHeight: 1.65,
                      }}
                    >
                      {dataset.description}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <span
                        className="text-[10px] tracking-wide"
                        style={{ color: P.mauveLight }}
                      >
                        v{dataset.version}
                      </span>
                      <span
                        className="text-xs font-medium transition-all duration-300 group-hover:translate-x-1"
                        style={{ color: P.mauve }}
                      >
                        View →
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
