"use client"

import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/utils/cn"
import { IconProvider } from "./icon/icon-context"
import SmartLink from "./smart-link"
import { Icon } from "./icon"
import { Heading } from "./heading"

const buttonVariants = cva(
  "inline-flex relative items-center justify-center cursor-pointer px-5.5 gap-1.5 whitespace-nowrap transition-[color,background-color,border-color,opacity,box-shadow] duration-200 disabled:pointer-events-none disabled:opacity-50 shrink-0 ",
  {
    variants: {
      variant: {
        // Every filled/outlined variant carries the same 1px border (border-box,
        // so it lives inside the height) — transparent on the filled ones,
        // visible on secondary. This keeps the content box identical across
        // variants, so swapping between them (e.g. the nav CTA on scroll) never
        // shifts the label or resizes the button.
        primary:
          "border border-transparent bg-primary text-primary-foreground hover:bg-[color-mix(in_oklab,var(--color-primary)_80%,black)]",
        // Filled with the highest-contrast surface — black on light, white on
        // dark — with the page background as the label colour.
        strong:
          "border border-transparent bg-strong text-background hover:bg-[color-mix(in_oklab,var(--color-strong)_85%,gray)]",
        // Same border box as the filled variants, coloured in the current
        // (text) colour so the outline shows.
        secondary:
          "bg-transparent text-secondary-foreground border border-current hover:bg-strong/5",
        link: "!px-0 !h-auto rounded-none border-b touch text-primary",
        ghost: "!px-0 !h-auto rounded-none touch text-strong",
      },
      size: {
        default: "h-[var(--button-height)]",
        sm: "h-[var(--button-height-sm)] px-3.5 gap-1 justify-center",
      },
    },
    compoundVariants: [
      // Filled and bordered buttons both round to the radius token directly.
      {
        variant: ["primary", "secondary", "strong"],
        size: "default",
        className: "rounded-[var(--button-radius)]",
      },
      {
        variant: ["primary", "secondary", "strong"],
        size: "sm",
        className: "rounded-[var(--button-radius-sm)]",
      },
    ],
    defaultVariants: {
      variant: "secondary",
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
  variant,
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
    buttonVariants({ variant, size }),
    iconOnly && "aspect-square w-auto justify-center px-0",
    className,
  )
  const isDisabled = disabled || isLoading
  // Loading keeps the content mounted (transparent) so the button never
  // resizes — the spinner overlays it via absolute positioning.
  const content = (
    <>
      <Heading
        size={6}
        tag="span"
        // Heading owns the label type (mono, uppercase, text-h6 size);
        // text-inherit lets each variant's own text color show through.
        className={cn(
          "flex w-full items-center text-inherit [justify-content:inherit] [gap:inherit]",
          isLoading && "opacity-0",
        )}
      >
        {children}
      </Heading>
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
