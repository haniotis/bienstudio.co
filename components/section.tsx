import { cn } from "@/utils/cn"
import { ReactNode, forwardRef, type ElementType } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import GridContainer from "./grid-container"
import { Heading } from "./ui/heading"
import { widowFix } from "@/utils/widowFix"

export const SECTION_GAP =
  "space-y-12 md:space-y-14 lg:space-y-16 xl:space-y-20"

// The same scale as SECTION_GAP as a grid row-gap — for grids, where `space-y`
// can't stand in for the vertical gap between (wrapping) items.
export const SECTION_GAP_Y = "gap-y-12 md:gap-y-14 lg:gap-y-16 xl:gap-y-20"

// Vertical rhythm for a section. `default` is roomy; `tight` tweens between 10
// and 20 (heroes and page headers); `none` removes all vertical padding. Use
// `flushTop`/`flushBottom` (below) to drop a single side and butt sections
// together.
const sectionVariants = cva("bg-background relative", {
  variants: {
    padding: {
      none: "py-0",
      tight: "py-12 md:py-14 lg:py-16 xl:py-20",
      default: "py-20 md:py-24 lg:py-32 xl:py-36",
    },
  },
  defaultVariants: {
    padding: "default",
  },
})

// Editor-selectable section surface. The background is painted full-bleed on
// the `<section>`, so it always spans the page width. `none` inherits the page
// background; `subtle` and `dark` are distinct surfaces.
export type SectionBackground = "none" | "subtle" | "dark"

const backgroundClass: Record<SectionBackground, string> = {
  none: "",
  subtle: "bg-alt",
  dark: "dark bg-background",
}

interface SectionHeadingProps {
  heading: string
  /** Optional mono eyebrow rendered above the heading, in the accent colour. */
  eyebrow?: string
  className?: string
  description?: string
}

const SectionHeading = ({
  heading,
  eyebrow,
  className,
  description,
}: SectionHeadingProps) => {
  return (
    <GridContainer>
      <div
        className={cn(
          "col-span-6 md:col-span-11 lg:col-span-18 xl:col-span-16",
          className,
        )}
      >
        {eyebrow && (
          <Heading
            size={6}
            tag="p"
            className="text-primary mb-3 lg:mb-4 xl:mb-5"
          >
            {eyebrow}
          </Heading>
        )}
        <Heading size={2} tag="h2" className="text-pretty">
          {heading}
        </Heading>
        {description && (
          <p className="text-foreground mt-3 text-lg">
            {widowFix(description)}
          </p>
        )}
      </div>
    </GridContainer>
  )
}

export { SectionHeading }

/** The element `Section` renders as. Defaults to `section`. */
export type SectionTag =
  "section" | "div" | "article" | "aside" | "header" | "footer" | "main"

export interface SectionProps extends VariantProps<typeof sectionVariants> {
  children: ReactNode
  className?: string
  id?: string
  /** Swap the rendered element — e.g. `div` when a `<section>` isn't right. */
  tag?: SectionTag
  /** The section's surface. Painted full-bleed. Defaults to `none`. */
  background?: SectionBackground
  /**
   * Opt this section into reversing the sticky nav (light → dark) while it sits
   * under the header — set it on dark sections so the nav stays legible.
   */
  navbarReverse?: boolean
  /** Drop the top padding so this section butts up against the one above. */
  flushTop?: boolean
  /** Drop the bottom padding so the next section butts up against this one. */
  flushBottom?: boolean
  /** Add a divider along the top edge, in the border color. */
  borderTop?: boolean
  /** Add a divider along the bottom edge, in the border color. */
  borderBottom?: boolean
}

/**
 * The Section props a section component forwards to its own Section — an `id`
 * (for anchor links), the flush joins, and the border dividers. Spread onto
 * `<Section {...chrome} />` and expose on the component so callers can set them.
 */
export type SectionChrome = Pick<
  SectionProps,
  "id" | "flushTop" | "flushBottom" | "borderTop" | "borderBottom"
>

const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      children,
      className,
      id,
      tag: Tag = "section",
      background = "none",
      navbarReverse,
      flushTop,
      flushBottom,
      borderTop,
      borderBottom,
      padding,
    },
    ref,
  ) => {
    // Cast to ElementType so the ref (typed to the base HTMLElement) is
    // accepted regardless of which concrete element `tag` resolves to.
    const Component = Tag as ElementType
    return (
      <Component
        ref={ref}
        className={cn(
          sectionVariants({ padding }),
          backgroundClass[background],
          flushTop && "pt-0!",
          flushBottom && "pb-0!",
          borderTop && "border-border border-t",
          borderBottom && "border-border border-b",
          className,
        )}
        id={id}
        data-navbar-reverse={navbarReverse ? "true" : undefined}
      >
        {children}
      </Component>
    )
  },
)
Section.displayName = "Section"

export default Section
export { Section }
