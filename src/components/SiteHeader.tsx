import { Link, useLocation } from "react-router";
import { PAIVA } from "@/lib/paivaPalette";

const navigation = [
  { label: "Home", to: "/" },
  { label: "Ecosystem", to: "/ecosystem" },
  { label: "AvaliaBR", to: "/avalibr" },
  { label: "pii-br", to: "/pii-br" },
  { label: "Datasets", to: "/datasets" },
  { label: "About", to: "/about" },
] as const;

type SiteHeaderProps = {
  tone?: "dark" | "light";
};

/**
 * The public portal uses one navigation model on every route. The only
 * variation is its surface tone, so the dark home hero can stay intact.
 */
export function SiteHeader({ tone = "light" }: SiteHeaderProps) {
  const { pathname } = useLocation();
  const isDark = tone === "dark";
  const foreground = isDark ? PAIVA.pearl : PAIVA.ink;
  const muted = isDark ? "rgba(246, 243, 237, 0.68)" : PAIVA.graphite;
  const surface = isDark ? "rgba(23, 23, 22, 0.94)" : "rgba(246, 243, 237, 0.92)";
  const line = isDark ? "rgba(246, 243, 237, 0.14)" : "rgba(23, 23, 22, 0.10)";

  const linkClassName =
    "text-sm transition-opacity duration-200 hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b"
      style={{
        background: surface,
        borderColor: line,
        backdropFilter: "blur(16px)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:h-20 lg:px-12">
        <Link
          to="/"
          aria-label="PAIVA — Home"
          className="group flex items-center gap-3 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{ color: foreground }}
        >
          <span
            aria-hidden="true"
            className="grid h-7 w-7 place-items-center rounded-md text-sm font-bold transition-transform duration-200 group-hover:scale-105"
            style={{ background: foreground, color: isDark ? PAIVA.ink : PAIVA.pearl }}
          >
            P
          </span>
          <span className="text-sm font-bold tracking-[0.18em]">PAIVA</span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-5 md:flex lg:gap-6">
          {navigation.map((item) => {
            const isCurrent = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={isCurrent ? "page" : undefined}
                className={linkClassName}
                style={{ color: isCurrent ? foreground : muted, fontWeight: isCurrent ? 600 : 400 }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <details className="group relative md:hidden">
          <summary
            className="list-none rounded-sm px-2 py-1 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden"
            style={{ color: foreground }}
          >
            Menu
          </summary>
          <nav
            aria-label="Mobile navigation"
            className="absolute right-0 top-[calc(100%+0.75rem)] w-52 rounded-lg border p-2 shadow-xl"
            style={{ background: isDark ? PAIVA.inkSoft : PAIVA.paper, borderColor: line }}
          >
            {navigation.map((item) => {
              const isCurrent = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={isCurrent ? "page" : undefined}
                  className="block rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-black/[0.05] focus-visible:outline-none focus-visible:ring-2"
                  style={{ color: isCurrent ? foreground : muted, fontWeight: isCurrent ? 600 : 400 }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </details>
      </div>
    </header>
  );
}
