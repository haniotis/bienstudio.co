import { ReactNode } from "react"
import { cn } from "@/utils/cn"

interface WrapperProps {
  children: ReactNode
  variant?: "default" | "narrow"
}

export default function Wrapper({
  children,
  variant = "default",
}: WrapperProps) {
  const variantClasses = {
    default: "w-full mx-auto max-w-[1240px]",
    narrow: "w-full mx-auto max-w-[880px]",
  }

  return (
    <div className="w-full px-6 sm:px-8 md:px-10 lg:px-12">
      <div className={cn(variantClasses[variant])}>{children}</div>
    </div>
  )
}
Wrapper.displayName = "Wrapper"

export { Wrapper }
