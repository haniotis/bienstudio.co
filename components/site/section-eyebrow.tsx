import { type ReactNode } from "react"
import { Heading } from "@/components/ui/heading"
import { cn } from "@/utils/cn"

// The mono, muted label that opens each section ("Trusted by", "About us", …).
// Owns the shared responsive bottom margin so sections don't repeat it; pass
// `className` to extend or override per use.
export function SectionEyebrow({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <Heading
      size={6}
      tag="p"
      className={cn(
        "text-foreground mb-6 md:mb-8 lg:mb-10 xl:mb-14",
        className,
      )}
    >
      {children}
    </Heading>
  )
}
