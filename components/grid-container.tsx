import { cn } from "@/utils/cn"
import { ReactNode } from "react"

interface GridContainerProps {
  children: ReactNode
  className?: string
}

export default function GridContainer({
  children,
  className,
}: GridContainerProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-6 gap-4 md:grid-cols-12 lg:grid-cols-24",
        className,
      )}
    >
      {children}
    </div>
  )
}
GridContainer.displayName = "GridContainer"

export { GridContainer }
