import { cn } from "@/utils/cn"

// The hero banner: a uniform dot matrix faded with a radial mask so the dots
// bloom out of the bottom-centre, like light off a horizon. Pure CSS — one
// tiled radial-gradient for the dots, a second as a mask for the falloff — so
// it costs nothing to render and scales to any width. Decorative only.
export function DotGrid({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "text-strong aspect-[1600/600] w-full select-none",
        className,
      )}
      style={{
        backgroundImage:
          "radial-gradient(currentColor 0.9px, transparent 1.1px)",
        backgroundSize: "12px 12px",
        backgroundPosition: "center",
        color: "color-mix(in oklab, var(--color-strong) 55%, transparent)",
        WebkitMaskImage:
          "radial-gradient(115% 150% at 50% 118%, #000 12%, transparent 62%)",
        maskImage:
          "radial-gradient(115% 150% at 50% 118%, #000 12%, transparent 62%)",
      }}
    />
  )
}
