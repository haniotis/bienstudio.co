import { Logo } from "@/components/logo"
import { Logomark } from "@/components/logomark"
import { Heading } from "@/components/ui/heading"

// Dark splash for Bien Studio: wordmark top-left, "Say hello" top-right, and a
// large faint logomark centered behind the tagline.
export default function Home() {
  return (
    <div className="flex min-h-svh flex-col px-6 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10">
      {/* Header */}
      <header className="flex items-center justify-between">
        <Logo className="text-strong h-5 w-auto" />
        <a
          href="mailto:hello@bienstudio.co"
          className="text-foreground hover:text-strong text-sm transition-colors"
        >
          Say hello
        </a>
      </header>

      {/* Centered tagline over the faint logomark */}
      <main className="relative flex flex-1 items-center justify-center py-8">
        {/* Fills the center area and always fits: height tracks the available
            space, width is clamped, and the SVG letterboxes to stay whole. */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center select-none">
          <Logomark
            decorative
            className="text-strong h-full max-h-[560px] w-auto max-w-[80%] opacity-[0.05]"
          />
        </div>
        <Heading
          size={1}
          tag="h1"
          className="relative max-w-[18ch] text-center text-balance"
        >
          A digital brand and product design studio.
        </Heading>
      </main>
    </div>
  )
}
