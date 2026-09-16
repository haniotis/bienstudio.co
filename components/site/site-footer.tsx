import { Section } from "@/components/section"
import { Wrapper } from "@/components/wrapper"
import { siteConfig } from "./data"

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <Section
      tag="footer"
      id="contact"
      className="overflow-hidden pb-[clamp(4rem,3.169rem_+_3.548vw,7rem)]"
    >
      <Wrapper>
        <p className="text-muted-foreground">
          {siteConfig.name} © {year}
        </p>
      </Wrapper>
    </Section>
  )
}
