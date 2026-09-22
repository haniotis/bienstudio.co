import { type ReactNode } from "react"
import { cn } from "@/utils/cn"

// A pill label: mono, uppercase, hairline-bordered, at the text-xs scale. Used
// for project/category tags. Pass `className` to extend per use.
export function Tag({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        "border-border text-foreground shrink-0 rounded-full border px-2.5 py-1 font-mono text-xs whitespace-nowrap uppercase",
        className,
      )}
    >
      {children}
    </span>
  )
}
