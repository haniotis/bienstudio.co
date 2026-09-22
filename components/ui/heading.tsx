import { cn } from "@/utils/cn"
import { cva, type VariantProps } from "class-variance-authority"
import React from "react"

// A 1–6 type scale, fluid via clamp() (see the --text-h* tokens). 1 is the
// hero display size (88px desktop); 6 is the mono uppercase eyebrow/label.
// font-feature-settings forces ligatures on — the negative letter-spacing
// otherwise lets browsers drop the font's optional (standard + contextual)
// ligatures.
const headingVariants = cva(
  "[font-feature-settings:'liga'_1,'calt'_1] block font-heading text-strong",
  {
    variants: {
      size: {
        1: "text-h1 font-normal",
        2: "text-h2 font-normal",
        3: "text-h3 font-normal",
        4: "text-h4 font-normal",
        5: "text-h5 font-normal",
        6: "font-mono text-h6 uppercase",
      },
    },
    defaultVariants: {
      size: 2,
    },
  },
)

interface HeadingProps
  extends
    React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof headingVariants> {
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "blockquote"
  children: React.ReactNode
}

export function Heading({
  size,
  tag,
  children,
  className,
  ...props
}: HeadingProps) {
  const Tag = tag || (typeof size === "number" ? `h${size}` : "p")

  return (
    <Tag className={cn(headingVariants({ size }), className)} {...props}>
      {children}
    </Tag>
  )
}
