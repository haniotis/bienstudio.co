import { cn } from "@/utils/cn"
import { logos } from "./logos"

// Renders a client's logo as an inline SVG component from the `logos` registry
// (keyed by slug) — no <img>, no network request, no load-in flicker, and the
// mark draws in the current text colour. Falls back to a text wordmark when a
// slug has no registered mark.
//
// Height = base × per-logo scale, in container units, so marks scale with their
// cell (the cell must establish a size container — see TrustedBy). The base is
// the `34cqh` in the class below (change it to resize every logo at once); the
// per-logo multiplier is each client's `scale` (data.ts), read from the
// inherited `--logo-scale` variable set on the cell. Pass `className` for a
// fixed height where there's no container (e.g. the testimonial).
export function ClientLogo({
  name,
  slug,
  className,
}: {
  name: string
  slug: string
  className?: string
}) {
  const Logo = logos[slug]

  if (Logo) {
    return (
      <Logo
        className={cn(
          "text-strong h-[calc(var(--logo-scale,1)*34cqh)] w-auto max-w-[70cqw]",
          className,
        )}
      />
    )
  }

  return (
    <span
      className={cn(
        "text-strong text-lg font-semibold tracking-tight",
        className,
      )}
    >
      {name}
    </span>
  )
}
