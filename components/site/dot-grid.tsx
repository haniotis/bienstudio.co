import { cn } from "@/utils/cn"

// The hero banner: a uniform dot matrix that fades in from the top (a Tailwind
// top-edge mask — `mask-t-from-50%` fades the top half) and is solid below.
// Pure CSS — one tiled radial-gradient for the dots — so it costs nothing to
// render and scales to any width. Decorative only.
export function DotGrid({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "text-strong mask-t-from-50% aspect-[1600/600] w-full select-none",
        className,
      )}
      style={{
        backgroundImage:
          "radial-gradient(currentColor 1.8px, transparent 2.2px)",
        backgroundSize: "13px 13px",
        backgroundPosition: "center",
        color: "color-mix(in oklab, var(--color-strong) 55%, transparent)",
      }}
    />
  )
}
