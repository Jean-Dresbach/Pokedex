import { Outlet } from "react-router-dom"
import { Box, Container, Typography, useTheme } from "@mui/material"
import { SearchRounded } from "@mui/icons-material"

import { useAppSelector } from "../../redux"
import { ToggleThemeButton } from "./ToggleThemeButton"
import { Nav } from "./Nav"
import pokeball from "../../assets/pokeball.png"

export function Header() {
  const themeMui = useTheme()
  const theme = useAppSelector(state => state.theme)

  return (
    <Box
      sx={{
        position: "absolute",
        overflow: "auto",
        inset: 0,
        zIndex: 3,
        "&::-webkit-scrollbar": {
          width: "8px"
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: themeMui.palette.text.secondary
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: themeMui.palette.error.light
        }
      }}>
      <Container
        maxWidth="md"
        sx={{
          padding: "0 !important",
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
            overflow: "hidden",
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

          <Box
            sx={{
              display: "flex",
              gap: 2,
              borderRadius: 100,
              maxWidth: "500px",
              padding: "8px 16px",
              zIndex: 3
            }}
            style={{
              backgroundColor: theme === "light" ? "#efefef" : "rgba(0,0,0,0.2)"
            }}>
            <SearchRounded />
            <input
              type="text"
              placeholder="Pesquise por nome ou id..."
              style={{
                outline: "none",
                border: "none",
                background: "none",
                fontFamily: "roboto",
                fontSize: "15px",
                width: "100%",
                color: theme === "light" ? "" : "white"
              }}
            />
          </Box>

          <img
            src={pokeball}
            style={{
              height: "300px",
              width: "300px",
              opacity: 0.3,
              position: "absolute",
              top: "-105px",
              right: "-114px"
            }}
          />
        </Box>

        <Nav />

        <Box sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>
      </Container>
    </Box>
  )
}
