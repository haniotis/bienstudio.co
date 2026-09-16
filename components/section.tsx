import { cn } from "@/utils/cn"
import { ReactNode, forwardRef, type ElementType } from "react"
import { cva, type VariantProps } from "class-variance-authority"

// Stacks sections and sets the page's vertical rhythm (applied to <main>, see
// app/page.tsx): a flex column whose fluid gap AND matching top padding both
// run 64px → 112px across 375px → 1728px — so the first section starts with the
// same breathing room that separates the rest. (Flex `gap` rather than
// `space-y`: Tailwind reliably emits arbitrary `gap-[clamp()]`, not
// `space-y-[clamp()]`. Kept as one literal string so Tailwind can scan it.)
export const SECTION_SPACE =
  "flex flex-col gap-[clamp(4rem,3.169rem_+_3.548vw,7rem)] pt-[clamp(4rem,3.169rem_+_3.548vw,7rem)]"

// Sections carry NO vertical padding — the page rhythm comes entirely from the
// SECTION_SPACE gap on the container that stacks them (see app/page.tsx).
const sectionVariants = cva("bg-background relative")

// Editor-selectable section surface. The background is painted full-bleed on
// the `<section>`, so it always spans the page width. `none` inherits the page
// background; `subtle` and `dark` are distinct surfaces.
export type SectionBackground = "none" | "subtle" | "dark"

const backgroundClass: Record<SectionBackground, string> = {
  none: "",
  subtle: "bg-alt",
  dark: "dark bg-background",
}

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
}

const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      children,
      className,
      id,
      tag: Tag = "section",
      background = "none",
      navbarReverse,
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
          sectionVariants(),
          backgroundClass[background],
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
