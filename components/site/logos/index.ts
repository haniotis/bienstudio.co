import { type ComponentType } from "react"
import { AffirmLogo } from "./affirm"
import { BrexLogo } from "./brex"
import { AppleLogo } from "./apple"
import { VolkswagenLogo } from "./volkswagen"
import { CoinbaseLogo } from "./coinbase"
import { PlaidLogo } from "./plaid"
import { TwitterLogo } from "./twitter"
import { ReevoLogo } from "./reevo"
import { TonalLogo } from "./tonal"
import { MixpanelLogo } from "./mixpanel"
import { CompoundLogo } from "./compound"

export interface LogoProps {
  className?: string
}

// Registry of client logos as inline SVG components, keyed by the `slug` used
// in data.ts. Add a new mark here and reference it by slug — ClientLogo renders
// the match, or falls back to a text wordmark when a slug isn't registered.
export const logos: Record<string, ComponentType<LogoProps>> = {
  affirm: AffirmLogo,
  brex: BrexLogo,
  apple: AppleLogo,
  volkswagen: VolkswagenLogo,
  coinbase: CoinbaseLogo,
  plaid: PlaidLogo,
  twitter: TwitterLogo,
  reevo: ReevoLogo,
  tonal: TonalLogo,
  mixpanel: MixpanelLogo,
  compound: CompoundLogo,
}
