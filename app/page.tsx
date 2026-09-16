import { SiteHeader } from "@/components/site/site-header"
import { Hero } from "@/components/site/hero"
import { TrustedBy } from "@/components/site/trusted-by"
import { Expertise } from "@/components/site/expertise"
import { About } from "@/components/site/about"
import { Partnerships } from "@/components/site/partnerships"
import { SiteFooter } from "@/components/site/site-footer"
import { Divider } from "@/components/site/divider"
import { SECTION_SPACE } from "@/components/section"

// Bien Studio — single-page site. Sections compose the shared design system
// (Section / Wrapper / GridContainer / Heading / Button); their content lives
// in components/site/data.ts.
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className={SECTION_SPACE}>
        <Hero />
        <TrustedBy />
        <Expertise />
        <Divider />
        <About />
        <Divider />
        <Partnerships />
        <Divider />
        <SiteFooter />
      </main>
    </>
  )
}
