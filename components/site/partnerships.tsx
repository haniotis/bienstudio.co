import { ProjectCarousel } from "./project-carousel"
import { Section } from "@/components/section"
import { Wrapper } from "@/components/wrapper"
import { Heading } from "@/components/ui/heading"
import { SectionEyebrow } from "./section-eyebrow"
import { Tag } from "./tag"
import { cn } from "@/utils/cn"
import { caseStudies, type CaseStudy } from "./data"
import { Divider } from "./divider"
import { Fragment } from "react"

// The client's mark beside a case-study name — a solid tile for now.
function BrandMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "bg-foreground size-[clamp(3rem,2.723rem_+_1.183vw,4rem)] shrink-0",
        className,
      )}
    ></span>
  )
}

// One case study: a header (mark + name, with a mono note) and a horizontally
// scrollable rail of project tiles.
function CaseStudyRow({ study }: { study: CaseStudy }) {
  return (
    <article>
      <Wrapper>
        <div className="mb-6 flex flex-col gap-6 md:mb-8 md:flex-row md:items-start md:justify-between md:gap-8 lg:mb-10 xl:mb-14">
          <div className="flex items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-7">
            <BrandMark />
            <div>
              <Heading size={3}>{study.name}</Heading>
              <Heading
                size={6}
                tag="p"
                className="text-foreground mt-1 lg:mt-2"
              >
                {study.tagline}
              </Heading>
            </div>
          </div>
          <div className="max-w-sm lg:max-w-lg">
            <Heading size={6} tag="p" className="text-foreground">
              {study.blurb}
            </Heading>
          </div>
        </div>
      </Wrapper>

      {/* Project rail — a Blossom carousel: native horizontal scroll enhanced
          with drag. Slides lay out inline-block, so gaps come from margins. */}
      <Wrapper>
        <div className="-mx-[5vw]">
          <ProjectCarousel>
            {study.projects.map((project) => (
              <div
                key={project.title}
                data-blossom-slide
                className="bg-alt group relative mr-4 aspect-[4/3] w-[85vw] overflow-hidden p-6 first:ml-[5vw] last:mr-[5vw] sm:w-[74vw] md:mr-6 md:w-[43vw] md:p-8 xl:w-[40vw] xl:p-10"
              >
                <div className="flex items-start justify-between gap-3">
                  <Heading size={4} tag="span" className="text-balance">
                    {project.title}
                  </Heading>
                  <Tag>{project.tag}</Tag>
                </div>
              </div>
            ))}
          </ProjectCarousel>
        </div>
      </Wrapper>
    </article>
  )
}

export function Partnerships() {
  return (
    <>
      <Section tag="section" id="work">
        <Wrapper>
          <SectionEyebrow className="!mb-0">
            Featured partnerships
          </SectionEyebrow>
        </Wrapper>
      </Section>
      <>
        {caseStudies.map((study, i) => (
          <Fragment key={study.slug}>
            <CaseStudyRow key={study.slug} study={study} />
            {i < caseStudies.length - 1 && <Divider />}
          </Fragment>
        ))}
      </>
    </>
  )
}
