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
      <div
        id="pokeball-container"
        className={
          theme === "light"
            ? "radial-gradient-bgLight"
            : "radial-gradient-bgDark"
        }
      >
        <div
          id="pokeball-pattern"
          style={{
            backgroundImage: `url(${theme === "light" ? bgLight : ""})`
          }}
        ></div>
        <div
          id="pokeball-gradient-overlay"
          className={
            theme === "light"
              ? "gradient-overlay-bgLight"
              : "gradient-overlay-bgDark"
          }
        ></div>
      </div>
      {children}
    </div>
  )
}
