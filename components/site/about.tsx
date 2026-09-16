import { Section } from "@/components/section"
import { Wrapper } from "@/components/wrapper"
import { Heading } from "@/components/ui/heading"
import { SectionEyebrow } from "./section-eyebrow"
import { about } from "./data"

// Studio positioning: a mono eyebrow over a two-tone statement, closed with a
// full-width rule that leads into the work below.
export function About() {
  return (
    <Section tag="div" id="about">
      <Wrapper>
        <SectionEyebrow>About us</SectionEyebrow>
        <Heading size={1} tag="h2" className="text-pretty">
          {about.lead}{" "}
          <span className="text-muted-foreground">{about.muted}</span>
        </Heading>
      </Wrapper>
    </Section>
  )
}
