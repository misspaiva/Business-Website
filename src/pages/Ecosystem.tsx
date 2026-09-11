import { motion } from "framer-motion";
import { Link } from "react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { PAIVA } from "@/lib/paivaPalette";

const P = {
  plum: PAIVA.ink,
  plumSoft: PAIVA.inkSoft,
  mauve: PAIVA.graphite,
  mauveLight: PAIVA.stone,
  cream: PAIVA.pearl,
  blush: PAIVA.paper,
  warm: PAIVA.line,
} as const;

type Layer = {
  number: string;
  title: string;
  description: string;
  status: string;
  href?: string;
};

const layers: Layer[] = [
  {
    number: "01",
    title: "Security & compliance",
    description:
      "Controls and technical primitives for privacy, sensitive-data handling, and governance in Brazilian contexts.",
    status: "pii-br prototype",
    href: "/pii-br",
  },
  {
    number: "02",
    title: "Brazilian public data",
    description:
      "A future normalized access layer for fragmented public sources. This capability is a direction, not yet a public PAIVA service.",
    status: "In formation",
  },
  {
    number: "03",
    title: "Document processing",
    description:
      "Structured extraction and analysis for Portuguese legal and administrative material, designed to build on data and security foundations.",
    status: "Research direction",
  },
  {
    number: "04",
    title: "Evaluation & credibility",
    description:
      "Methods and evidence for testing whether AI systems work reliably in Brazilian language and institutional contexts.",
    status: "AvaliaBR MVP / pilot",
    href: "/avalibr",
  },
];

export default function Ecosystem() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="min-h-screen"
      style={{ background: P.cream, color: P.plum, fontFamily: "var(--font-sans)" }}
    >
      <SiteHeader />

      <main>
        <section className="pt-36 pb-16 lg:pt-44 lg:pb-24" style={{ borderBottom: `1px solid ${P.warm}` }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              className="text-[11px] font-semibold tracking-[0.28em] uppercase mb-7"
              style={{ color: P.mauve }}
            >
              PAIVA ecosystem
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
              className="max-w-4xl text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.08]"
            >
              Capability layers, not disconnected products.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}
              className="max-w-2xl mt-7 text-base lg:text-lg leading-relaxed"
              style={{ color: P.plumSoft }}
            >
              PAIVA is building reusable technical foundations for Brazilian AI,
              data, and public-interest technology. Each layer should make the next
              one more reliable—not duplicate its machinery.
            </motion.p>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <p className="text-xs leading-relaxed max-w-2xl mb-12" style={{ color: P.mauve }}>
              The status labels distinguish active work from directions still being investigated.
            </p>
            <ol className="border-t" style={{ borderColor: P.warm }}>
              {layers.map((layer, index) => (
                <motion.li
                  key={layer.number}
                  initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.06 }}
                  className="grid md:grid-cols-[5rem_1fr_auto] gap-5 md:gap-8 py-8 md:py-10 border-b items-start"
                  style={{ borderColor: P.warm }}
                >
                  <span className="text-xs tracking-[0.18em] pt-1" style={{ color: P.mauveLight }}>{layer.number}</span>
                  <div>
                    <h2 className="text-2xl font-semibold mb-3">{layer.title}</h2>
                    <p className="max-w-2xl text-sm leading-relaxed" style={{ color: P.plumSoft }}>{layer.description}</p>
                  </div>
                  <div className="flex md:flex-col items-start md:items-end gap-4">
                    <span className="text-[10px] tracking-wide uppercase px-2.5 py-1 rounded-full" style={{ color: P.mauve, border: `1px solid ${P.mauve}40` }}>
                      {layer.status}
                    </span>
                    {layer.href && <Link to={layer.href} className="text-sm font-medium hover:opacity-60 transition-opacity" style={{ color: P.mauve }}>Explore →</Link>}
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>
      </main>

      <footer className="py-10 border-t" style={{ borderColor: P.warm }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row gap-4 justify-between text-xs" style={{ color: P.mauve }}>
          <span>PAIVA — Brazilian AI infrastructure</span>
          <Link to="/" className="hover:opacity-60 transition-opacity">Back to home</Link>
        </div>
      </footer>
    </motion.div>
  );
}
