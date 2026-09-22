"use client"

import { BlossomCarousel, type BlossomCarouselProps } from "@blossom-carousel/react"
import "@blossom-carousel/react/style.css"

// Thin client boundary around Blossom's carousel. The package calls
// createContext at module scope without its own "use client" directive, so it
// can't be imported straight into a Server Component — this wrapper isolates it
// on the client. Slides are passed through as children.
export function ProjectCarousel(props: BlossomCarouselProps) {
  return <BlossomCarousel {...props} />
}
