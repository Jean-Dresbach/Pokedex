import { CssBaseline, ThemeProvider } from "@mui/material"

import { useAppSelector } from "./redux"
import { dark, light } from "./themes"
import { BackGround } from "./components/BackGround"
import { Router } from "./routes/Router"

export function Root() {
  const currentTheme = useAppSelector((state) =>
    state.theme === "light" ? light : dark
  )

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <BackGround>
        <Router />
      </BackGround>
    </ThemeProvider>
  )
}
