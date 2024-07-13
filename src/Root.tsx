import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  useTheme
} from "@mui/material"

import { useAppSelector } from "./redux"
import { Home } from "./pages/Home"

export function Root() {
  const currentTheme = useAppSelector(state => state.theme) as "light" | "dark"
  const themeMui = useTheme()

  const theme = createTheme({
    palette: {
      mode: currentTheme,
      primary: {
        main: themeMui.palette.error.main
      }
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            "&::-webkit-scrollbar": {
              width: "8px"
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: themeMui.palette.text.secondary
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: themeMui.palette.error.light
            }
          }
        }
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            "&::-webkit-scrollbar": {
              width: "8px"
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: themeMui.palette.text.secondary
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: themeMui.palette.error.light
            }
          }
        }
      }
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Home />
    </ThemeProvider>
  )
}
