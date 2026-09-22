import { ReactNode } from "react"

interface WrapperProps {
  children: ReactNode
}

export default function Wrapper({ children }: WrapperProps) {
  return (
    <div className="w-full px-[5vw]">
      <div className="mx-auto w-full max-w-[1650px]">{children}</div>
    </div>
  )
}
Wrapper.displayName = "Wrapper"

export { Wrapper }
