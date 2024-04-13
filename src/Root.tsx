import { CssBaseline, ThemeProvider } from "@mui/material"

import { useAppSelector } from "./redux"
import { dark, light } from "./themes"

export function Root() {
  const currentTheme = useAppSelector((state) =>
    state.theme === "light" ? light : dark
  )

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
    </ThemeProvider>
  )
}
