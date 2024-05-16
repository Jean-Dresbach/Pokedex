import { Outlet } from "react-router-dom"
import { Box, Container, Typography, useTheme } from "@mui/material"

import { useAppSelector } from "../../redux"
import { ToggleThemeButton } from "./ToggleThemeButton"
import { Nav } from "./Nav"
import pokeball from "../../assets/pokeball.png"
import { Search } from "./Search"
import { Footer } from "../Footer"

export function Header() {
  const themeMui = useTheme()
  const theme = useAppSelector(state => state.theme)

  return (
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
          backgroundColor: themeMui.palette.background.default,
          display: "flex",
          flexDirection: "column",
          height: "100%"
        }}>
        <Box
          component="header"
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            maxHeight: "max-content",
            borderRadius: "0 0 32px 32px",
            backgroundColor:
              theme === "light"
                ? themeMui.palette.grey[400]
                : themeMui.palette.grey[900],
            p: 3,
            py: 5
          }}>
          <Typography
            component="h1"
            sx={{
              fontWeight: 500,
              zIndex: 3,
              mb: 3,
              fontSize: "clamp(20px, 5vw, 30px)"
            }}>
            Qual pokemon
            <br />
            você esta procurando?
          </Typography>

          <Box sx={{ position: "absolute", top: "39px", right: "24px" }}>
            <ToggleThemeButton />
          </Box>

          <Search />

          <img
            src={pokeball}
            style={{
              height: "250px",
              width: "250px",
              opacity: 0.3,
              position: "absolute",
              top: "-79px",
              right: "-89px"
            }}
          />
        </Box>

        <Nav />

        <Box sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>

        <Footer />
      </Container>
    </Box>
  )
}
