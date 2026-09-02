"use client"

import React from "react"
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Award,
  BadgeCheck,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Coins,
  DollarSign,
  Download,
  FileCheck,
  FileText,
  Gauge,
  GlobeLock,
  Headphones,
  HeartPulse,
  LayoutDashboard,
  LoaderCircle,
  Menu,
  Minus,
  Package,
  PieChart,
  Plus,
  Receipt,
  RefreshCw,
  Repeat,
  Share2,
  TrendingUp,
  Users,
  Wallet,
  X,
} from "lucide-react"
// Type-only import of the full icon map — erased at build, so it costs nothing
// in the bundle but lets IconName cover every Lucide icon (~1700).
import type { icons as lucideIcons } from "lucide-react"
import { useIconContext } from "./icon-context"
import { cn } from "@/utils/cn"

// The statically-bundled core set — the icons used in interactive (client) UI:
// chevrons, menu, loader, arrows, etc. Editor-chosen icons that could be ANY
// Lucide icon render server-side instead (see ./server) — that keeps this
// client bundle small and avoids a load-in flash.
const icons = {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Award,
  BadgeCheck,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Coins,
  DollarSign,
  Download,
  FileCheck,
  FileText,
  Gauge,
  GlobeLock,
  Headphones,
  HeartPulse,
  LayoutDashboard,
  LoaderCircle,
  Menu,
  Minus,
  Package,
  PieChart,
  Plus,
  Receipt,
  RefreshCw,
  Repeat,
  Share2,
  TrendingUp,
  Users,
  Wallet,
  X,
}

// Any Lucide icon name is accepted and typechecked — not just the core set.
export type IconName = keyof typeof lucideIcons

// The statically-bundled core set — used by the kitchen-sink gallery.
export const iconNames = Object.keys(icons) as IconName[]

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  name: IconName
  className?: string
  iconProps?: React.SVGProps<SVGSVGElement>
  size?: "default" | "sm" | string
}

export const Icon = ({
  name,
  className,
  iconProps,
  size,
  ...props
}: IconProps) => {
  const { buttonSize } = useIconContext()

  const iconSizeClasses = {
    lg: "size-6",
    default: "size-4",
    sm: "size-3",
  }

  // Use the size prop if provided, otherwise fall back to context-based sizing
  const iconSize = size
    ? iconSizeClasses[size as keyof typeof iconSizeClasses] || size
    : buttonSize
      ? iconSizeClasses[buttonSize]
      : "size-4"

  // Only core icons are bundled here; anything else is a server-only icon and
  // should never reach this client component.
  const LucideIcon = icons[name as keyof typeof icons]
  if (!LucideIcon) return null

  return (
    <div className="inline-flex items-center justify-center" {...props}>
      <LucideIcon
        className={cn(iconSize, "shrink-0", className)}
        {...iconProps}
      />
    </div>
  )
}
