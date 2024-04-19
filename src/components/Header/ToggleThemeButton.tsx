import { DarkMode, LightMode } from "@mui/icons-material"
import { IconButton } from "@mui/material"

import { toggleTheme, useAppDispatch, useAppSelector } from "../../redux"

export function ToggleThemeButton() {
  const theme = useAppSelector((state) => state.theme)

  const dispatch = useAppDispatch()

  function handleToggleTheme() {
    dispatch(toggleTheme())
  }
  return (
    <IconButton
      aria-label="toggle theme"
      onClick={handleToggleTheme}
      sx={{ p: 0, alignSelf: "start", zIndex: 3 }}
    >
      {theme === "light" ? <LightMode sx={{ fill: "black" }} /> : <DarkMode />}
    </IconButton>
  )
}
