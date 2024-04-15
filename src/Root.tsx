import { CssBaseline, ThemeProvider, createTheme } from "@mui/material"

import { useAppSelector } from "./redux"
import { BackGround } from "./components/BackGround"
import { Router } from "./routes/Router"

export function Root() {
  const currentTheme = useAppSelector((state) => state.theme) as
    | "light"
    | "dark"

  const theme = createTheme({
    palette: {
      mode: currentTheme
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BackGround>
        <Router />
      </BackGround>
    </ThemeProvider>
  )
}
