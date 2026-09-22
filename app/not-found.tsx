import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Section } from "@/components/section"
import { Wrapper } from "@/components/wrapper"

export const metadata: Metadata = {
  title: "404 | Bien",
  description: "The page you were looking for couldn't be found.",
}

export default function NotFound() {
  return (
    <Section className="text-center">
      <Wrapper>
        <Heading size={1} tag="h1" className="mb-4 md:mb-5 lg:mb-6">
          Page not found
        </Heading>
        <p className="mb-6 lg:mb-8 xl:mb-10">
          The page you were looking for couldn&apos;t be found.
        </p>
        <Button href="/">
          Go to home
        </Button>
      </Wrapper>
    </Section>
  )
}
