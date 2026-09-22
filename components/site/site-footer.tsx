import { Section } from "@/components/section"
import { Wrapper } from "@/components/wrapper"
import { siteConfig } from "./data"
import { Heading } from "@/components/ui/heading"

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <Section
      tag="footer"
      id="contact"
      className="overflow-hidden pb-[clamp(4rem,3.169rem_+_3.548vw,7rem)]"
    >
      <Wrapper>
        <Heading size={6} className="text-muted-foreground">
          {siteConfig.name} © {year}
        </Heading>
      </Wrapper>
    </Section>
  )
}
