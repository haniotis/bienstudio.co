import { Logo } from "@/components/logo"
import { Logomark } from "@/components/logomark"
import { Section } from "@/components/section"
import { Wrapper } from "@/components/wrapper"
import { Heading } from "@/components/ui/heading"
import { widowFix } from "@/utils/widowFix"

// Single-page splash for Bien. Placeholder copy — edit CLIENTS, SERVICES and
// the statement below in place. Structure: logo, statement, clients, services.

const STATEMENT =
  "We help ambitious brands find their voice and build the things that carry it into the world."

const CLIENTS = [
  "Aperture",
  "Northwind",
  "Meridian",
  "Cobalt",
  "Field Notes",
  "Halcyon",
]

const SERVICES: { title: string; description: string }[] = [
  {
    title: "Strategy",
    description:
      "Positioning, naming, and the narrative that gives everything else a reason to exist.",
  },
  {
    title: "Identity",
    description:
      "Logos, type, color, and the systems that keep a brand coherent everywhere it shows up.",
  },
  {
    title: "Digital",
    description:
      "Websites and products, designed and built to feel as considered as they look.",
  },
  {
    title: "Content",
    description:
      "Art direction, photography, and campaigns that give a brand something to say.",
  },
]

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-border border-b">
        <Wrapper>
          <div className="flex h-[var(--nav-height)] items-center justify-between">
            <Logo />
            <a
              href="mailto:hello@bienstudio.co"
              className="font-mono text-h6 text-foreground hover:text-strong touch uppercase transition-colors"
            >
              hello@bienstudio.co
            </a>
          </div>
        </Wrapper>
      </header>

      <main className="flex-1">
        {/* Statement */}
        <Section tag="section" padding="default" className="border-border border-b">
          <Wrapper>
            <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
              <div className="lg:flex-1">
                <Heading size={6} tag="p" className="text-primary mb-5">
                  Bien — Creative Studio
                </Heading>
                <Heading size={1} tag="h1" className="max-w-[16ch] text-balance">
                  {widowFix(STATEMENT)}
                </Heading>
              </div>
              <Logomark className="text-strong h-56 w-auto shrink-0 self-start sm:h-72 lg:h-[26rem] lg:self-auto" />
            </div>
          </Wrapper>
        </Section>

        {/* Clients */}
        <Section tag="section" padding="tight" className="border-border border-b">
          <Wrapper>
            <Heading size={6} tag="h2" className="text-muted-foreground mb-8">
              Selected Clients
            </Heading>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
              {CLIENTS.map((client) => (
                <li
                  key={client}
                  className="text-strong font-heading text-lg font-medium tracking-tight"
                >
                  {client}
                </li>
              ))}
            </ul>
          </Wrapper>
        </Section>

        {/* Services */}
        <Section tag="section" padding="default">
          <Wrapper>
            <Heading size={6} tag="h2" className="text-muted-foreground mb-8">
              Services
            </Heading>
            <div className="grid gap-x-12 gap-y-12 md:grid-cols-2">
              {SERVICES.map((service, i) => (
                <div key={service.title} className="flex gap-6">
                  <span className="font-mono text-h6 text-muted-foreground pt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <Heading size={4} tag="h3" className="mb-2">
                      {service.title}
                    </Heading>
                    <p className="text-foreground max-w-[42ch]">
                      {widowFix(service.description)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Wrapper>
        </Section>
      </main>

      {/* Footer */}
      <footer className="border-border border-t">
        <Wrapper>
          <div className="flex flex-col gap-2 py-8 sm:flex-row sm:items-center sm:justify-between">
            <Logo className="h-6 w-auto" />
            <p className="font-mono text-h6 text-muted-foreground uppercase">
              © {new Date().getFullYear()} Bien
            </p>
          </div>
        </Wrapper>
      </footer>
    </div>
  )
}
