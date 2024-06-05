import {
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
  useTheme
} from "@mui/material"

import { useAppSelector } from "./redux"
import { BackGround } from "./components/BackGround"
import { Footer } from "./components/Footer"
import { Header } from "./components"
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

      <BackGround>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 3
          }}>
          <Container
            maxWidth="md"
            sx={{
              padding: "0 !important",
              overflow: "hidden",
              overflowY: "auto",
              backgroundColor: theme.palette.background.default,
              display: "flex",
              flexDirection: "column",
              height: "100%"
            }}>
            <Header />
            <Box sx={{ flexGrow: 1 }}>
              <Home />
            </Box>

            <Footer />
          </Container>
        </Box>
      </BackGround>
    </ThemeProvider>
  )
}
