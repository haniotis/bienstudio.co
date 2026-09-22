"use client"

import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/utils/cn"
import { IconProvider } from "./icon/icon-context"
import SmartLink from "./smart-link"
import { Icon } from "./icon"

// A single button style — a filled, highest-contrast surface (black on light,
// white on dark) with the page background as the label colour. `size` is the
// only axis; restyle a one-off via `className`.
const buttonVariants = cva(
  "inline-flex relative items-center justify-center cursor-pointer px-5.5 gap-1.5 whitespace-nowrap border border-transparent bg-strong text-background hover:bg-[color-mix(in_oklab,var(--color-strong)_85%,gray)] transition-[color,background-color,border-color,opacity,box-shadow] duration-200 disabled:pointer-events-none disabled:opacity-50 shrink-0",
  {
    variants: {
      size: {
        default: "h-[var(--button-height)] rounded-full",
        sm: "h-[var(--button-height-sm)] px-3.5 gap-1 justify-center rounded-full",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
)

type ButtonTag = "button" | "div" | "span"

interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string
  /** Only meaningful with `href` — forwarded to the underlying link */
  target?: string
  rel?: string
  /**
   * Renders the button as a perfect square — set when the only content is
   * an icon. Explicit (rather than sniffing children) because children
   * created in server components arrive here as opaque references on the
   * client, so type inspection differs between SSR and hydration.
   */
  iconOnly?: boolean
  children: React.ReactNode
  isLoading?: boolean
  tag?: ButtonTag
}

const LoadingSpinner = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <Icon
      name="LoaderCircle"
      className="animate-spin [animation-duration:0.5s]"
    />
  </div>
)

export function Button({
  size,
  href,
  iconOnly,
  children,
  className,
  isLoading,
  disabled,
  tag: Tag = "button",
  ...props
}: ButtonProps) {
  const classes = cn(
    buttonVariants({ size }),
    iconOnly && "aspect-square w-auto justify-center px-0",
    className,
  )
  const isDisabled = disabled || isLoading
  // Loading keeps the content mounted (transparent) so the button never
  // resizes — the spinner overlays it via absolute positioning.
  const content = (
    <>
      {/* Label type: small, sentence case. text-inherit keeps the button's
          own text colour. */}
      <span
        className={cn(
          "flex w-full items-center text-sm font-medium text-inherit [justify-content:inherit] [gap:inherit]",
          isLoading && "opacity-0",
        )}
      >
        {children}
      </span>
      {isLoading && <LoadingSpinner />}
    </>
  )

  const button = href ? (
    <SmartLink href={href} className={classes} {...props}>
      {content}
    </SmartLink>
  ) : (
    <Tag
      className={classes}
      {...(Tag === "button" ? { disabled: isDisabled } : {})}
      {...(props as React.HTMLAttributes<HTMLElement>)}
    >
      {content}
    </Tag>
  )

  return (
    <IconProvider buttonSize={size || "default"}>{button}</IconProvider>
  )
}
