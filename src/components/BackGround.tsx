import { ReactNode } from "react"
import { useTheme } from "@mui/material"

import pokeballWhite from "../assets/pokeball-white.png"
import pokeballBlack from "../assets/pokeball-black.png"

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
            backgroundSize: "80px",
            backgroundImage: `url(${
              themeModeIsLight ? pokeballBlack : pokeballWhite
            })`
          }}
        />

        <div
          id="pokeball-gradient-overlay"
          className={
            themeModeIsLight
              ? "gradient-overlay-bgLight"
              : "gradient-overlay-bgDark"
          }
        />
        {children}
      </div>
    </div>
  )
}
