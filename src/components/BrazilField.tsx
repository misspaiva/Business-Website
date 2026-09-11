import { motion } from "framer-motion";
import { PAIVA } from "@/lib/paivaPalette";

// Simplified from Natural Earth's public-domain Admin 0 country boundary for Brazil.
const BRAZIL_PATH = "M271.8,493.1 L268.5,486.3 L273.8,480.5 L266.9,472.4 L257.4,465.7 L245.1,458.0 L240.6,458.4 L228.5,449.1 L220.7,450.4 L236.8,434.0 L250.3,422.3 L258.4,417.4 L268.5,410.8 L268.8,401.2 L262.7,394.2 L256.8,396.5 L259.2,389.6 L260.8,382.5 L260.8,375.9 L256.5,373.7 L252.0,375.6 L247.5,375.1 L246.1,370.5 L244.9,359.5 L242.7,355.9 L234.6,352.6 L229.7,355.0 L217.0,352.7 L217.8,336.3 L214.2,329.6 L218.0,327.2 L216.8,320.3 L220.1,315.0 L222.2,305.6 L219.4,298.1 L212.8,294.7 L211.6,290.0 L213.3,283.0 L190.3,282.5 L185.6,268.5 L189.2,268.3 L189.0,263.1 L186.7,259.6 L186.1,252.7 L179.1,249.1 L171.6,249.2 L166.6,245.7 L158.5,243.4 L153.7,238.9 L140.3,236.9 L127.2,226.1 L128.2,218.1 L126.7,213.4 L128.0,204.4 L112.3,206.5 L105.9,211.0 L95.4,215.8 L92.7,219.5 L86.5,219.7 L77.6,218.7 L70.8,220.8 L65.3,219.4 L66.1,201.2 L56.3,208.2 L45.7,207.9 L41.1,201.5 L33.1,200.8 L35.7,195.7 L29.0,188.3 L24.0,177.5 L27.2,175.3 L27.2,170.2 L34.4,166.8 L33.2,160.3 L36.3,156.1 L37.2,150.5 L50.9,142.3 L60.8,140.0 L62.4,138.2 L73.2,138.7 L78.6,105.8 L78.9,100.6 L77.0,93.7 L71.7,89.3 L71.8,80.5 L78.5,78.6 L80.9,79.8 L81.3,75.2 L74.3,74.0 L74.1,66.4 L97.6,66.7 L101.5,62.6 L104.9,66.4 L107.2,73.5 L109.5,72.0 L116.1,78.3 L125.5,77.6 L127.8,73.9 L136.7,71.1 L141.7,69.1 L143.1,64.0 L151.7,60.6 L151.0,58.1 L140.8,57.0 L139.2,49.5 L139.6,41.4 L134.3,38.3 L136.5,37.2 L145.4,38.7 L155.0,41.7 L158.5,38.9 L167.1,37.0 L180.5,32.5 L184.9,27.9 L183.4,24.5 L189.6,24.0 L192.4,26.8 L190.8,32.0 L195.0,33.9 L197.7,39.5 L194.4,43.7 L192.5,53.9 L195.6,60.0 L196.4,65.6 L203.8,71.2 L209.7,71.8 L211.1,69.5 L214.9,68.9 L220.3,66.8 L224.2,63.6 L230.9,64.6 L233.8,64.2 L240.3,65.2 L241.4,62.7 L239.4,60.4 L240.6,56.9 L245.4,57.9 L251.1,56.7 L258.0,59.3 L263.3,61.7 L267.0,58.5 L269.7,59.0 L271.3,62.4 L277.1,61.5 L281.7,56.9 L285.4,48.1 L292.5,37.1 L296.6,36.5 L299.5,43.2 L306.3,64.2 L312.7,66.2 L313.0,74.5 L304.0,84.4 L307.7,88.0 L329.0,89.9 L329.4,101.9 L338.6,94.0 L353.7,98.4 L373.7,105.7 L379.5,112.8 L377.6,119.4 L391.5,115.7 L414.9,122.1 L432.9,121.6 L450.7,131.5 L466.0,145.0 L475.3,148.5 L485.6,149.0 L489.9,152.8 L494.0,168.1 L496.0,175.3 L491.2,195.2 L485.1,203.1 L468.1,219.8 L460.5,233.4 L451.6,243.8 L448.6,244.1 L445.2,252.9 L446.1,275.4 L442.7,294.0 L441.4,301.9 L437.6,306.6 L435.5,322.7 L423.3,338.4 L421.3,350.8 L411.5,356.0 L408.7,363.2 L395.7,363.2 L376.8,367.8 L368.3,373.2 L354.8,376.7 L340.7,386.3 L330.5,398.2 L328.7,407.2 L330.7,413.8 L328.5,425.9 L325.8,431.8 L317.4,438.4 L304.0,459.6 L293.5,469.1 L285.3,474.8 L279.8,486.2 L271.8,493.1 Z";

const cities = [
  { name: "Belém", x: 330.6, y: 104.6, labelX: 12, labelY: -12 },
  { name: "Teresina", x: 398.9, y: 148.2, labelX: 12, labelY: -10 },
  { name: "Recife", x: 494.2, y: 183.8, labelX: -12, labelY: -10, anchor: "end" },
  { name: "Salvador", x: 450.7, y: 243.1, labelX: 12, labelY: 20 },
  { name: "São Paulo", x: 352.9, y: 370.2, labelX: 12, labelY: 20 },
];

export function BrazilField() {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.25 }}
      className="w-full max-w-[590px]"
      aria-labelledby="brazil-map-caption"
    >
      <svg viewBox="0 0 520 520" role="img" className="w-full h-auto overflow-visible">
        <title id="brazil-map-caption">Rede territorial da PAIVA conectando Brasília a cinco cidades brasileiras.</title>
        <path d={BRAZIL_PATH} fill="none" stroke={`${PAIVA.pearl}6b`} strokeWidth="1.15" vectorEffect="non-scaling-stroke" />
        <path d={BRAZIL_PATH} fill="none" stroke={`${PAIVA.pearl}1f`} strokeWidth="8" vectorEffect="non-scaling-stroke" />

        <g fill="none" stroke={`${PAIVA.pearl}80`} strokeWidth="1" vectorEffect="non-scaling-stroke">
          {cities.map((city, index) => (
            <motion.path
              key={city.name}
              d={`M337.9 277 Q ${(337.9 + city.x) / 2 + (index % 2 ? 16 : -16)} ${(277 + city.y) / 2 - 24} ${city.x} ${city.y}`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.55 + index * 0.13, ease: "easeOut" }}
            />
          ))}
        </g>

        <g>
          {cities.map((city, index) => (
            <motion.g key={city.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 + index * 0.13 }}>
              <circle cx={city.x} cy={city.y} r="3.8" fill={PAIVA.pearl} />
              <text
                x={city.x + city.labelX}
                y={city.y + city.labelY}
                textAnchor={city.anchor === "end" ? "end" : "start"}
                fill={`${PAIVA.pearl}e6`}
                fontSize="11"
                fontFamily="var(--font-sans)"
                className="hidden sm:block"
              >
                {city.name}
              </text>
            </motion.g>
          ))}
        </g>

        <motion.g initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5, duration: 0.55 }} style={{ transformOrigin: "337.9px 277px" }}>
          <circle cx="337.9" cy="277" r="9" fill={`${PAIVA.pearl}26`} />
          <circle cx="337.9" cy="277" r="5.2" fill={PAIVA.pearl} />
          <text x="350" y="281" fill={PAIVA.pearl} fontSize="12" fontFamily="var(--font-sans)">Brasília</text>
        </motion.g>
      </svg>
      <figcaption className="sr-only">Mapa baseado em fronteira pública de países Natural Earth, simplificado para visualização editorial.</figcaption>
    </motion.figure>
  );
}
