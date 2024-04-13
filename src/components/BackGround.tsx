import { ReactNode } from "react"
import { useAppSelector } from "../redux"

import bgLight from "../assets/pokeball-bg-light-icon.svg"

interface BackGroundProps {
  children?: ReactNode
}

export function BackGround({ children }: BackGroundProps) {
  const theme = useAppSelector((state) => state.theme)

  return (
    <div id="custom-bg">
      <div id="pokeball-container">
        <div
          id="pokeball-pattern"
          style={{ backgroundImage: `url(${bgLight})` }}
        ></div>
        <div id="pokeball-gradient-overlay"></div>
      </div>
      {children}
    </div>
  )
}
