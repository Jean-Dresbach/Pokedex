import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  useTheme
} from "@mui/material"

import { useAppSelector } from "./redux"
import { BackGround } from "./components/BackGround"
import { Router } from "./routes/Router"
import { LoadingBackdrop } from "./components/LoadingBackdrop"

export function Root() {
  const currentTheme = useAppSelector(state => state.theme) as "light" | "dark"
  const themeMui = useTheme()

  const theme = createTheme({
    palette: {
      mode: currentTheme,
      primary: {
        main: themeMui.palette.error.main
      }
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BackGround>
        <Router />
        <LoadingBackdrop />
      </BackGround>
    </ThemeProvider>
  )
}
