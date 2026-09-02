import Link from "next/link"
import { forwardRef } from "react"

// Utility function to check if a link is internal or external
const isExternalLink = (href: string): boolean => {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("//")
  )
}

// Attribute types are element-agnostic so callers rendering a button-like
// link (e.g. Button with href) can spread their props straight through.
interface SmartLinkProps extends React.HTMLAttributes<HTMLElement> {
  href: string
  target?: string
  rel?: string
}

// forwardRef so it can be used with libraries' `render` props that need to
// attach a ref to the underlying anchor.
const SmartLink = forwardRef<HTMLAnchorElement, SmartLinkProps>(
  function SmartLink({ href, children, target, rel, ...props }, ref) {
    if (isExternalLink(href)) {
      const resolvedTarget = target ?? "_blank"
      return (
        <a
          ref={ref}
          href={href}
          target={resolvedTarget}
          rel={resolvedTarget === "_blank" ? "noopener noreferrer" : rel}
          {...props}
        >
          {children}
        </a>
      )
    }

    return (
      <Link ref={ref} href={href} target={target} rel={rel} {...props}>
        {children}
      </Link>
    )
  },
)

export default SmartLink
