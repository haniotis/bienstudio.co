import { type LogoProps } from "./index"

// Arc logomark. Root fill is currentColor, so the mark draws in the current
// text colour. Sized by `className` (height); viewBox keeps the aspect ratio.
export function ArcLogo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 66 27"
      fill="currentColor"
      role="img"
      aria-label="Arc"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M0 13.2C0 5.91 5.91 0 13.2 0c7.29 0 13.2 5.91 13.2 13.2v12.823a.377.377 0 0 1-.377.377h-6.788a.377.377 0 0 1-.378-.377V13.2a5.657 5.657 0 1 0-5.657 5.657h4.337c.21 0 .378.169.378.378v6.788c0 .209-.17.377-.378.377H13.2C5.91 26.4 0 20.49 0 13.2ZM47.238 2.41c.198-.167.183-.482-.04-.613A13.14 13.14 0 0 0 40.543 0c-7.29 0-13.2 5.91-13.2 13.2v12.823c0 .209.17.377.377.377h6.788a.377.377 0 0 0 .377-.377V13.2A5.658 5.658 0 0 1 42.772 8a.41.41 0 0 0 .54-.213A14.18 14.18 0 0 1 47.24 2.41h-.002ZM56.383 0a13.156 13.156 0 0 1 9.163 3.698.368.368 0 0 1 0 .527L60.75 9.022a.398.398 0 0 1-.55.004 5.657 5.657 0 1 0-.383 8.67.396.396 0 0 1 .521.026l4.816 4.816a.369.369 0 0 1-.01.537 13.15 13.15 0 0 1-8.761 3.325c-7.29 0-13.2-5.91-13.2-13.2 0-7.29 5.91-13.2 13.2-13.2Z" />
    </svg>
  )
}
