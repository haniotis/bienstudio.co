import { type CSSProperties } from "react"
import { Section } from "@/components/section"
import { Wrapper } from "@/components/wrapper"
import { SectionEyebrow } from "./section-eyebrow"
import { ClientLogo } from "./client-logo"
import SmartLink from "@/components/ui/smart-link"
import { clients, testimonial } from "./data"
import { Heading } from "../ui/heading"

// Social proof: one CSS grid holds both the client-logo wall and the
// testimonial. The logos auto-fill the left 4 columns (4 rows of 4) as
// aspect-video cells; the testimonial is placed explicitly into the right 2
// columns, spanning all 4 rows.
export function TrustedBy() {
  return (
    <Section tag="div" id="clients">
      <Wrapper>
        <SectionEyebrow>Trusted by</SectionEyebrow>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {clients.map((client, i) => (
            <div
              key={`${client.slug}-${i}`}
              // --logo-scale drives each mark's height (base × scale); see
              // ClientLogo. Inherited by the SVG from this cell.
              style={{ "--logo-scale": client.scale ?? 1 } as CSSProperties}
              className="[container-type:size] flex aspect-video items-center justify-center"
            >
              {client.href ? (
                <SmartLink
                  href={client.href}
                  aria-label={client.name}
                  className="flex h-full w-full items-center justify-center transition-opacity hover:opacity-90"
                >
                  <ClientLogo name={client.name} slug={client.slug} />
                </SmartLink>
              ) : (
                <ClientLogo name={client.name} slug={client.slug} />
              )}
            </div>
          ))}

          {/* Testimonial — full width on mobile, the right 2 cols on desktop. */}
          <figure className="border-border col-span-full flex flex-col justify-between gap-8 border-t p-8 md:p-10 lg:col-span-2 lg:col-start-4 lg:row-start-1 lg:row-end-7 lg:border-t-0 lg:border-l lg:p-12 xl:col-start-5 xl:row-end-5 xl:p-14">
            <blockquote>
              <Heading size={3} tag="span">
                &ldquo;{testimonial.quote}&rdquo;
              </Heading>
            </blockquote>
            <figcaption className="flex items-end justify-between gap-4">
              <div>
                <Heading size={4} tag="span">
                  {testimonial.name}
                </Heading>
                <Heading size={4} tag="span" className="text-foreground">
                  {testimonial.role}
                </Heading>
              </div>
              <ClientLogo
                name={testimonial.logo.name}
                slug={testimonial.logo.slug}
                className="h-5"
              />
            </figcaption>
          </figure>
        </div>
      </Wrapper>
    </Section>
  )
}
