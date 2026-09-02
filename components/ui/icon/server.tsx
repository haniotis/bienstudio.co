import type React from "react"
import { icons } from "lucide-react"
import { cn } from "@/utils/cn"
import type { IconName } from "./index"

const iconSizeClasses: Record<string, string> = {
  lg: "size-6",
  default: "size-4",
  sm: "size-3",
}

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  name: IconName
  className?: string
  iconProps?: React.SVGProps<SVGSVGElement>
  size?: "default" | "sm" | "lg" | string
}

/**
 * Server-rendered icon covering the ENTIRE Lucide set (~1700), for
 * editor-chosen icons that can be any name. It renders the SVG inline at
 * request time, so the icon is already in the SSR HTML — no client JS, no
 * load-in flash. The full icon map is imported only here, in this server-only
 * module, so it never ships to the browser.
 *
 * Use this for CMS/content icons. For interactive UI in client components, use
 * ./index (the lean, statically-bundled core set) instead.
 */
export function Icon({
  name,
  className,
  iconProps,
  size,
  ...props
}: IconProps) {
  const LucideIcon = icons[name]
  if (!LucideIcon) return null

  const iconSize = size
    ? (iconSizeClasses[size] ?? size)
    : "size-4"

  return (
    <div className="inline-flex items-center justify-center" {...props}>
      <LucideIcon className={cn(iconSize, "shrink-0", className)} {...iconProps} />
    </div>
  )
}
