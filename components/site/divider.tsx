import { Wrapper } from "@/components/wrapper"

// A hairline rule between homepage sections, inset to the content gutter via
// Wrapper. Sits as a direct child of the section stack (see app/page.tsx).
export function Divider() {
  return (
    <div>
      <Wrapper>
        <hr className="border-border" />
      </Wrapper>
    </div>
  )
}
