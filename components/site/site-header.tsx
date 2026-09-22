import { Wrapper } from "@/components/wrapper"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { siteConfig } from "./data"

// Top bar (static, not sticky): mono wordmark left; availability status +
// "Let's talk" CTA right.
export function SiteHeader() {
  return (
    <header className="bg-background">
      <Wrapper>
        <div className="flex items-center justify-between gap-4 pt-8 md:pt-10 lg:pt-12">
          <a href="#top" className="touch">
            <Heading size={6} tag="span">
              {siteConfig.name}
              <sup className="ml-0.5 align-super text-[0.6em]">©</sup>
            </Heading>
          </a>

          <div className="flex items-center gap-5 sm:gap-6 md:gap-8">
            <span className="hidden items-center gap-2 sm:inline-flex">
              <span aria-hidden className="size-1.5 rounded-full bg-lime-300" />
              <span className="text-strong text-sm font-medium">
                {siteConfig.availability}
              </span>
            </span>
            <Button href={`mailto:${siteConfig.email}`} size="sm">
              Let&apos;s talk
            </Button>
          </div>
        </div>
      </Wrapper>
    </header>
  )
}
