import { Section } from "@/components/section"
import { Wrapper } from "@/components/wrapper"
import { Heading } from "@/components/ui/heading"
import { DotGrid } from "./dot-grid"
import { hero } from "./data"

// Hero: one two-tone H1 (strong statement, then a muted continuation), with the
// dot-grid banner blooming beneath it.
export function Hero() {
  return (
    <>
      <Section tag="div" id="top">
        <Wrapper>
          <Heading size={1} tag="h1" className="max-w-[22ch]">
            {hero.lead}{" "}
            <span className="text-muted-foreground">{hero.muted}</span>
          </Heading>
        </Wrapper>
      </Section>
      <Section>
        <Wrapper>
          <DotGrid />
        </Wrapper>
      </Section>
    </>
  )
}
