import { ReactNode } from "react"
import { useTheme } from "@mui/material"

import bgLight from "../assets/pokeball-bg-light-icon.svg"
import bgDark from "../assets/pokeball-bg-dark-icon.svg"

interface BackGroundProps {
  children?: ReactNode
}

export function BackGround({ children }: BackGroundProps) {
  const theme = useTheme()

  const themeModeIsLight = theme.palette.mode === "light"

  return (
    <div id="custom-bg">
      <div
        id="pokeball-container"
        className={
          themeModeIsLight
            ? "radial-gradient-bgLight"
            : "radial-gradient-bgDark"
        }>
        <div
          id="pokeball-pattern"
          style={{
            backgroundImage: `url(${themeModeIsLight ? bgLight : bgDark})`
          }}></div>
        <div
          id="pokeball-gradient-overlay"
          className={
            themeModeIsLight
              ? "gradient-overlay-bgLight"
              : "gradient-overlay-bgDark"
          }></div>
        {children}
      </div>
    </div>
  )
}
