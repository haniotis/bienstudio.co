import { Section } from "@/components/section"
import { Wrapper } from "@/components/wrapper"
import { Heading } from "@/components/ui/heading"
import { SectionEyebrow } from "./section-eyebrow"
import { expertise } from "./data"

// A rounded, slightly-raised panel listing what the studio does. Each row is a
// mark + label with a hairline divider between them.
export function Expertise() {
  return (
    <Section tag="div" id="expertise">
      <Wrapper>
        <div className="bg-alt rounded-2xl p-[clamp(2rem,1.169rem_+_3.548vw,5rem)] lg:rounded-3xl">
          <SectionEyebrow>Our expertise</SectionEyebrow>

          <ul className="divide-border divide-y">
            {expertise.map((item, i) => (
              <li
                key={item.label}
                className="group flex items-center gap-4 py-6 sm:py-7 md:gap-5 md:py-8 lg:gap-6 xl:gap-7"
              >
                <Heading size={6} className="text-foreground">
                  0{i + 1}
                </Heading>
                <Heading size={3} tag="span">
                  {item.label}
                </Heading>
              </li>
            ))}
          </ul>
        </div>
      </Wrapper>
    </Section>
  )
}
