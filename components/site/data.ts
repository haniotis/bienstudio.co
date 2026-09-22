// Single source of truth for the one-pager's content. Copy and lists live here
// so the section components stay presentational and the site is easy to edit.

export const siteConfig = {
  name: "Bien Studio",
  email: "bobby@bienstudio.co",
  availability: "Available for December",
}

// Two-tone hero: `lead` renders in the strong colour, `muted` in the foreground
// grey — one continuous heading.
export const hero = {
  lead: "Bien is a design partner for companies building what's next.",
  muted: "We build brands, interfaces, websites, and campaigns.",
}

// Clients shown under "Trusted by". `slug` maps to an inline logo component in
// the logos registry (see components/site/logos); `name` is the accessible
// label (and the wordmark fallback when a slug isn't registered).
export interface Client {
  name: string
  slug: string
  /** Optional link to the client's site — makes the logo clickable. */
  href?: string
  /**
   * Optical size multiplier, relative to the base logo height (set in
   * ClientLogo). 1 = base; <1 smaller, >1 larger — used to balance marks that
   * sit at different visual weights. Defaults to 1.
   */
  scale?: number
}

// The client logo wall. `scale` optically balances each mark against the
// others (icon logos usually want to sit larger than wordmarks).
export const clients: Client[] = [
  { name: "Apple", slug: "apple", href: "https://www.apple.com", scale: 1.1 },
  {
    name: "Volkswagen",
    slug: "volkswagen",
    href: "https://www.volkswagen.com",
    scale: 1.1,
  },
  { name: "Affirm", slug: "affirm", href: "https://www.affirm.com" },
  { name: "Brex", slug: "brex", href: "https://www.brex.com", scale: 0.6 },
  {
    name: "Coinbase",
    slug: "coinbase",
    href: "https://www.coinbase.com",
    scale: 0.5,
  },
  { name: "Plaid", slug: "plaid", href: "https://www.plaid.com", scale: 0.9 },
  { name: "Reevo", slug: "reevo", href: "https://reevo.ai", scale: 0.75 },
  { name: "Crosby", slug: "crosby", href: "https://crosby.ai", scale: 0.5 },
  {
    name: "DigitalOcean",
    slug: "digitalocean",
    href: "https://www.digitalocean.com",
    scale: 0.85,
  },
  {
    name: "Twitter",
    slug: "twitter",
    href: "https://twitter.com",
    scale: 0.85,
  },
  { name: "Tonal", slug: "tonal", href: "https://www.tonal.com", scale: 0.5 },
  {
    name: "Mixpanel",
    slug: "mixpanel",
    href: "https://mixpanel.com",
    scale: 0.65,
  },
  { name: "Arc", slug: "arc", href: "https://arc.net", scale: 0.6 },
  { name: "Vendr", slug: "vendr", href: "https://www.vendr.com", scale: 0.7 },
  {
    name: "Compound",
    slug: "compound",
    href: "https://compound.finance",
    scale: 0.75,
  },
  {
    name: "Metabase",
    slug: "metabase",
    href: "https://www.metabase.com",
    scale: 1.15,
  },
]

export const testimonial = {
  quote:
    "Crosby makes contract review a breeze, speeding up our time to revenue. It just works.",
  name: "Jordan",
  role: "COO, Cursor",
  logo: { name: "Cursor", slug: "cursor" },
}

export interface Expertise {
  label: string
}

export const expertise: Expertise[] = [
  { label: "Brand Identity" },
  { label: "Product Vision" },
  { label: "Creative Direction" },
  { label: "Web Design & Development" },
  { label: "Design Systems + Prototyping" },
]

export const about = {
  lead: "We are a branding and digital studio, run as a collective.",
  muted:
    "Every project is cast with the right people for the job, guided by a single creative vision. The crew has worked together for years, so you get senior talent operating at full trust from day one.",
}

// A partnership "spotlight": a named client, a one-line positioning statement,
// a short blurb, and a rail of project tiles.
export interface Project {
  title: string
  tag: string
}

export interface CaseStudy {
  name: string
  slug: string
  tagline: string
  blurb: string
  projects: Project[]
}

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet ex est amet nulla sagittis commodo quis ac est. Maecenas condimentum tincidunt tincidunt. In aliquam varius enim eu euismod."

export const caseStudies: CaseStudy[] = [
  {
    name: "Crosby",
    slug: "crosby",
    tagline: "The agentic lawfirm built for execution, 2026.",
    blurb: LOREM,
    projects: [
      { title: "Crosby Intelligence", tag: "Product Launch" },
      { title: "In Memoriam the Billable Hour", tag: "Brand Campaign" },
      { title: "Crosby Identity", tag: "Brand Identity" },
    ],
  },
  {
    name: "Paid",
    slug: "paid",
    tagline: "The monetization platform for AI agents, 2026.",
    blurb: LOREM,
    projects: [
      { title: "Brand Refresh", tag: "Brand Identity" },
      { title: "Paid.ai", tag: "Web Design & Development" },
      { title: "Pricing System", tag: "Design Systems" },
    ],
  },
  {
    name: "Reevo",
    slug: "reevo",
    tagline: "The AI-native sales platform, 2025.",
    blurb: LOREM,
    projects: [
      { title: "Brand Strategy & Identity", tag: "Brand Identity" },
      { title: "Reevo.ai", tag: "Web Design & Development" },
      { title: "Launch Film", tag: "Creative Direction" },
    ],
  },
]
